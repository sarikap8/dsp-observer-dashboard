/**
 * Database Seed Script
 * 
 * Run with: npm run db:seed
 * 
 * This script populates the database with sample data for testing.
 */

import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create sample DSPs
  const dsp1 = await prisma.dsp.upsert({
    where: { email: 'john.steven@example.com' },
    update: {},
    create: {
      email: 'john.steven@example.com',
      name: 'John Steven',
    },
  });

  const dsp2 = await prisma.dsp.upsert({
    where: { email: 'jane.doe@example.com' },
    update: {},
    create: {
      email: 'jane.doe@example.com',
      name: 'Jane Doe',
    },
  });

  console.log(`✅ Created DSPs: ${dsp1.name}, ${dsp2.name}`);

  // Create sample observers
  const observer1 = await prisma.observer.upsert({
    where: { email: 'observer1@example.com' },
    update: {},
    create: {
      email: 'observer1@example.com',
      name: 'Observer One',
    },
  });

  const observer2 = await prisma.observer.upsert({
    where: { email: 'observer2@example.com' },
    update: {},
    create: {
      email: 'observer2@example.com',
      name: 'Observer Two',
    },
  });

  console.log(`✅ Created Observers: ${observer1.name}, ${observer2.name}`);

  // Create sample question response for DSP self-evaluation
  const dsp1SelfEvalAnswers = await prisma.questionResponse.create({
    data: {
      q1: 4, q2: 3, q3: 5, q4: 4, q5: 3,
      q6: 4, q7: 5, q8: 4, q9: 3, q10: 4,
      q11: 3, q12: 4, q13: 5, q14: 4, q15: 3,
      q16: 4, q17: 3, q18: 5, q19: 4, q20: 3,
      q21: 4, q22: 5, q23: 4, q24: 3, q25: 4,
      q26: 3, q27: 4, q28: 5, q29: 4, q30: 3,
      q31: 4, q32: 3, q33: 5,
    },
  });

  await prisma.dspSubmission.upsert({
    where: { dspId: dsp1.id },
    update: { questionResponseId: dsp1SelfEvalAnswers.id },
    create: {
      dspId: dsp1.id,
      questionResponseId: dsp1SelfEvalAnswers.id,
    },
  });

  console.log(`✅ Created DSP self-evaluation for ${dsp1.name}`);

  // Create sample observer evaluation
  const observer1Dsp1Answers = await prisma.questionResponse.create({
    data: {
      q1: 5, q2: 4, q3: 4, q4: 5, q5: 4,
      q6: 5, q7: 4, q8: 5, q9: 4, q10: 5,
      q11: 4, q12: 5, q13: 4, q14: 5, q15: 4,
      q16: 5, q17: 4, q18: 4, q19: 5, q20: 4,
      q21: 5, q22: 4, q23: 5, q24: 4, q25: 5,
      q26: 4, q27: 5, q28: 4, q29: 5, q30: 4,
      q31: 5, q32: 4, q33: 4,
    },
  });

  await prisma.observerSubmission.upsert({
    where: {
      observerId_dspId: {
        observerId: observer1.id,
        dspId: dsp1.id,
      },
    },
    update: { questionResponseId: observer1Dsp1Answers.id },
    create: {
      observerId: observer1.id,
      dspId: dsp1.id,
      questionResponseId: observer1Dsp1Answers.id,
    },
  });

  console.log(`✅ Created observer evaluation: ${observer1.name} → ${dsp1.name}`);

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

