/**
 * API Route: /api/dsps
 * 
 * Handles DSP management operations:
 * - GET: Retrieve all DSPs
 * - POST: Add a new DSP
 */

import { NextRequest, NextResponse } from 'next/server';
import { addDsp, getAllDsps } from '@/lib/services/submissionService';

/**
 * GET /api/dsps
 * 
 * Retrieve all DSPs in the system
 */
export async function GET() {
  try {
    const result = await getAllDsps();
    
    if (!result.success) {
      return NextResponse.json(result, { status: 500 });
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in GET /api/dsps:', error);
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
 * POST /api/dsps
 * 
 * Add a new DSP
 * 
 * Request body:
 * - dspEmail: string (required) - Email of the DSP
 * - dspName: string (required) - Name of the DSP
 * - observerEmail: string (optional) - Email of the observer adding this DSP
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { dspEmail, dspName, observerEmail } = body;
    
    // Validate required fields
    if (!dspEmail || typeof dspEmail !== 'string') {
      return NextResponse.json(
        {
          success: false,
          message: 'DSP email is required',
          error: 'VALIDATION_ERROR',
        },
        { status: 400 }
      );
    }
    
    if (!dspName || typeof dspName !== 'string') {
      return NextResponse.json(
        {
          success: false,
          message: 'DSP name is required',
          error: 'VALIDATION_ERROR',
        },
        { status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(dspEmail)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid DSP email format',
          error: 'VALIDATION_ERROR',
        },
        { status: 400 }
      );
    }
    
    const result = await addDsp(dspEmail, dspName.trim(), observerEmail);
    
    if (!result.success) {
      const status = result.error === 'DUPLICATE_EMAIL' ? 409 : 500;
      return NextResponse.json(result, { status });
    }
    
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/dsps:', error);
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

