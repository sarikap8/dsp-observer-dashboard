/**
 * Type definitions for the evaluation system
 */

// The 33 question responses (all numeric, nullable for partial submissions)
export type QuestionAnswers = {
  q1?: number | null;
  q2?: number | null;
  q3?: number | null;
  q4?: number | null;
  q5?: number | null;
  q6?: number | null;
  q7?: number | null;
  q8?: number | null;
  q9?: number | null;
  q10?: number | null;
  q11?: number | null;
  q12?: number | null;
  q13?: number | null;
  q14?: number | null;
  q15?: number | null;
  q16?: number | null;
  q17?: number | null;
  q18?: number | null;
  q19?: number | null;
  q20?: number | null;
  q21?: number | null;
  q22?: number | null;
  q23?: number | null;
  q24?: number | null;
  q25?: number | null;
  q26?: number | null;
  q27?: number | null;
  q28?: number | null;
  q29?: number | null;
  q30?: number | null;
  q31?: number | null;
  q32?: number | null;
  q33?: number | null;
};

// Observer submission request
export interface ObserverSubmissionRequest {
  observerEmail: string;
  observerName: string;
  dspEmail: string;
  dspName: string;
  answers: QuestionAnswers;
}

// DSP self-evaluation submission request
export interface DspSubmissionRequest {
  dspEmail: string;
  dspName: string;
  answers: QuestionAnswers;
}

// API response types
export interface SubmissionResponse {
  success: boolean;
  message: string;
  data?: {
    questionResponseId: string;
    isUpdate: boolean;
  };
  error?: string;
}

