# Developer Guide: Adding a Backend to Your Form App

## 👋 Welcome!

This guide is for developers who are new to full-stack development. It explains how we took a **frontend-only form app** and connected it to a **real database**.

---

## 📍 Where We Started (feat/observerFormPage branch)

The original app had:

- ✅ A beautiful login page with Google OAuth
- ✅ Two form pages (DSP form and Observer form)
- ✅ 33 questions organized into sections
- ❌ **No database** — clicking "Submit" just showed "Done!" but didn't save anything

### Original Submit Code

```typescript
const handleSubmit = () => {
  setSubmitted(true); // Just shows a "Done!" message
};
```

**Problem:** The form data disappeared when you refreshed the page. Nothing was actually saved!

---

## 🎯 What We Needed to Build

1. **A database** to store form submissions
2. **API endpoints** so the frontend can send data to the backend
3. **Update the forms** to call those APIs instead of just showing "Done!"

---

## 🏗️ Architecture Overview

```
┌─────────────────┐     HTTP POST      ┌─────────────────┐
│                 │  ───────────────►  │                 │
│   React Form    │                    │   API Routes    │
│   (Frontend)    │  ◄───────────────  │   (Backend)     │
│                 │     JSON Response  │                 │
└─────────────────┘                    └────────┬────────┘
                                                │
                                                │ Prisma ORM
                                                ▼
                                       ┌─────────────────┐
                                       │                 │
                                       │   PostgreSQL    │
                                       │   (Database)    │
                                       │                 │
                                       └─────────────────┘
```

---

## 📁 Files We Created

Here's every file we added and what it does:

### Database Layer

| File                   | Purpose                                         |
| ---------------------- | ----------------------------------------------- |
| `prisma/schema.prisma` | Defines your database tables (like a blueprint) |
| `prisma/schema.sql`    | Raw SQL version (for reference only)            |
| `prisma/seed.ts`       | Script to add test data to your database        |
| `src/lib/db.ts`        | Creates a connection to the database            |

### API Layer

| File                                        | Purpose                           |
| ------------------------------------------- | --------------------------------- |
| `src/app/api/submissions/observer/route.ts` | Handles Observer form submissions |
| `src/app/api/submissions/dsp/route.ts`      | Handles DSP form submissions      |

### Service Layer (Business Logic)

| File                                    | Purpose                                                |
| --------------------------------------- | ------------------------------------------------------ |
| `src/lib/services/submissionService.ts` | Contains all the logic for saving/updating submissions |
| `src/lib/types.ts`                      | TypeScript types for our data                          |
| `src/lib/validation.ts`                 | Validates form data before saving                      |
| `src/lib/api.ts`                        | Frontend functions to call the API                     |

### Testing

| File                                          | Purpose                        |
| --------------------------------------------- | ------------------------------ |
| `src/__tests__/lib/validation.test.ts`        | Tests for validation utilities |
| `src/__tests__/lib/submissionService.test.ts` | Tests for business logic       |
| `src/__tests__/api/observer.test.ts`          | Tests for Observer API         |
| `src/__tests__/api/dsp.test.ts`               | Tests for DSP API              |

---

## 🗄️ Understanding the Database

### What is Prisma?

Prisma is an **ORM (Object-Relational Mapper)**. Instead of writing SQL, you write TypeScript code and Prisma converts it to SQL for you.

### Our Database Tables

We have 5 tables:

```
┌────────────────┐     ┌─────────────────────┐     ┌────────────────┐
│   observers    │     │ observer_submissions │     │      dsps      │
├────────────────┤     ├─────────────────────┤     ├────────────────┤
│ id             │◄────│ observer_id         │     │ id             │
│ email          │     │ dsp_id              │────►│ email          │
│ name           │     │ question_response_id│     │ name           │
└────────────────┘     └──────────┬──────────┘     └───────┬────────┘
                                  │                        │
                                  ▼                        ▼
                       ┌──────────────────────┐  ┌────────────────────┐
                       │  question_responses  │  │   dsp_submissions  │
                       ├──────────────────────┤  ├────────────────────┤
                       │ id                   │◄─│ question_response_id│
                       │ q1, q2, ... q33      │  │ dsp_id             │
                       └──────────────────────┘  └────────────────────┘
```

### Key Concepts

1. **Primary Key (PK)**: Unique identifier for each row (like `id`)
2. **Foreign Key (FK)**: Links one table to another (like `observer_id` linking to `observers.id`)
3. **Unique Constraint**: Ensures no duplicates (like email must be unique)

---

## 🔌 Understanding API Routes

### What is an API?

An **API (Application Programming Interface)** is how your frontend talks to your backend. It's like a waiter at a restaurant — you tell the waiter what you want, they go to the kitchen, and bring back your food.

### How Next.js API Routes Work

In Next.js, you create API endpoints by adding files to `src/app/api/`:

```
src/app/api/
  └── submissions/
      ├── observer/
      │   └── route.ts    ← POST/GET /api/submissions/observer
      └── dsp/
          └── route.ts    ← POST/GET /api/submissions/dsp
```

### Example API Route

```typescript
// src/app/api/submissions/dsp/route.ts

export async function POST(request: NextRequest) {
  // 1. Get the data from the request
  const body = await request.json();

  // 2. Validate it
  if (!body.dspEmail) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  // 3. Save to database
  const result = await submitDspSelfEvaluation(
    body.dspEmail,
    body.dspName,
    body.answers
  );

  // 4. Return the result
  return NextResponse.json(result);
}
```

---

## 📝 Understanding Form-to-Database Mapping

### The Problem

Our form has fields like `privacyKnock`, `clothingChoice`, etc.
Our database has columns like `q1`, `q2`, `q3`, etc.

### The Solution

We created a mapping in `validation.ts`:

```typescript
const FORM_FIELD_ORDER = [
  "privacyKnock", // → q1
  "privacyHandsOn", // → q2
  "privacyEducation", // → q3
  "clothingChoice", // → q4
  // ... 29 more fields
  "personalHygieneEducation", // → q33
];
```

### Converting Answers

Radio buttons use letters (`a`, `b`, `c`, `d`, `e`), but we store numbers:

```typescript
function letterToScore(letter) {
  // a = best (5 points), e = worst (1 point)
  const scores = { a: 5, b: 4, c: 3, d: 2, e: 1 };
  return scores[letter];
}
```

---

## 🔄 The Complete Flow

Here's what happens when a DSP clicks "Submit":

### Step 1: Frontend Collects Form Data

```typescript
// dspForm.tsx
const formData = {
  privacyKnock: "a",
  privacyHandsOn: "b",
  // ... all 33 fields
};
```

### Step 2: Frontend Calls the API

```typescript
// lib/api.ts
const result = await submitDspSelfEvaluation(userEmail, userName, formData);
```

### Step 3: API Route Receives Request

```typescript
// api/submissions/dsp/route.ts
export async function POST(request) {
  const body = await request.json();
  // Validate and process...
}
```

### Step 4: Service Layer Saves to Database

```typescript
// lib/services/submissionService.ts
await prisma.$transaction(async (tx) => {
  // 1. Find or create DSP
  let dsp = await tx.dsp.findUnique({ where: { email } });
  if (!dsp) {
    dsp = await tx.dsp.create({ data: { email, name } });
  }

  // 2. Create question response
  const response = await tx.questionResponse.create({
    data: { q1: 5, q2: 4, q3: 3, ... }
  });

  // 3. Link them together
  await tx.dspSubmission.create({
    data: { dspId: dsp.id, questionResponseId: response.id }
  });
});
```

### Step 5: Frontend Shows Success

```typescript
if (result.success) {
  setSubmitted(true); // Show "Done!" screen
}
```

---

## 🔁 Repeat Submission Logic

A key requirement was: **If someone submits again, UPDATE instead of creating a new row.**

### How We Handle This

```typescript
// Check if submission already exists
const existingSubmission = await tx.dspSubmission.findUnique({
  where: { dspId: dsp.id },
});

if (existingSubmission) {
  // UPDATE the existing question response
  await tx.questionResponse.update({
    where: { id: existingSubmission.questionResponseId },
    data: newAnswers,
  });
} else {
  // CREATE new records
  await tx.questionResponse.create({ data: newAnswers });
}
```

---

## 🧪 Testing

We use **Jest** for testing. Tests ensure our code works correctly.

### Run All Tests

```bash
npm test
```

### What We Test

1. **Validation**: Does `letterToScore('a')` return `5`?
2. **Service Logic**: Does repeat submission UPDATE instead of CREATE?
3. **API Responses**: Does missing email return a 400 error?

### Example Test

```typescript
it('should convert "a" to score 5', () => {
  expect(letterToScore("a")).toBe(5);
});

it("should update existing submission instead of creating new", async () => {
  // First submission
  await submitDspSelfEvaluation("test@email.com", "Test", { q1: 3 });

  // Second submission (should UPDATE, not CREATE)
  const result = await submitDspSelfEvaluation("test@email.com", "Test", {
    q1: 5,
  });

  expect(result.data.isUpdate).toBe(true);
});
```

---

## 🚀 Getting Started

### Prerequisites

1. Node.js installed
2. PostgreSQL installed (via Docker or Homebrew)

### Setup Steps

```bash
# 1. Install dependencies
cd my-app
npm install

# 2. Set up your database URL in .env
# DATABASE_URL="postgresql://username@localhost:5432/dsp_observer_db"

# 3. Create the database tables
npm run db:migrate

# 4. (Optional) Add test data
npm run db:seed

# 5. Run the app
npm run dev

# 6. View your database
npm run db:studio
```

---

## 📚 Key Concepts to Learn

If you want to understand this codebase better, learn about:

1. **React Hooks** (`useState`, `useEffect`) — How React manages state
2. **TypeScript** — Adds types to JavaScript for fewer bugs
3. **Next.js App Router** — How pages and API routes work
4. **Prisma** — How to work with databases in TypeScript
5. **REST APIs** — How frontend and backend communicate
6. **Database Design** — Tables, relationships, primary/foreign keys

---

## 🆘 Common Issues

### "User was denied access on the database"

Your `DATABASE_URL` is wrong. Check your username:

```bash
psql -d dsp_observer_db -c "\du"
```

### "This email is not recognized in the directory"

Add your email to `src/app/form/userDirectory.ts`

### Form submits but data doesn't appear

1. Check browser console for errors (F12)
2. Make sure the database is running
3. Make sure you ran `npm run db:migrate`

---

## 🎉 Congratulations!

You now understand how a full-stack form application works! The key takeaways:

1. **Frontend** collects data and sends it to the API
2. **API routes** receive requests and call the service layer
3. **Service layer** contains business logic and talks to the database
4. **Database** stores everything persistently
5. **Tests** make sure everything works correctly

Good luck with your development! 🚀
