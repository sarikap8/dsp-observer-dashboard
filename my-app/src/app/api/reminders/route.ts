/**
 * API Route: /api/reminders
 * 
 * Send reminder emails to DSPs
 */

import { NextRequest, NextResponse } from 'next/server';
import { sendReminderEmail } from '@/lib/services/emailService';

/**
 * POST /api/reminders
 * 
 * Send a reminder email to a DSP
 * 
 * Request body:
 * - dspEmail: string (required) - Email of the DSP
 * - dspName: string (required) - Name of the DSP
 * - observerName: string (required) - Name of the observer sending the reminder
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { dspEmail, dspName, observerName, observerEmail } = body;

    // Validate required fields
    if (!dspEmail || !dspName || !observerName) {
      return NextResponse.json(
        {
          success: false,
          message: 'dspEmail, dspName, and observerName are required',
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
          message: 'Invalid email format',
        },
        { status: 400 }
      );
    }

    const result = await sendReminderEmail(dspEmail, dspName, observerName, observerEmail);

    if (!result.success) {
      return NextResponse.json(result, { status: 500 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in POST /api/reminders:', error);
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
