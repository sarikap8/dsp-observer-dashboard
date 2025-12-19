/**
 * Email Service
 * 
 * Handles sending emails using nodemailer
 */

import nodemailer from 'nodemailer';

// Create a transporter - using a test account for development
// In production, you would use real SMTP credentials
let transporter: nodemailer.Transporter | null = null;

async function getTransporter() {
  if (transporter) return transporter;

  // Check if we have real SMTP credentials
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  } else {
    // Use Ethereal for testing (creates a test account)
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    console.log('Using Ethereal test email account:', testAccount.user);
  }

  return transporter;
}

export type SendEmailResult = {
  success: boolean;
  message: string;
  previewUrl?: string;
  error?: string;
};

/**
 * Send a reminder email to a DSP
 */
export async function sendReminderEmail(
  toEmail: string,
  toName: string,
  fromName: string,
  fromEmail?: string
): Promise<SendEmailResult> {
  try {
    const transport = await getTransporter();
    
    const observerEmail = fromEmail || 'support@nextforautism.org';
    const dashboardUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const mailOptions = {
      from: `"NEXT for Autism" <noreply@nextforautism.org>`,
      to: toEmail,
      subject: `[NEXT for Autism] Action Needed: Submit Your Performance Review`,
      text: `Dear ${toName},

This is a friendly reminder that your self-evaluation performance review form is due soon.

We have not yet received your submission and wanted to ensure you have adequate time to complete the evaluation before the deadline.

What You Need to Do:

1. Log in to the performance dashboard
2. Complete your self-evaluation form
3. After submission, return to the dashboard to review your personalized resource recommendations

Once you complete your form, our system will automatically generate personalized resource recommendations based on your feedback and your manager's evaluation. These resources are designed to support your professional growth and development. Be sure to log back into the dashboard to review these recommendations.

Need help? Contact ${fromName} at ${observerEmail}

Thank you for your dedication to providing excellent service!

Best regards,
NEXT for Autism Team`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <div style="background-color: #041e42; padding: 25px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">NEXT for Autism</h1>
            <p style="color: #8ecae6; margin: 5px 0 0 0; font-size: 14px;">Performance Review System</p>
          </div>
          
          <div style="padding: 35px 30px; background-color: #ffffff;">
            <h2 style="color: #041e42; margin-top: 0;">Dear ${toName},</h2>
            
            <p style="color: #333; font-size: 16px; line-height: 1.7;">
              This is a friendly reminder that your <strong>self-evaluation performance review form</strong> is due soon.
            </p>
            
            <p style="color: #333; font-size: 16px; line-height: 1.7;">
              We have not yet received your submission and wanted to ensure you have adequate time to complete the evaluation before the deadline.
            </p>
            
            <div style="background-color: #f0f7ff; border-left: 4px solid #0072ce; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
              <h3 style="color: #041e42; margin: 0 0 15px 0; font-size: 16px;">What You Need to Do:</h3>
              <ol style="color: #333; font-size: 15px; line-height: 1.8; margin: 0; padding-left: 20px;">
                <li>Log in to the performance dashboard</li>
                <li>Complete your self-evaluation form</li>
                <li>After submission, return to the dashboard to review your personalized resource recommendations</li>
              </ol>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${dashboardUrl}" 
                 style="background-color: #0072ce; color: white; padding: 14px 35px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">
                Go to Dashboard
              </a>
            </div>
            
            <div style="background-color: #e8f5e9; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <p style="color: #2e7d32; font-size: 15px; line-height: 1.7; margin: 0;">
                <strong>💡 Tip:</strong> Once you complete your form, our system will automatically generate personalized resource recommendations based on your feedback and your manager's evaluation. These resources are designed to support your professional growth and development.
              </p>
            </div>
            
            <p style="color: #666; font-size: 14px; line-height: 1.6; margin-top: 25px;">
              <strong>Need help?</strong> Contact ${fromName} at <a href="mailto:${observerEmail}" style="color: #0072ce;">${observerEmail}</a>
            </p>
            
            <p style="color: #333; font-size: 16px; line-height: 1.7; margin-top: 25px;">
              Thank you for your dedication to providing excellent service!
            </p>
            
            <p style="color: #333; font-size: 16px; margin-top: 25px;">
              Best regards,<br>
              <strong>NEXT for Autism Team</strong>
            </p>
          </div>
          
          <div style="background-color: #041e42; padding: 20px; text-align: center;">
            <p style="color: #8ecae6; font-size: 12px; margin: 0;">
              NEXT for Autism - DSP Performance Evaluation System
            </p>
            <p style="color: #666; font-size: 11px; margin: 10px 0 0 0;">
              This is an automated message. Please do not reply directly to this email.
            </p>
          </div>
        </div>
      `,
    };

    const info = await transport.sendMail(mailOptions);
    
    // Get preview URL for Ethereal (test) emails
    const previewUrl = nodemailer.getTestMessageUrl(info);

    console.log('Email sent:', info.messageId);
    if (previewUrl) {
      console.log('Preview URL:', previewUrl);
    }

    return {
      success: true,
      message: `Reminder sent to ${toEmail}`,
      previewUrl: previewUrl || undefined,
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      message: 'Failed to send reminder email',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
