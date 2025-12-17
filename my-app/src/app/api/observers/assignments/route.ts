/**
 * API Route: /api/observers/assignments
 * 
 * Handles observer-DSP assignments:
 * - GET: Get all DSPs assigned to an observer
 * - POST: Assign a DSP to an observer
 */

import { NextRequest, NextResponse } from 'next/server';
import { getObserverAssignedDsps, assignDspToObserver } from '@/lib/services/submissionService';

/**
 * GET /api/observers/assignments?email=observer@example.com
 * 
 * Get all DSPs assigned to an observer
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');
    
    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Observer email is required' },
        { status: 400 }
      );
    }
    
    const result = await getObserverAssignedDsps(email);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in GET /api/observers/assignments:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/observers/assignments
 * 
 * Assign a DSP to an observer
 * 
 * Request body:
 * - observerEmail: string (required)
 * - dspEmail: string (required)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { observerEmail, dspEmail } = body;
    
    if (!observerEmail || !dspEmail) {
      return NextResponse.json(
        { success: false, message: 'Both observerEmail and dspEmail are required' },
        { status: 400 }
      );
    }
    
    const result = await assignDspToObserver(dspEmail, observerEmail);
    
    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }
    
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/observers/assignments:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
