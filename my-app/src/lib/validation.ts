/**
 * Validation utilities for API requests
 */

import type { QuestionAnswers, ObserverSubmissionRequest, DspSubmissionRequest } from './types';

// Valid answer values for radio questions (a, b, c, d, e mapped to 1-5)
const VALID_LETTER_VALUES = ['a', 'b', 'c', 'd', 'e'];

// Form field names in order (maps to q1-q33)
export const FORM_FIELD_ORDER = [
  // CHOICE - Human Rights / Disability Rights (q1-q3)
  'privacyKnock',
  'privacyHandsOn', 
  'privacyEducation',
  // CHOICE - Social Identity (q4-q6)
  'clothingChoice',
  'spacePersonalization',
  'leisureActivities',
  // CHOICE - Supported Decision Making (q7-q8)
  'mealOptions',
  'activityOptions',
  // CHOICE - Abuse, Neglect, Exploitation (q9)
  'incidents',
  // BELONGING - Schedules and Routines (q10-q12)
  'personalizedSchedule',
  'groupSchedule',
  'responsibilityChart',
  // BELONGING - Community Engagement (q13-q14)
  'communityOutingsIndividual',
  'communityOutingsGroup',
  // BELONGING - Relationships (q15-q19)
  'phoneAccess',
  'overnightVisits',
  'visitorsFriends',
  'visitorsFamily',
  'visitorsDates',
  // LIFE-LONG LEARNING - Person-Centered Plan (q20)
  'annualPlanUnderstanding',
  // LIFE-LONG LEARNING - Communication Support (q21-q22)
  'communicationSupportDescription',
  'communicationSupportUsage',
  // LIFE-LONG LEARNING - Adult Learning (q23-q24)
  'bstStepsUnderstanding',
  'bstIncorporation',
  // LIFE-LONG LEARNING - Positive Behavioral Supports (q25-q26)
  'behavioralPlanLocation',
  'behavioralDataReporting',
  // HEALTHY LIVING - Health Planning (q27-q29)
  'physicalFormLocation',
  'medicationNeeds',
  'dietaryNeeds',
  // HEALTHY LIVING - Health Equity (q30-q33)
  'exerciseActivities',
  'mentalHealthActivities',
  'healthyHabitsTrainings',
  'personalHygieneEducation',
] as const;

// Fields that are numeric inputs (not radio buttons)
const NUMERIC_FIELDS = [
  'leisureActivities',
  'incidents',
  'communityOutingsIndividual',
  'communityOutingsGroup',
  'overnightVisits',
  'visitorsFriends',
  'visitorsFamily',
  'visitorsDates',
  'exerciseActivities',
  'mentalHealthActivities',
  'healthyHabitsTrainings',
  'personalHygieneEducation',
];

/**
 * Convert letter answer (a, b, c, d, e) to numeric value (5, 4, 3, 2, 1)
 * Higher letters = lower scores (a=5 best, e=1 worst)
 */
export function letterToScore(letter: string): number {
  const scores: Record<string, number> = {
    'a': 5,
    'b': 4,
    'c': 3,
    'd': 2,
    'e': 1,
  };
  return scores[letter.toLowerCase()] ?? 0;
}

/**
 * Convert form data to QuestionAnswers format (q1-q33)
 */
export function formDataToQuestionAnswers(formData: Record<string, string>): QuestionAnswers {
  const answers: QuestionAnswers = {};
  
  FORM_FIELD_ORDER.forEach((fieldName, index) => {
    const questionKey = `q${index + 1}` as keyof QuestionAnswers;
    const value = formData[fieldName];
    
    if (value === '' || value === null || value === undefined) {
      answers[questionKey] = null;
      return;
    }
    
    // Check if this is a numeric field
    if (NUMERIC_FIELDS.includes(fieldName)) {
      const numValue = parseInt(value, 10);
      answers[questionKey] = isNaN(numValue) ? null : numValue;
    } else {
      // It's a letter-based radio answer
      if (VALID_LETTER_VALUES.includes(value.toLowerCase())) {
        answers[questionKey] = letterToScore(value);
      } else {
        answers[questionKey] = null;
      }
    }
  });
  
  return answers;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate that required fields are present
 */
export function validateObserverSubmission(data: Partial<ObserverSubmissionRequest>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!data.observerEmail) {
    errors.push('Observer email is required');
  } else if (!isValidEmail(data.observerEmail)) {
    errors.push('Observer email format is invalid');
  }
  
  if (!data.observerName?.trim()) {
    errors.push('Observer name is required');
  }
  
  if (!data.dspEmail) {
    errors.push('DSP email is required');
  } else if (!isValidEmail(data.dspEmail)) {
    errors.push('DSP email format is invalid');
  }
  
  if (!data.dspName?.trim()) {
    errors.push('DSP name is required');
  }
  
  if (!data.answers || typeof data.answers !== 'object') {
    errors.push('Answers are required');
  } else {
    const hasAnswers = Object.values(data.answers).some(v => v !== null && v !== undefined);
    if (!hasAnswers) {
      errors.push('At least one answer must be provided');
    }
  }
  
  return { valid: errors.length === 0, errors };
}

/**
 * Validate DSP self-evaluation submission
 */
export function validateDspSubmission(data: Partial<DspSubmissionRequest>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!data.dspEmail) {
    errors.push('DSP email is required');
  } else if (!isValidEmail(data.dspEmail)) {
    errors.push('DSP email format is invalid');
  }
  
  if (!data.dspName?.trim()) {
    errors.push('DSP name is required');
  }
  
  if (!data.answers || typeof data.answers !== 'object') {
    errors.push('Answers are required');
  } else {
    const hasAnswers = Object.values(data.answers).some(v => v !== null && v !== undefined);
    if (!hasAnswers) {
      errors.push('At least one answer must be provided');
    }
  }
  
  return { valid: errors.length === 0, errors };
}

/**
 * Count how many questions are answered
 */
export function countAnsweredQuestions(answers: QuestionAnswers): number {
  return Object.values(answers).filter(v => v !== null && v !== undefined).length;
}

