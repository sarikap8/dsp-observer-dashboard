/**
 * Submission Service
 * 
 * Handles all business logic for Observer and DSP form submissions.
 * Uses Prisma transactions to ensure data consistency.
 */

import prisma from '../db';
import type { QuestionAnswers, SubmissionResponse } from '../types';

/**
 * Submit an Observer evaluation for a DSP
 * 
 * Behavior:
 * - Creates observer if first time (based on email)
 * - Creates DSP if not exists (based on email)
 * - If observer has already submitted for this DSP: UPDATE existing question response
 * - If first submission for this (observer, dsp) pair: CREATE new records
 */
export async function submitObserverEvaluation(
  observerEmail: string,
  observerName: string,
  dspEmail: string,
  dspName: string,
  answers: QuestionAnswers
): Promise<SubmissionResponse> {
  try {
    const result = await prisma.$transaction(async (tx) => {
      // Step 1: Find or create the Observer
      let observer = await tx.observer.findUnique({
        where: { email: observerEmail.toLowerCase() },
      });

      if (!observer) {
        observer = await tx.observer.create({
          data: {
            email: observerEmail.toLowerCase(),
            name: observerName,
          },
        });
      }

      // Step 2: Find or create the DSP
      let dsp = await tx.dsp.findUnique({
        where: { email: dspEmail.toLowerCase() },
      });

      if (!dsp) {
        dsp = await tx.dsp.create({
          data: {
            email: dspEmail.toLowerCase(),
            name: dspName,
          },
        });
      }

      // Step 3: Check if this observer has already submitted for this DSP
      const existingSubmission = await tx.observerSubmission.findUnique({
        where: {
          observerId_dspId: {
            observerId: observer.id,
            dspId: dsp.id,
          },
        },
        include: {
          questionResponse: true,
        },
      });

      if (existingSubmission) {
        // UPDATE existing question response (repeat submission)
        await tx.questionResponse.update({
          where: { id: existingSubmission.questionResponseId },
          data: {
            ...answers,
            updatedAt: new Date(),
          },
        });

        // Update the submission timestamp
        await tx.observerSubmission.update({
          where: { id: existingSubmission.id },
          data: { updatedAt: new Date() },
        });

        return {
          questionResponseId: existingSubmission.questionResponseId,
          isUpdate: true,
        };
      } else {
        // CREATE new question response and submission
        const questionResponse = await tx.questionResponse.create({
          data: answers,
        });

        await tx.observerSubmission.create({
          data: {
            observerId: observer.id,
            dspId: dsp.id,
            questionResponseId: questionResponse.id,
          },
        });

        return {
          questionResponseId: questionResponse.id,
          isUpdate: false,
        };
      }
    });

    return {
      success: true,
      message: result.isUpdate
        ? 'Observer evaluation updated successfully'
        : 'Observer evaluation submitted successfully',
      data: result,
    };
  } catch (error) {
    console.error('Error submitting observer evaluation:', error);
    return {
      success: false,
      message: 'Failed to submit observer evaluation',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Submit a DSP self-evaluation
 * 
 * Behavior:
 * - Creates DSP if first time (based on email)
 * - If DSP has already submitted a self-evaluation: UPDATE existing question response
 * - If first self-evaluation: CREATE new records
 */
export async function submitDspSelfEvaluation(
  dspEmail: string,
  dspName: string,
  answers: QuestionAnswers
): Promise<SubmissionResponse> {
  try {
    const result = await prisma.$transaction(async (tx) => {
      // Step 1: Find or create the DSP
      let dsp = await tx.dsp.findUnique({
        where: { email: dspEmail.toLowerCase() },
      });

      if (!dsp) {
        dsp = await tx.dsp.create({
          data: {
            email: dspEmail.toLowerCase(),
            name: dspName,
          },
        });
      }

      // Step 2: Check if this DSP has already submitted a self-evaluation
      const existingSubmission = await tx.dspSubmission.findUnique({
        where: { dspId: dsp.id },
        include: {
          questionResponse: true,
        },
      });

      if (existingSubmission) {
        // UPDATE existing question response (repeat submission)
        await tx.questionResponse.update({
          where: { id: existingSubmission.questionResponseId },
          data: {
            ...answers,
            updatedAt: new Date(),
          },
        });

        // Update the submission timestamp
        await tx.dspSubmission.update({
          where: { id: existingSubmission.id },
          data: { updatedAt: new Date() },
        });

        return {
          questionResponseId: existingSubmission.questionResponseId,
          isUpdate: true,
        };
      } else {
        // CREATE new question response and submission
        const questionResponse = await tx.questionResponse.create({
          data: answers,
        });

        await tx.dspSubmission.create({
          data: {
            dspId: dsp.id,
            questionResponseId: questionResponse.id,
          },
        });

        return {
          questionResponseId: questionResponse.id,
          isUpdate: false,
        };
      }
    });

    return {
      success: true,
      message: result.isUpdate
        ? 'DSP self-evaluation updated successfully'
        : 'DSP self-evaluation submitted successfully',
      data: result,
    };
  } catch (error) {
    console.error('Error submitting DSP self-evaluation:', error);
    return {
      success: false,
      message: 'Failed to submit DSP self-evaluation',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get all submissions for a specific DSP (both observer and self-evaluations)
 */
export async function getDspSubmissions(dspEmail: string) {
  try {
    const dsp = await prisma.dsp.findUnique({
      where: { email: dspEmail.toLowerCase() },
      include: {
        selfSubmission: {
          include: {
            questionResponse: true,
          },
        },
        observerSubmissions: {
          include: {
            observer: true,
            questionResponse: true,
          },
        },
      },
    });

    if (!dsp) {
      return {
        success: false,
        message: 'DSP not found',
        error: 'No DSP found with the provided email',
      };
    }

    return {
      success: true,
      message: 'Submissions retrieved successfully',
      data: {
        dsp: {
          id: dsp.id,
          email: dsp.email,
          name: dsp.name,
        },
        selfEvaluation: dsp.selfSubmission,
        observerEvaluations: dsp.observerSubmissions.map((sub) => ({
          observer: {
            id: sub.observer.id,
            email: sub.observer.email,
            name: sub.observer.name,
          },
          questionResponse: sub.questionResponse,
          submittedAt: sub.createdAt,
          updatedAt: sub.updatedAt,
        })),
      },
    };
  } catch (error) {
    console.error('Error fetching DSP submissions:', error);
    return {
      success: false,
      message: 'Failed to fetch DSP submissions',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get all submissions made by a specific observer
 */
export async function getObserverSubmissions(observerEmail: string) {
  try {
    const observer = await prisma.observer.findUnique({
      where: { email: observerEmail.toLowerCase() },
      include: {
        submissions: {
          include: {
            dsp: true,
            questionResponse: true,
          },
        },
      },
    });

    if (!observer) {
      return {
        success: false,
        message: 'Observer not found',
        error: 'No observer found with the provided email',
      };
    }

    return {
      success: true,
      message: 'Submissions retrieved successfully',
      data: {
        observer: {
          id: observer.id,
          email: observer.email,
          name: observer.name,
        },
        evaluations: observer.submissions.map((sub) => ({
          dsp: {
            id: sub.dsp.id,
            email: sub.dsp.email,
            name: sub.dsp.name,
          },
          questionResponse: sub.questionResponse,
          submittedAt: sub.createdAt,
          updatedAt: sub.updatedAt,
        })),
      },
    };
  } catch (error) {
    console.error('Error fetching observer submissions:', error);
    return {
      success: false,
      message: 'Failed to fetch observer submissions',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

