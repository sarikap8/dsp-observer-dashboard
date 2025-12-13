/**
 * Tests for validation.ts
 * 
 * Tests the form-to-question mapping and validation utilities.
 */

import {
  letterToScore,
  formDataToQuestionAnswers,
  isValidEmail,
  validateObserverSubmission,
  validateDspSubmission,
  countAnsweredQuestions,
  FORM_FIELD_ORDER,
} from '@/lib/validation';

describe('letterToScore', () => {
  it('should convert "a" to score 5', () => {
    expect(letterToScore('a')).toBe(5);
  });

  it('should convert "b" to score 4', () => {
    expect(letterToScore('b')).toBe(4);
  });

  it('should convert "c" to score 3', () => {
    expect(letterToScore('c')).toBe(3);
  });

  it('should convert "d" to score 2', () => {
    expect(letterToScore('d')).toBe(2);
  });

  it('should convert "e" to score 1', () => {
    expect(letterToScore('e')).toBe(1);
  });

  it('should handle uppercase letters', () => {
    expect(letterToScore('A')).toBe(5);
    expect(letterToScore('E')).toBe(1);
  });

  it('should return 0 for invalid letters', () => {
    expect(letterToScore('z')).toBe(0);
    expect(letterToScore('')).toBe(0);
  });
});

describe('FORM_FIELD_ORDER', () => {
  it('should have exactly 33 fields', () => {
    expect(FORM_FIELD_ORDER.length).toBe(33);
  });

  it('should start with privacyKnock (q1)', () => {
    expect(FORM_FIELD_ORDER[0]).toBe('privacyKnock');
  });

  it('should end with personalHygieneEducation (q33)', () => {
    expect(FORM_FIELD_ORDER[32]).toBe('personalHygieneEducation');
  });
});

describe('formDataToQuestionAnswers', () => {
  it('should convert radio button answers to scores', () => {
    const formData = {
      privacyKnock: 'a',      // q1 -> 5
      privacyHandsOn: 'b',    // q2 -> 4
      privacyEducation: 'c',  // q3 -> 3
    };

    const result = formDataToQuestionAnswers(formData);

    expect(result.q1).toBe(5);
    expect(result.q2).toBe(4);
    expect(result.q3).toBe(3);
  });

  it('should handle numeric input fields directly', () => {
    const formData = {
      leisureActivities: '10',              // q6 - numeric field
      incidents: '0',                       // q9 - numeric field
      communityOutingsIndividual: '5',      // q13 - numeric field
    };

    const result = formDataToQuestionAnswers(formData);

    expect(result.q6).toBe(10);
    expect(result.q9).toBe(0);
    expect(result.q13).toBe(5);
  });

  it('should set empty values to null', () => {
    const formData = {
      privacyKnock: '',
      privacyHandsOn: '',
    };

    const result = formDataToQuestionAnswers(formData);

    expect(result.q1).toBeNull();
    expect(result.q2).toBeNull();
  });

  it('should set undefined values to null', () => {
    const formData = {};

    const result = formDataToQuestionAnswers(formData);

    expect(result.q1).toBeNull();
    expect(result.q33).toBeNull();
  });

  it('should convert all 33 fields correctly', () => {
    // Numeric fields need numeric values, letter fields need letter values
    const NUMERIC_FIELDS = [
      'leisureActivities', 'incidents', 'communityOutingsIndividual', 'communityOutingsGroup',
      'overnightVisits', 'visitorsFriends', 'visitorsFamily', 'visitorsDates',
      'exerciseActivities', 'mentalHealthActivities', 'healthyHabitsTrainings', 'personalHygieneEducation',
    ];
    
    const formData: Record<string, string> = {};
    FORM_FIELD_ORDER.forEach((field) => {
      if (NUMERIC_FIELDS.includes(field)) {
        formData[field] = '5'; // Numeric value
      } else {
        formData[field] = 'a'; // Letter value
      }
    });

    const result = formDataToQuestionAnswers(formData);

    // All 33 questions should have a value
    for (let i = 1; i <= 33; i++) {
      const key = `q${i}` as keyof typeof result;
      expect(result[key]).not.toBeNull();
    }
  });
});

describe('isValidEmail', () => {
  it('should return true for valid emails', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('user.name@domain.org')).toBe(true);
    expect(isValidEmail('user+tag@example.co.uk')).toBe(true);
  });

  it('should return false for invalid emails', () => {
    expect(isValidEmail('')).toBe(false);
    expect(isValidEmail('invalid')).toBe(false);
    expect(isValidEmail('missing@domain')).toBe(false);
    expect(isValidEmail('@nodomain.com')).toBe(false);
    expect(isValidEmail('spaces in@email.com')).toBe(false);
  });
});

describe('validateObserverSubmission', () => {
  const validSubmission = {
    observerEmail: 'observer@example.com',
    observerName: 'John Observer',
    dspEmail: 'dsp@example.com',
    dspName: 'Jane DSP',
    answers: { q1: 5 },
  };

  it('should return valid for complete submission', () => {
    const result = validateObserverSubmission(validSubmission);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should require observer email', () => {
    const result = validateObserverSubmission({
      ...validSubmission,
      observerEmail: undefined,
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Observer email is required');
  });

  it('should validate observer email format', () => {
    const result = validateObserverSubmission({
      ...validSubmission,
      observerEmail: 'invalid-email',
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Observer email format is invalid');
  });

  it('should require observer name', () => {
    const result = validateObserverSubmission({
      ...validSubmission,
      observerName: '',
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Observer name is required');
  });

  it('should require DSP email', () => {
    const result = validateObserverSubmission({
      ...validSubmission,
      dspEmail: undefined,
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('DSP email is required');
  });

  it('should validate DSP email format', () => {
    const result = validateObserverSubmission({
      ...validSubmission,
      dspEmail: 'not-an-email',
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('DSP email format is invalid');
  });

  it('should require DSP name', () => {
    const result = validateObserverSubmission({
      ...validSubmission,
      dspName: '   ',
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('DSP name is required');
  });

  it('should require at least one answer', () => {
    const result = validateObserverSubmission({
      ...validSubmission,
      answers: {},
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('At least one answer must be provided');
  });

  it('should require answers object', () => {
    const result = validateObserverSubmission({
      ...validSubmission,
      answers: undefined,
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Answers are required');
  });
});

describe('validateDspSubmission', () => {
  const validSubmission = {
    dspEmail: 'dsp@example.com',
    dspName: 'Jane DSP',
    answers: { q1: 5 },
  };

  it('should return valid for complete submission', () => {
    const result = validateDspSubmission(validSubmission);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should require DSP email', () => {
    const result = validateDspSubmission({
      ...validSubmission,
      dspEmail: undefined,
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('DSP email is required');
  });

  it('should validate DSP email format', () => {
    const result = validateDspSubmission({
      ...validSubmission,
      dspEmail: 'bad-email',
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('DSP email format is invalid');
  });

  it('should require DSP name', () => {
    const result = validateDspSubmission({
      ...validSubmission,
      dspName: '',
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('DSP name is required');
  });

  it('should require at least one answer', () => {
    const result = validateDspSubmission({
      ...validSubmission,
      answers: { q1: null, q2: null },
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('At least one answer must be provided');
  });
});

describe('countAnsweredQuestions', () => {
  it('should count non-null answers', () => {
    const answers = {
      q1: 5,
      q2: 4,
      q3: null,
      q4: 3,
      q5: null,
    };
    expect(countAnsweredQuestions(answers)).toBe(3);
  });

  it('should return 0 for empty answers', () => {
    expect(countAnsweredQuestions({})).toBe(0);
  });

  it('should return 0 for all null answers', () => {
    const answers = {
      q1: null,
      q2: null,
      q3: null,
    };
    expect(countAnsweredQuestions(answers)).toBe(0);
  });

  it('should count all 33 questions when all answered', () => {
    const answers: Record<string, number> = {};
    for (let i = 1; i <= 33; i++) {
      answers[`q${i}`] = 5;
    }
    expect(countAnsweredQuestions(answers)).toBe(33);
  });
});

