# Backend Documentation

## Overview

This backend implements a form-based evaluation system for DSP (Direct Support Professional) evaluations. The system supports two types of users:

1. **Observers** - Evaluate DSPs
2. **DSPs** - Evaluate themselves (self-evaluation)

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Language**: TypeScript

---

## Database Schema

### Entity Relationship Diagram

```
┌─────────────────┐       ┌──────────────────────┐       ┌────────────────────┐
│    observers    │       │  observer_submissions │       │        dsps        │
├─────────────────┤       ├──────────────────────┤       ├────────────────────┤
│ observer_id (PK)│◄──────│ observer_id (FK)     │       │ dsp_id (PK)        │
│ email (unique)  │       │ dsp_id (FK)          │───────►│ email (unique)     │
│ name            │       │ question_response_id │       │ name               │
│ created_at      │       │ created_at           │       │ created_at         │
└─────────────────┘       │ updated_at           │       └─────────┬──────────┘
                          │ UNIQUE(observer,dsp) │                 │
                          └──────────┬───────────┘                 │
                                     │                             │
                                     │                             │
                          ┌──────────▼───────────┐      ┌──────────▼──────────┐
                          │  question_responses  │      │   dsp_submissions   │
                          ├──────────────────────┤      ├─────────────────────┤
                          │ question_response_id │◄─────│ question_response_id│
                          │ q1, q2, ... q33      │      │ dsp_id (FK, unique) │
                          │ created_at           │      │ created_at          │
                          │ updated_at           │      │ updated_at          │
                          └──────────────────────┘      └─────────────────────┘
```

### Tables

#### 1. `observers`
Stores observer information.

| Column | Type | Constraints |
|--------|------|-------------|
| observer_id | UUID | PRIMARY KEY |
| email | VARCHAR(255) | UNIQUE, NOT NULL |
| name | VARCHAR(255) | NOT NULL |
| created_at | TIMESTAMP | DEFAULT NOW() |

#### 2. `dsps`
Stores DSP information (each DSP has exactly one row).

| Column | Type | Constraints |
|--------|------|-------------|
| dsp_id | UUID | PRIMARY KEY |
| email | VARCHAR(255) | UNIQUE, NOT NULL |
| name | VARCHAR(255) | NOT NULL |
| created_at | TIMESTAMP | DEFAULT NOW() |

#### 3. `question_responses`
Stores the 33 numeric answers for each form submission.

| Column | Type | Constraints |
|--------|------|-------------|
| question_response_id | UUID | PRIMARY KEY |
| q1 - q33 | INTEGER | NULLABLE |
| created_at | TIMESTAMP | DEFAULT NOW() |
| updated_at | TIMESTAMP | AUTO-UPDATE |

#### 4. `observer_submissions`
Junction table tracking observer evaluations of DSPs.

| Column | Type | Constraints |
|--------|------|-------------|
| submission_id | UUID | PRIMARY KEY |
| observer_id | UUID | FK → observers |
| dsp_id | UUID | FK → dsps |
| question_response_id | UUID | FK → question_responses, UNIQUE |
| created_at | TIMESTAMP | DEFAULT NOW() |
| updated_at | TIMESTAMP | AUTO-UPDATE |
| | | UNIQUE(observer_id, dsp_id) |

#### 5. `dsp_submissions`
DSP self-evaluation submissions.

| Column | Type | Constraints |
|--------|------|-------------|
| submission_id | UUID | PRIMARY KEY |
| dsp_id | UUID | FK → dsps, UNIQUE |
| question_response_id | UUID | FK → question_responses, UNIQUE |
| created_at | TIMESTAMP | DEFAULT NOW() |
| updated_at | TIMESTAMP | AUTO-UPDATE |

---

## API Endpoints

### Observer Submissions

#### `POST /api/submissions/observer`

Submit an observer evaluation for a DSP.

**Request Body:**
```json
{
  "observerEmail": "observer@example.com",
  "observerName": "John Observer",
  "dspEmail": "dsp@example.com",
  "dspName": "Jane DSP",
  "answers": {
    "q1": 4,
    "q2": 5,
    "q3": 3,
    // ... q4 through q33
  }
}
```

**Response (201 Created - New submission):**
```json
{
  "success": true,
  "message": "Observer evaluation submitted successfully",
  "data": {
    "questionResponseId": "uuid-here",
    "isUpdate": false
  }
}
```

**Response (200 OK - Updated existing):**
```json
{
  "success": true,
  "message": "Observer evaluation updated successfully",
  "data": {
    "questionResponseId": "uuid-here",
    "isUpdate": true
  }
}
```

#### `GET /api/submissions/observer?email=observer@example.com`

Get all submissions made by an observer.

**Response:**
```json
{
  "success": true,
  "message": "Submissions retrieved successfully",
  "data": {
    "observer": {
      "id": "uuid",
      "email": "observer@example.com",
      "name": "John Observer"
    },
    "evaluations": [
      {
        "dsp": { "id": "uuid", "email": "dsp@example.com", "name": "Jane DSP" },
        "questionResponse": { "id": "uuid", "q1": 4, ... },
        "submittedAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-02T00:00:00Z"
      }
    ]
  }
}
```

---

### DSP Submissions

#### `POST /api/submissions/dsp`

Submit a DSP self-evaluation.

**Request Body:**
```json
{
  "dspEmail": "dsp@example.com",
  "dspName": "Jane DSP",
  "answers": {
    "q1": 4,
    "q2": 5,
    // ... q3 through q33
  }
}
```

**Response:** Same format as observer submission.

#### `GET /api/submissions/dsp?email=dsp@example.com`

Get all submissions for a DSP (self-evaluation + observer evaluations).

**Response:**
```json
{
  "success": true,
  "message": "Submissions retrieved successfully",
  "data": {
    "dsp": {
      "id": "uuid",
      "email": "dsp@example.com",
      "name": "Jane DSP"
    },
    "selfEvaluation": {
      "id": "uuid",
      "questionResponse": { ... },
      "createdAt": "...",
      "updatedAt": "..."
    },
    "observerEvaluations": [
      {
        "observer": { "id": "uuid", "email": "...", "name": "..." },
        "questionResponse": { ... },
        "submittedAt": "...",
        "updatedAt": "..."
      }
    ]
  }
}
```

---

## Business Logic

### Observer Submission Flow

```
1. Observer submits form for DSP
   │
   ├─► Does observer exist? (by email)
   │   ├─► NO: Create new observer record
   │   └─► YES: Use existing observer_id
   │
   ├─► Does DSP exist? (by email)
   │   ├─► NO: Create new DSP record
   │   └─► YES: Use existing dsp_id
   │
   └─► Has observer already submitted for this DSP?
       ├─► NO: Create new question_response + observer_submission
       └─► YES: UPDATE existing question_response (overwrite answers)
```

### DSP Self-Evaluation Flow

```
1. DSP submits self-evaluation
   │
   ├─► Does DSP exist? (by email)
   │   ├─► NO: Create new DSP record
   │   └─► YES: Use existing dsp_id
   │
   └─► Has DSP already submitted self-evaluation?
       ├─► NO: Create new question_response + dsp_submission
       └─► YES: UPDATE existing question_response (overwrite answers)
```

---

## Setup Instructions

### 1. Install Dependencies

```bash
cd my-app
npm install
```

### 2. Configure Database

Create a `.env` file in the `my-app` directory:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/dsp_observer_db?schema=public"
```

### 3. Generate Prisma Client

```bash
npm run db:generate
```

### 4. Run Database Migrations

```bash
npm run db:migrate
```

### 5. (Optional) Seed Database

```bash
npm run db:seed
```

### 6. Start Development Server

```bash
npm run dev
```

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push schema to database (no migrations) |
| `npm run db:migrate` | Run migrations (development) |
| `npm run db:migrate:prod` | Deploy migrations (production) |
| `npm run db:studio` | Open Prisma Studio GUI |
| `npm run db:seed` | Seed database with sample data |

---

## File Structure

```
my-app/
├── prisma/
│   ├── schema.prisma      # Prisma schema definition
│   ├── schema.sql         # Raw SQL reference (documentation)
│   ├── seed.ts            # Database seed script
│   └── migrations/        # Migration files (auto-generated)
│
├── src/
│   ├── app/
│   │   └── api/
│   │       └── submissions/
│   │           ├── observer/
│   │           │   └── route.ts   # Observer API routes
│   │           └── dsp/
│   │               └── route.ts   # DSP API routes
│   │
│   ├── lib/
│   │   ├── db.ts              # Prisma client singleton
│   │   ├── types.ts           # TypeScript type definitions
│   │   └── services/
│   │       └── submissionService.ts  # Business logic
│   │
│   └── generated/
│       └── prisma/            # Generated Prisma client
│
├── docs/
│   └── BACKEND.md             # This documentation
│
└── .env                       # Environment variables (not committed)
```

---

## Transaction Handling

All database operations use Prisma's `$transaction` to ensure atomicity:

```typescript
const result = await prisma.$transaction(async (tx) => {
  // All operations here are atomic
  const observer = await tx.observer.findUnique(...);
  const questionResponse = await tx.questionResponse.create(...);
  await tx.observerSubmission.create(...);
  return { questionResponseId: questionResponse.id };
});
```

If any operation fails, the entire transaction is rolled back.

---

## Error Handling

All API routes include comprehensive error handling:

- **400 Bad Request**: Missing or invalid request parameters
- **404 Not Found**: Resource not found (e.g., observer/DSP not in database)
- **500 Internal Server Error**: Database or server errors

All errors return a consistent response format:

```json
{
  "success": false,
  "message": "Human-readable error message",
  "error": "Technical error details (development only)"
}
```

