/**
 * Recommendations API Route
 * 
 * GET /api/recommendations?email=<dsp_email>
 * Returns personalized resource recommendations based on ML clustering
 */

import { NextResponse } from 'next/server';
import { getDspSubmissions } from '@/lib/services/submissionService';
import { getRecommendationService } from '@/lib/ml';
import type { QuestionAnswers } from '@/lib/types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email parameter is required',
          error: 'MISSING_EMAIL',
        },
        { status: 400 }
      );
    }

    // Fetch DSP submissions
    const submissionResult = await getDspSubmissions(email);

    if (!submissionResult.success || !submissionResult.data) {
      return NextResponse.json(
        {
          success: false,
          message: 'DSP not found or no submissions available',
          error: submissionResult.error,
        },
        { status: 404 }
      );
    }

    const { selfEvaluation, observerEvaluations } = submissionResult.data;

    // Check if we have at least self-evaluation
    if (!selfEvaluation?.questionResponse) {
      return NextResponse.json(
        {
          success: false,
          message: 'No self-evaluation found. Please complete the self-evaluation form first.',
          error: 'NO_SELF_EVALUATION',
        },
        { status: 400 }
      );
    }

    // Extract question responses
    const selfAnswers = extractQuestionAnswers(selfEvaluation.questionResponse);
    
    // Get observer answers if available (use first observer's evaluation)
    const observerAnswers = observerEvaluations?.[0]?.questionResponse
      ? extractQuestionAnswers(observerEvaluations[0].questionResponse)
      : null;

    // Get recommendations from ML service
    const recommendationService = getRecommendationService();
    const recommendations = recommendationService.getRecommendationsForDsp(
      email,
      selfAnswers,
      observerAnswers,
      5 // Top 5 recommendations
    );

    return NextResponse.json({
      success: true,
      message: 'Recommendations generated successfully',
      data: recommendations,
    });
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to generate recommendations',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * Extract question answers from database response
 */
function extractQuestionAnswers(questionResponse: Record<string, unknown>): QuestionAnswers {
  const answers: QuestionAnswers = {};
  
  for (let i = 1; i <= 33; i++) {
    const key = `q${i}` as keyof QuestionAnswers;
    const value = questionResponse[key];
    if (value !== undefined && value !== null) {
      answers[key] = value as number;
    }
  }
  
  return answers;
}

