/**
 * Observer Submission API Routes
 * 
 * POST /api/submissions/observer - Submit an observer evaluation for a DSP
 * GET /api/submissions/observer?email=xxx - Get all submissions by an observer
 */

import { NextRequest, NextResponse } from 'next/server';
import { submitObserverEvaluation, getObserverSubmissions } from '@/lib/services/submissionService';
import type { ObserverSubmissionRequest } from '@/lib/types';

/**
 * POST /api/submissions/observer
 * 
 * Submit an observer evaluation for a DSP.
 * If the observer has already submitted for this DSP, updates the existing submission.
 */
export async function POST(request: NextRequest) {
  try {
    const body: ObserverSubmissionRequest = await request.json();
    
    // Validate required fields
    const { observerEmail, observerName, dspEmail, dspName, answers } = body;
    
    if (!observerEmail || !observerName) {
      return NextResponse.json(
        { success: false, message: 'Observer email and name are required' },
        { status: 400 }
      );
    }
    
    if (!dspEmail || !dspName) {
      return NextResponse.json(
        { success: false, message: 'DSP email and name are required' },
        { status: 400 }
      );
    }
    
    if (!answers || typeof answers !== 'object') {
      return NextResponse.json(
        { success: false, message: 'Answers object is required' },
        { status: 400 }
      );
    }
    
    // Validate that at least one answer is provided
    const hasAnswers = Object.values(answers).some((v) => v !== null && v !== undefined);
    if (!hasAnswers) {
      return NextResponse.json(
        { success: false, message: 'At least one answer must be provided' },
        { status: 400 }
      );
    }
    
    // Submit the evaluation
    const result = await submitObserverEvaluation(
      observerEmail,
      observerName,
      dspEmail,
      dspName,
      answers
    );
    
    if (!result.success) {
      return NextResponse.json(result, { status: 500 });
    }
    
    return NextResponse.json(result, { status: result.data?.isUpdate ? 200 : 201 });
  } catch (error) {
    console.error('Error in POST /api/submissions/observer:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/submissions/observer?email=xxx
 * 
 * Get all submissions made by a specific observer.
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');
    
    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Observer email is required as query parameter' },
        { status: 400 }
      );
    }
    
    const result = await getObserverSubmissions(email);
    
    if (!result.success) {
      return NextResponse.json(result, { status: 404 });
    }
    
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/submissions/observer:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

