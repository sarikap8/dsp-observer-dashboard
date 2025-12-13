/**
 * Tests for DSP Submission API
 * 
 * Tests the API route behavior by testing the validation
 * and service integration.
 */

import { validateDspSubmission } from '@/lib/validation';
import { submitDspSelfEvaluation, getDspSubmissions } from '@/lib/services/submissionService';

// Mock the submission service
jest.mock('@/lib/services/submissionService', () => ({
  submitDspSelfEvaluation: jest.fn(),
  getDspSubmissions: jest.fn(),
}));

const mockSubmitDspSelfEvaluation = submitDspSelfEvaluation as jest.MockedFunction<typeof submitDspSelfEvaluation>;
const mockGetDspSubmissions = getDspSubmissions as jest.MockedFunction<typeof getDspSubmissions>;

describe('DSP Submission API - Validation', () => {
  const validRequest = {
    dspEmail: 'dsp@example.com',
    dspName: 'Jane DSP',
    answers: { q1: 5, q2: 4, q3: 3 },
  };

  it('should pass validation for complete request', () => {
    const result = validateDspSubmission(validRequest);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should fail validation if DSP email is missing', () => {
    const result = validateDspSubmission({
      ...validRequest,
      dspEmail: undefined,
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('DSP email is required');
  });

  it('should fail validation if DSP email format is invalid', () => {
    const result = validateDspSubmission({
      ...validRequest,
      dspEmail: 'not-an-email',
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('DSP email format is invalid');
  });

  it('should fail validation if DSP name is missing', () => {
    const result = validateDspSubmission({
      ...validRequest,
      dspName: '',
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('DSP name is required');
  });

  it('should fail validation if answers is missing', () => {
    const result = validateDspSubmission({
      ...validRequest,
      answers: undefined,
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Answers are required');
  });

  it('should fail validation if answers object is empty', () => {
    const result = validateDspSubmission({
      ...validRequest,
      answers: {},
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('At least one answer must be provided');
  });

  it('should fail validation if all answers are null', () => {
    const result = validateDspSubmission({
      ...validRequest,
      answers: { q1: null, q2: null },
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('At least one answer must be provided');
  });
});

describe('DSP Submission API - Service Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const validRequest = {
    dspEmail: 'dsp@example.com',
    dspName: 'Jane DSP',
    answers: { q1: 5, q2: 4, q3: 3 },
  };

  it('should call submitDspSelfEvaluation with correct parameters', async () => {
    mockSubmitDspSelfEvaluation.mockResolvedValue({
      success: true,
      message: 'Submitted',
      data: { questionResponseId: 'test-id', isUpdate: false },
    });

    await submitDspSelfEvaluation(
      validRequest.dspEmail,
      validRequest.dspName,
      validRequest.answers
    );

    expect(mockSubmitDspSelfEvaluation).toHaveBeenCalledWith(
      validRequest.dspEmail,
      validRequest.dspName,
      validRequest.answers
    );
  });

  it('should return isUpdate=false for new submission', async () => {
    mockSubmitDspSelfEvaluation.mockResolvedValue({
      success: true,
      message: 'DSP self-evaluation submitted successfully',
      data: { questionResponseId: 'test-id', isUpdate: false },
    });

    const result = await submitDspSelfEvaluation(
      validRequest.dspEmail,
      validRequest.dspName,
      validRequest.answers
    );

    expect(result.success).toBe(true);
    expect(result.data?.isUpdate).toBe(false);
  });

  it('should return isUpdate=true for updated submission', async () => {
    mockSubmitDspSelfEvaluation.mockResolvedValue({
      success: true,
      message: 'DSP self-evaluation updated successfully',
      data: { questionResponseId: 'test-id', isUpdate: true },
    });

    const result = await submitDspSelfEvaluation(
      validRequest.dspEmail,
      validRequest.dspName,
      validRequest.answers
    );

    expect(result.success).toBe(true);
    expect(result.data?.isUpdate).toBe(true);
  });

  it('should handle service errors', async () => {
    mockSubmitDspSelfEvaluation.mockResolvedValue({
      success: false,
      message: 'Database error',
      error: 'Connection failed',
    });

    const result = await submitDspSelfEvaluation(
      validRequest.dspEmail,
      validRequest.dspName,
      validRequest.answers
    );

    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });
});

describe('DSP Submissions GET - Service Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call getDspSubmissions with email', async () => {
    mockGetDspSubmissions.mockResolvedValue({
      success: true,
      message: 'Submissions retrieved',
      data: { dsp: {}, selfEvaluation: null, observerEvaluations: [] },
    });

    await getDspSubmissions('dsp@example.com');

    expect(mockGetDspSubmissions).toHaveBeenCalledWith('dsp@example.com');
  });

  it('should return submissions for valid email', async () => {
    mockGetDspSubmissions.mockResolvedValue({
      success: true,
      message: 'Submissions retrieved successfully',
      data: {
        dsp: { id: '1', email: 'dsp@example.com', name: 'Test DSP' },
        selfEvaluation: null,
        observerEvaluations: [],
      },
    });

    const result = await getDspSubmissions('dsp@example.com');

    expect(result.success).toBe(true);
    expect(result.data?.dsp).toBeDefined();
  });

  it('should return self-evaluation and observer evaluations', async () => {
    const selfEval = { id: 'self-1', questionResponse: { q1: 5 } };
    const observerEvals = [
      { observer: { name: 'Observer 1' }, questionResponse: { q1: 4 } },
    ];

    mockGetDspSubmissions.mockResolvedValue({
      success: true,
      message: 'Submissions retrieved successfully',
      data: {
        dsp: { id: '1', email: 'dsp@example.com', name: 'Test DSP' },
        selfEvaluation: selfEval,
        observerEvaluations: observerEvals,
      },
    });

    const result = await getDspSubmissions('dsp@example.com');

    expect(result.success).toBe(true);
    expect(result.data?.selfEvaluation).toEqual(selfEval);
    expect(result.data?.observerEvaluations).toHaveLength(1);
  });

  it('should return error if DSP not found', async () => {
    mockGetDspSubmissions.mockResolvedValue({
      success: false,
      message: 'DSP not found',
      error: 'No DSP found with the provided email',
    });

    const result = await getDspSubmissions('unknown@example.com');

    expect(result.success).toBe(false);
    expect(result.message).toContain('not found');
  });
});
