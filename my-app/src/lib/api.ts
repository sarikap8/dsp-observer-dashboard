/**
 * API Client for form submissions
 * 
 * Client-side utilities for calling the backend API endpoints.
 */

import type { 
  ObserverSubmissionRequest, 
  DspSubmissionRequest, 
  SubmissionResponse 
} from './types';
import { formDataToQuestionAnswers } from './validation';

/**
 * Submit an observer evaluation for a DSP
 */
export async function submitObserverEvaluation(
  observerEmail: string,
  observerName: string,
  dspEmail: string,
  dspName: string,
  formData: Record<string, string>
): Promise<SubmissionResponse> {
  const answers = formDataToQuestionAnswers(formData);
  
  const requestBody: ObserverSubmissionRequest = {
    observerEmail,
    observerName,
    dspEmail,
    dspName,
    answers,
  };
  
  try {
    const response = await fetch('/api/submissions/observer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Failed to submit evaluation',
        error: data.error,
      };
    }
    
    return data as SubmissionResponse;
  } catch (error) {
    console.error('Error submitting observer evaluation:', error);
    return {
      success: false,
      message: 'Network error. Please check your connection and try again.',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Submit a DSP self-evaluation
 */
export async function submitDspSelfEvaluation(
  dspEmail: string,
  dspName: string,
  formData: Record<string, string>
): Promise<SubmissionResponse> {
  const answers = formDataToQuestionAnswers(formData);
  
  const requestBody: DspSubmissionRequest = {
    dspEmail,
    dspName,
    answers,
  };
  
  try {
    const response = await fetch('/api/submissions/dsp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Failed to submit self-evaluation',
        error: data.error,
      };
    }
    
    return data as SubmissionResponse;
  } catch (error) {
    console.error('Error submitting DSP self-evaluation:', error);
    return {
      success: false,
      message: 'Network error. Please check your connection and try again.',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get all submissions for a specific DSP
 */
export async function fetchDspSubmissions(dspEmail: string) {
  try {
    const response = await fetch(`/api/submissions/dsp?email=${encodeURIComponent(dspEmail)}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching DSP submissions:', error);
    return {
      success: false,
      message: 'Network error',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get all submissions made by an observer
 */
export async function fetchObserverSubmissions(observerEmail: string) {
  try {
    const response = await fetch(`/api/submissions/observer?email=${encodeURIComponent(observerEmail)}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching observer submissions:', error);
    return {
      success: false,
      message: 'Network error',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Add a new DSP (called by an Observer)
 */
export async function addNewDsp(
  dspEmail: string,
  dspName: string,
  observerEmail?: string
): Promise<SubmissionResponse> {
  try {
    const response = await fetch('/api/dsps', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dspEmail,
        dspName,
        observerEmail,
      }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Failed to add DSP',
        error: data.error,
      };
    }
    
    return data as SubmissionResponse;
  } catch (error) {
    console.error('Error adding DSP:', error);
    return {
      success: false,
      message: 'Network error. Please check your connection and try again.',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get all DSPs in the system
 */
export async function fetchAllDsps() {
  try {
    const response = await fetch('/api/dsps');
    return await response.json();
  } catch (error) {
    console.error('Error fetching DSPs:', error);
    return {
      success: false,
      message: 'Network error',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

