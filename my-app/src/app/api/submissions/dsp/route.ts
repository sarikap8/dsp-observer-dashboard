/**
 * DSP Submission API Routes
 * 
 * POST /api/submissions/dsp - Submit a DSP self-evaluation
 * GET /api/submissions/dsp?email=xxx - Get all submissions for a DSP (self + observers)
 */

import { NextRequest, NextResponse } from 'next/server';
import { submitDspSelfEvaluation, getDspSubmissions } from '@/lib/services/submissionService';
import type { DspSubmissionRequest } from '@/lib/types';

/**
 * POST /api/submissions/dsp
 * 
 * Submit a DSP self-evaluation.
 * If the DSP has already submitted, updates the existing submission.
 */
export async function POST(request: NextRequest) {
  try {
    const body: DspSubmissionRequest = await request.json();
    
    // Validate required fields
    const { dspEmail, dspName, answers } = body;
    
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
    const result = await submitDspSelfEvaluation(dspEmail, dspName, answers);
    
    if (!result.success) {
      return NextResponse.json(result, { status: 500 });
    }
    
    return NextResponse.json(result, { status: result.data?.isUpdate ? 200 : 201 });
  } catch (error) {
    console.error('Error in POST /api/submissions/dsp:', error);
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
 * GET /api/submissions/dsp?email=xxx
 * 
 * Get all submissions for a specific DSP (both self-evaluation and observer evaluations).
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');
    
    if (!email) {
      return NextResponse.json(
        { success: false, message: 'DSP email is required as query parameter' },
        { status: 400 }
      );
    }
    
    const result = await getDspSubmissions(email);
    
    if (!result.success) {
      return NextResponse.json(result, { status: 404 });
    }
    
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/submissions/dsp:', error);
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

