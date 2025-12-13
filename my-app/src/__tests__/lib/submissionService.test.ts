/**
 * Tests for submissionService.ts
 * 
 * Tests the business logic for Observer and DSP submissions.
 */

import prisma from '@/lib/db';
import {
  submitObserverEvaluation,
  submitDspSelfEvaluation,
} from '@/lib/services/submissionService';

// Reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});

describe('submitObserverEvaluation', () => {
  const observerEmail = 'observer@example.com';
  const observerName = 'John Observer';
  const dspEmail = 'dsp@example.com';
  const dspName = 'Jane DSP';
  const answers = { q1: 5, q2: 4, q3: 3 };

  it('should create new observer if not exists', async () => {
    const mockTx = {
      observer: {
        findUnique: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockResolvedValue({ id: 'new-observer-id', email: observerEmail, name: observerName }),
      },
      dsp: {
        findUnique: jest.fn().mockResolvedValue({ id: 'existing-dsp-id', email: dspEmail, name: dspName }),
        create: jest.fn(),
      },
      observerSubmission: {
        findUnique: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockResolvedValue({ id: 'sub-id' }),
      },
      questionResponse: {
        create: jest.fn().mockResolvedValue({ id: 'qr-id' }),
      },
    };

    (prisma.$transaction as jest.Mock).mockImplementation((callback) => callback(mockTx));

    const result = await submitObserverEvaluation(observerEmail, observerName, dspEmail, dspName, answers);

    expect(result.success).toBe(true);
    expect(result.data?.isUpdate).toBe(false);
    expect(mockTx.observer.create).toHaveBeenCalledWith({
      data: { email: observerEmail.toLowerCase(), name: observerName },
    });
  });

  it('should use existing observer if found', async () => {
    const existingObserver = { id: 'existing-observer-id', email: observerEmail, name: observerName };
    const mockTx = {
      observer: {
        findUnique: jest.fn().mockResolvedValue(existingObserver),
        create: jest.fn(),
      },
      dsp: {
        findUnique: jest.fn().mockResolvedValue({ id: 'dsp-id', email: dspEmail, name: dspName }),
        create: jest.fn(),
      },
      observerSubmission: {
        findUnique: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockResolvedValue({ id: 'sub-id' }),
      },
      questionResponse: {
        create: jest.fn().mockResolvedValue({ id: 'qr-id' }),
      },
    };

    (prisma.$transaction as jest.Mock).mockImplementation((callback) => callback(mockTx));

    const result = await submitObserverEvaluation(observerEmail, observerName, dspEmail, dspName, answers);

    expect(result.success).toBe(true);
    expect(mockTx.observer.create).not.toHaveBeenCalled();
  });

  it('should create new DSP if not exists', async () => {
    const mockTx = {
      observer: {
        findUnique: jest.fn().mockResolvedValue({ id: 'observer-id', email: observerEmail, name: observerName }),
        create: jest.fn(),
      },
      dsp: {
        findUnique: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockResolvedValue({ id: 'new-dsp-id', email: dspEmail, name: dspName }),
      },
      observerSubmission: {
        findUnique: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockResolvedValue({ id: 'sub-id' }),
      },
      questionResponse: {
        create: jest.fn().mockResolvedValue({ id: 'qr-id' }),
      },
    };

    (prisma.$transaction as jest.Mock).mockImplementation((callback) => callback(mockTx));

    const result = await submitObserverEvaluation(observerEmail, observerName, dspEmail, dspName, answers);

    expect(result.success).toBe(true);
    expect(mockTx.dsp.create).toHaveBeenCalledWith({
      data: { email: dspEmail.toLowerCase(), name: dspName },
    });
  });

  it('should update existing submission instead of creating new one', async () => {
    const existingSubmission = {
      id: 'existing-submission-id',
      questionResponseId: 'existing-qr-id',
      questionResponse: { id: 'existing-qr-id', q1: 1, q2: 2 },
    };

    const mockTx = {
      observer: {
        findUnique: jest.fn().mockResolvedValue({ id: 'observer-id', email: observerEmail }),
      },
      dsp: {
        findUnique: jest.fn().mockResolvedValue({ id: 'dsp-id', email: dspEmail }),
      },
      observerSubmission: {
        findUnique: jest.fn().mockResolvedValue(existingSubmission),
        update: jest.fn().mockResolvedValue(existingSubmission),
      },
      questionResponse: {
        update: jest.fn().mockResolvedValue({ id: 'existing-qr-id', ...answers }),
      },
    };

    (prisma.$transaction as jest.Mock).mockImplementation((callback) => callback(mockTx));

    const result = await submitObserverEvaluation(observerEmail, observerName, dspEmail, dspName, answers);

    expect(result.success).toBe(true);
    expect(result.data?.isUpdate).toBe(true);
    expect(result.data?.questionResponseId).toBe('existing-qr-id');
    expect(mockTx.questionResponse.update).toHaveBeenCalledWith({
      where: { id: 'existing-qr-id' },
      data: expect.objectContaining(answers),
    });
  });

  it('should create new submission for first-time observer-dsp pair', async () => {
    const mockTx = {
      observer: {
        findUnique: jest.fn().mockResolvedValue({ id: 'observer-id', email: observerEmail }),
      },
      dsp: {
        findUnique: jest.fn().mockResolvedValue({ id: 'dsp-id', email: dspEmail }),
      },
      observerSubmission: {
        findUnique: jest.fn().mockResolvedValue(null), // No existing submission
        create: jest.fn().mockResolvedValue({ id: 'new-submission-id' }),
      },
      questionResponse: {
        create: jest.fn().mockResolvedValue({ id: 'new-qr-id' }),
      },
    };

    (prisma.$transaction as jest.Mock).mockImplementation((callback) => callback(mockTx));

    const result = await submitObserverEvaluation(observerEmail, observerName, dspEmail, dspName, answers);

    expect(result.success).toBe(true);
    expect(result.data?.isUpdate).toBe(false);
    expect(mockTx.questionResponse.create).toHaveBeenCalledWith({ data: answers });
    expect(mockTx.observerSubmission.create).toHaveBeenCalled();
  });

  it('should handle database errors gracefully', async () => {
    (prisma.$transaction as jest.Mock).mockRejectedValue(new Error('Database connection failed'));

    const result = await submitObserverEvaluation(observerEmail, observerName, dspEmail, dspName, answers);

    expect(result.success).toBe(false);
    expect(result.message).toContain('Failed to submit');
    expect(result.error).toBeDefined();
  });
});

describe('submitDspSelfEvaluation', () => {
  const dspEmail = 'dsp@example.com';
  const dspName = 'Jane DSP';
  const answers = { q1: 5, q2: 4, q3: 3 };

  it('should create new DSP if not exists', async () => {
    const mockTx = {
      dsp: {
        findUnique: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockResolvedValue({ id: 'new-dsp-id', email: dspEmail, name: dspName }),
      },
      dspSubmission: {
        findUnique: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockResolvedValue({ id: 'sub-id' }),
      },
      questionResponse: {
        create: jest.fn().mockResolvedValue({ id: 'qr-id' }),
      },
    };

    (prisma.$transaction as jest.Mock).mockImplementation((callback) => callback(mockTx));

    const result = await submitDspSelfEvaluation(dspEmail, dspName, answers);

    expect(result.success).toBe(true);
    expect(result.data?.isUpdate).toBe(false);
    expect(mockTx.dsp.create).toHaveBeenCalledWith({
      data: { email: dspEmail.toLowerCase(), name: dspName },
    });
  });

  it('should use existing DSP if found', async () => {
    const existingDsp = { id: 'existing-dsp-id', email: dspEmail, name: dspName };
    const mockTx = {
      dsp: {
        findUnique: jest.fn().mockResolvedValue(existingDsp),
        create: jest.fn(),
      },
      dspSubmission: {
        findUnique: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockResolvedValue({ id: 'sub-id' }),
      },
      questionResponse: {
        create: jest.fn().mockResolvedValue({ id: 'qr-id' }),
      },
    };

    (prisma.$transaction as jest.Mock).mockImplementation((callback) => callback(mockTx));

    const result = await submitDspSelfEvaluation(dspEmail, dspName, answers);

    expect(result.success).toBe(true);
    expect(mockTx.dsp.create).not.toHaveBeenCalled();
  });

  it('should update existing self-evaluation instead of creating new one', async () => {
    const existingSubmission = {
      id: 'existing-submission-id',
      questionResponseId: 'existing-qr-id',
      questionResponse: { id: 'existing-qr-id', q1: 1, q2: 2 },
    };

    const mockTx = {
      dsp: {
        findUnique: jest.fn().mockResolvedValue({ id: 'dsp-id', email: dspEmail }),
      },
      dspSubmission: {
        findUnique: jest.fn().mockResolvedValue(existingSubmission),
        update: jest.fn().mockResolvedValue(existingSubmission),
      },
      questionResponse: {
        update: jest.fn().mockResolvedValue({ id: 'existing-qr-id', ...answers }),
      },
    };

    (prisma.$transaction as jest.Mock).mockImplementation((callback) => callback(mockTx));

    const result = await submitDspSelfEvaluation(dspEmail, dspName, answers);

    expect(result.success).toBe(true);
    expect(result.data?.isUpdate).toBe(true);
    expect(result.data?.questionResponseId).toBe('existing-qr-id');
    expect(mockTx.questionResponse.update).toHaveBeenCalledWith({
      where: { id: 'existing-qr-id' },
      data: expect.objectContaining(answers),
    });
  });

  it('should create new submission for first-time DSP', async () => {
    const mockTx = {
      dsp: {
        findUnique: jest.fn().mockResolvedValue({ id: 'dsp-id', email: dspEmail }),
      },
      dspSubmission: {
        findUnique: jest.fn().mockResolvedValue(null), // No existing submission
        create: jest.fn().mockResolvedValue({ id: 'new-submission-id' }),
      },
      questionResponse: {
        create: jest.fn().mockResolvedValue({ id: 'new-qr-id' }),
      },
    };

    (prisma.$transaction as jest.Mock).mockImplementation((callback) => callback(mockTx));

    const result = await submitDspSelfEvaluation(dspEmail, dspName, answers);

    expect(result.success).toBe(true);
    expect(result.data?.isUpdate).toBe(false);
    expect(mockTx.questionResponse.create).toHaveBeenCalledWith({ data: answers });
    expect(mockTx.dspSubmission.create).toHaveBeenCalled();
  });

  it('should handle database errors gracefully', async () => {
    (prisma.$transaction as jest.Mock).mockRejectedValue(new Error('Database connection failed'));

    const result = await submitDspSelfEvaluation(dspEmail, dspName, answers);

    expect(result.success).toBe(false);
    expect(result.message).toContain('Failed to submit');
    expect(result.error).toBeDefined();
  });

  it('should normalize email to lowercase', async () => {
    const mockTx = {
      dsp: {
        findUnique: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockResolvedValue({ id: 'dsp-id', email: 'dsp@example.com' }),
      },
      dspSubmission: {
        findUnique: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockResolvedValue({ id: 'sub-id' }),
      },
      questionResponse: {
        create: jest.fn().mockResolvedValue({ id: 'qr-id' }),
      },
    };

    (prisma.$transaction as jest.Mock).mockImplementation((callback) => callback(mockTx));

    await submitDspSelfEvaluation('DSP@EXAMPLE.COM', dspName, answers);

    expect(mockTx.dsp.findUnique).toHaveBeenCalledWith({
      where: { email: 'dsp@example.com' },
    });
  });
});

