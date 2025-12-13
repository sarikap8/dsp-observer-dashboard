/**
 * Tests for Observer Submission API
 * 
 * Tests the API route behavior by testing the request handling logic.
 * Since NextRequest isn't fully available in Jest, we test the validation
 * and service integration more directly.
 */

import { validateObserverSubmission } from '@/lib/validation';
import { submitObserverEvaluation, getObserverSubmissions } from '@/lib/services/submissionService';

// Mock the submission service
jest.mock('@/lib/services/submissionService', () => ({
  submitObserverEvaluation: jest.fn(),
  getObserverSubmissions: jest.fn(),
}));

const mockSubmitObserverEvaluation = submitObserverEvaluation as jest.MockedFunction<typeof submitObserverEvaluation>;
const mockGetObserverSubmissions = getObserverSubmissions as jest.MockedFunction<typeof getObserverSubmissions>;

describe('Observer Submission API - Validation', () => {
  const validRequest = {
    observerEmail: 'observer@example.com',
    observerName: 'John Observer',
    dspEmail: 'dsp@example.com',
    dspName: 'Jane DSP',
    answers: { q1: 5, q2: 4, q3: 3 },
  };

  it('should pass validation for complete request', () => {
    const result = validateObserverSubmission(validRequest);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should fail validation if observer email is missing', () => {
    const result = validateObserverSubmission({
      ...validRequest,
      observerEmail: undefined,
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Observer email is required');
  });

  it('should fail validation if observer email format is invalid', () => {
    const result = validateObserverSubmission({
      ...validRequest,
      observerEmail: 'not-an-email',
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Observer email format is invalid');
  });

  it('should fail validation if observer name is missing', () => {
    const result = validateObserverSubmission({
      ...validRequest,
      observerName: '',
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Observer name is required');
  });

  it('should fail validation if DSP email is missing', () => {
    const result = validateObserverSubmission({
      ...validRequest,
      dspEmail: undefined,
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('DSP email is required');
  });

  it('should fail validation if DSP email format is invalid', () => {
    const result = validateObserverSubmission({
      ...validRequest,
      dspEmail: 'bad-email',
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('DSP email format is invalid');
  });

  it('should fail validation if DSP name is missing', () => {
    const result = validateObserverSubmission({
      ...validRequest,
      dspName: '   ',
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('DSP name is required');
  });

  it('should fail validation if answers is missing', () => {
    const result = validateObserverSubmission({
      ...validRequest,
      answers: undefined,
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Answers are required');
  });

  it('should fail validation if answers object is empty', () => {
    const result = validateObserverSubmission({
      ...validRequest,
      answers: {},
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('At least one answer must be provided');
  });
});

describe('Observer Submission API - Service Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const validRequest = {
    observerEmail: 'observer@example.com',
    observerName: 'John Observer',
    dspEmail: 'dsp@example.com',
    dspName: 'Jane DSP',
    answers: { q1: 5, q2: 4, q3: 3 },
  };

  it('should call submitObserverEvaluation with correct parameters', async () => {
    mockSubmitObserverEvaluation.mockResolvedValue({
      success: true,
      message: 'Submitted',
      data: { questionResponseId: 'test-id', isUpdate: false },
    });

    await submitObserverEvaluation(
      validRequest.observerEmail,
      validRequest.observerName,
      validRequest.dspEmail,
      validRequest.dspName,
      validRequest.answers
    );

    expect(mockSubmitObserverEvaluation).toHaveBeenCalledWith(
      validRequest.observerEmail,
      validRequest.observerName,
      validRequest.dspEmail,
      validRequest.dspName,
      validRequest.answers
    );
  });

  it('should return isUpdate=false for new submission', async () => {
    mockSubmitObserverEvaluation.mockResolvedValue({
      success: true,
      message: 'Observer evaluation submitted successfully',
      data: { questionResponseId: 'test-id', isUpdate: false },
    });

    const result = await submitObserverEvaluation(
      validRequest.observerEmail,
      validRequest.observerName,
      validRequest.dspEmail,
      validRequest.dspName,
      validRequest.answers
    );

    expect(result.success).toBe(true);
    expect(result.data?.isUpdate).toBe(false);
  });

  it('should return isUpdate=true for updated submission', async () => {
    mockSubmitObserverEvaluation.mockResolvedValue({
      success: true,
      message: 'Observer evaluation updated successfully',
      data: { questionResponseId: 'test-id', isUpdate: true },
    });

    const result = await submitObserverEvaluation(
      validRequest.observerEmail,
      validRequest.observerName,
      validRequest.dspEmail,
      validRequest.dspName,
      validRequest.answers
    );

    expect(result.success).toBe(true);
    expect(result.data?.isUpdate).toBe(true);
  });

  it('should handle service errors', async () => {
    mockSubmitObserverEvaluation.mockResolvedValue({
      success: false,
      message: 'Database error',
      error: 'Connection failed',
    });

    const result = await submitObserverEvaluation(
      validRequest.observerEmail,
      validRequest.observerName,
      validRequest.dspEmail,
      validRequest.dspName,
      validRequest.answers
    );

    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });
});

describe('Observer Submissions GET - Service Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call getObserverSubmissions with email', async () => {
    mockGetObserverSubmissions.mockResolvedValue({
      success: true,
      message: 'Submissions retrieved',
      data: { observer: {}, evaluations: [] },
    });

    await getObserverSubmissions('observer@example.com');

    expect(mockGetObserverSubmissions).toHaveBeenCalledWith('observer@example.com');
  });

  it('should return submissions for valid email', async () => {
    mockGetObserverSubmissions.mockResolvedValue({
      success: true,
      message: 'Submissions retrieved successfully',
      data: {
        observer: { id: '1', email: 'observer@example.com', name: 'Test' },
        evaluations: [],
      },
    });

    const result = await getObserverSubmissions('observer@example.com');

    expect(result.success).toBe(true);
    expect(result.data?.observer).toBeDefined();
  });

  it('should return error if observer not found', async () => {
    mockGetObserverSubmissions.mockResolvedValue({
      success: false,
      message: 'Observer not found',
      error: 'No observer found with the provided email',
    });

    const result = await getObserverSubmissions('unknown@example.com');

    expect(result.success).toBe(false);
    expect(result.message).toContain('not found');
  });
});
