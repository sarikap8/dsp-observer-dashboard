/**
 * Tests for Recommendation Service
 * 
 * Tests the resource recommendation engine functionality.
 */

import {
  RESOURCE_CATALOG,
  getRecommendations,
  RecommendationService,
  DEFAULT_CENTROIDS,
  DEFAULT_PROFILES,
} from '@/lib/ml/recommendations';
import type { QuestionAnswers } from '@/lib/types';

describe('Resource Catalog', () => {
  it('should have resources for all categories', () => {
    const categoriesCovered = new Set<string>();
    
    for (const resource of RESOURCE_CATALOG) {
      for (const cat of resource.targetCategories) {
        categoriesCovered.add(cat);
      }
    }

    expect(categoriesCovered.has('CHOICE')).toBe(true);
    expect(categoriesCovered.has('BELONGING')).toBe(true);
    expect(categoriesCovered.has('LIFELONG_LEARNING')).toBe(true);
    expect(categoriesCovered.has('HEALTHY_LIVING')).toBe(true);
  });

  it('should have unique resource IDs', () => {
    const ids = RESOURCE_CATALOG.map(r => r.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have valid priority levels', () => {
    for (const resource of RESOURCE_CATALOG) {
      expect(['high', 'medium', 'low']).toContain(resource.priority);
    }
  });

  it('should have valid categories', () => {
    const validCategories = ['training', 'guide', 'video', 'workshop', 'mentorship'];
    for (const resource of RESOURCE_CATALOG) {
      expect(validCategories).toContain(resource.category);
    }
  });
});

describe('getRecommendations', () => {
  it('should return recommendations for weak areas', () => {
    // Answers with weak BELONGING scores
    const answers: QuestionAnswers = {
      q1: 5, q2: 5, q3: 5, q4: 5, q5: 5, q6: 5, q7: 5, q8: 5, q9: 5, // Choice = 5
      q10: 1, q11: 1, q12: 2, q13: 1, q14: 2, q15: 1, q16: 2, q17: 1, q18: 1, q19: 2, // Belonging = 1.4
      q20: 4, q21: 4, q22: 4, q23: 4, q24: 4, q25: 4, q26: 4, // Learning = 4
      q27: 4, q28: 4, q29: 4, q30: 4, q31: 4, q32: 4, q33: 4, // Health = 4
    };

    const result = getRecommendations(answers, null, DEFAULT_CENTROIDS, DEFAULT_PROFILES, 5);

    // Should recommend belonging-focused resources
    const belongingResources = result.recommendations.filter(
      r => r.resource.targetCategories.includes('BELONGING')
    );
    expect(belongingResources.length).toBeGreaterThan(0);

    // Top recommendations should target weak areas
    expect(result.recommendations[0].relevanceScore).toBeGreaterThan(0);
  });

  it('should prioritize high-priority resources', () => {
    const answers: QuestionAnswers = {
      q1: 2, q2: 2, q3: 2, q4: 2, q5: 2, q6: 2, q7: 2, q8: 2, q9: 2,
    };

    const result = getRecommendations(answers, null, DEFAULT_CENTROIDS, DEFAULT_PROFILES, 10);

    // High priority resources with matching categories should rank higher
    const firstRecommendation = result.recommendations[0];
    expect(firstRecommendation.resource.priority === 'high' || 
           firstRecommendation.relevanceScore > 0.5).toBe(true);
  });

  it('should generate insights based on scores', () => {
    const answers: QuestionAnswers = {
      q1: 5, q2: 5, q3: 5, q4: 5, q5: 5, q6: 5, q7: 5, q8: 5, q9: 5, // Choice = 5
      q10: 2, q11: 2, q12: 2, q13: 2, q14: 2, q15: 2, q16: 2, q17: 2, q18: 2, q19: 2, // Belonging = 2
      q20: 4, q21: 4, q22: 4, q23: 4, q24: 4, q25: 4, q26: 4, // Learning = 4
      q27: 4, q28: 4, q29: 4, q30: 4, q31: 4, q32: 4, q33: 4, // Health = 4
    };

    const result = getRecommendations(answers, null, DEFAULT_CENTROIDS, DEFAULT_PROFILES, 5);

    expect(result.insights.length).toBeGreaterThan(0);
    // Should mention the strong area (Choice)
    const hasStrengthInsight = result.insights.some(i => 
      i.toLowerCase().includes('choice') || i.toLowerCase().includes('strength')
    );
    expect(hasStrengthInsight).toBe(true);
  });

  it('should include discrepancy insight when observer differs from self', () => {
    const selfAnswers: QuestionAnswers = {
      q1: 5, q2: 5, q3: 5, q4: 5, q5: 5, q6: 5, q7: 5, q8: 5, q9: 5,
      q10: 5, q11: 5, q12: 5, q13: 5, q14: 5, q15: 5, q16: 5, q17: 5, q18: 5, q19: 5,
    };
    const observerAnswers: QuestionAnswers = {
      q1: 2, q2: 2, q3: 2, q4: 2, q5: 2, q6: 2, q7: 2, q8: 2, q9: 2,
      q10: 2, q11: 2, q12: 2, q13: 2, q14: 2, q15: 2, q16: 2, q17: 2, q18: 2, q19: 2,
    };

    const result = getRecommendations(selfAnswers, observerAnswers, DEFAULT_CENTROIDS, DEFAULT_PROFILES, 5);

    // Should mention the gap between self and observer
    const hasDiscrepancyInsight = result.insights.some(i => 
      i.toLowerCase().includes('gap') || i.toLowerCase().includes('self-assessment')
    );
    expect(hasDiscrepancyInsight).toBe(true);
  });

  it('should limit recommendations to maxRecommendations', () => {
    const answers: QuestionAnswers = { q1: 3 };

    const result3 = getRecommendations(answers, null, DEFAULT_CENTROIDS, DEFAULT_PROFILES, 3);
    const result7 = getRecommendations(answers, null, DEFAULT_CENTROIDS, DEFAULT_PROFILES, 7);

    expect(result3.recommendations.length).toBe(3);
    expect(result7.recommendations.length).toBe(7);
  });

  it('should include timestamp', () => {
    const answers: QuestionAnswers = { q1: 3 };
    const result = getRecommendations(answers, null, DEFAULT_CENTROIDS, DEFAULT_PROFILES, 5);

    expect(result.generatedAt).toBeDefined();
    expect(new Date(result.generatedAt).getTime()).toBeLessThanOrEqual(Date.now());
  });

  it('should generate reasons for each recommendation', () => {
    const answers: QuestionAnswers = {
      q1: 2, q2: 2, q3: 2, q4: 2, q5: 2, q6: 2, q7: 2, q8: 2, q9: 2,
    };

    const result = getRecommendations(answers, null, DEFAULT_CENTROIDS, DEFAULT_PROFILES, 5);

    for (const rec of result.recommendations) {
      expect(rec.reason).toBeDefined();
      expect(rec.reason.length).toBeGreaterThan(10);
    }
  });
});

describe('RecommendationService', () => {
  let service: RecommendationService;

  beforeEach(() => {
    service = new RecommendationService();
  });

  it('should initialize with default profiles', () => {
    expect(service.isTrained()).toBe(false);
    expect(service.getClusterProfiles().length).toBeGreaterThan(0);
    expect(service.getCentroids().length).toBe(4);
  });

  it('should generate recommendations for a DSP', () => {
    const answers: QuestionAnswers = {
      q1: 3, q2: 3, q3: 3, q4: 3, q5: 3, q6: 3, q7: 3, q8: 3, q9: 3,
    };

    const result = service.getRecommendationsForDsp('dsp@example.com', answers, null, 5);

    expect(result.dspEmail).toBe('dsp@example.com');
    expect(result.recommendations.length).toBe(5);
    expect(result.clusteringResult.clusterId).toBeDefined();
  });

  it('should train from historical data', () => {
    const historicalData: QuestionAnswers[] = [
      // Low performers
      { q1: 2, q2: 2, q3: 2, q4: 2, q5: 2, q6: 2, q7: 2, q8: 2, q9: 2,
        q10: 2, q11: 2, q12: 2, q13: 2, q14: 2, q15: 2, q16: 2, q17: 2, q18: 2, q19: 2 },
      { q1: 1, q2: 2, q3: 2, q4: 1, q5: 2, q6: 2, q7: 1, q8: 2, q9: 2 },
      // Medium performers
      { q1: 3, q2: 3, q3: 3, q4: 3, q5: 3, q6: 3, q7: 3, q8: 3, q9: 3 },
      { q1: 3, q2: 4, q3: 3, q4: 3, q5: 3, q6: 4, q7: 3, q8: 3, q9: 4 },
      // High performers
      { q1: 5, q2: 5, q3: 5, q4: 5, q5: 5, q6: 5, q7: 5, q8: 5, q9: 5 },
      { q1: 4, q2: 5, q3: 5, q4: 4, q5: 5, q6: 5, q7: 4, q8: 5, q9: 5 },
    ];

    service.train(historicalData, 3, 42);

    expect(service.isTrained()).toBe(true);
    expect(service.getCentroids().length).toBe(3);
  });

  it('should not train with insufficient data', () => {
    const smallData: QuestionAnswers[] = [
      { q1: 3, q2: 3 },
    ];

    // Spy on console.warn
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();

    service.train(smallData, 4, 42);

    expect(service.isTrained()).toBe(false);
    expect(warnSpy).toHaveBeenCalled();

    warnSpy.mockRestore();
  });

  it('should provide consistent recommendations for same input', () => {
    const answers: QuestionAnswers = {
      q1: 3, q2: 3, q3: 3, q4: 3, q5: 3, q6: 3, q7: 3, q8: 3, q9: 3,
    };

    const result1 = service.getRecommendationsForDsp('dsp@example.com', answers, null, 5);
    const result2 = service.getRecommendationsForDsp('dsp@example.com', answers, null, 5);

    // Same input should produce same cluster assignment
    expect(result1.clusteringResult.clusterId).toBe(result2.clusteringResult.clusterId);
    
    // Same recommendations (order may vary slightly)
    const ids1 = result1.recommendations.map(r => r.resource.id).sort();
    const ids2 = result2.recommendations.map(r => r.resource.id).sort();
    expect(ids1).toEqual(ids2);
  });
});

describe('Integration: Realistic DSP Scenarios', () => {
  let service: RecommendationService;

  beforeEach(() => {
    service = new RecommendationService();
  });

  it('should recommend learning resources for learning-weak DSP', () => {
    const answers: QuestionAnswers = {
      // Choice: good
      q1: 4, q2: 4, q3: 4, q4: 4, q5: 4, q6: 4, q7: 4, q8: 4, q9: 4,
      // Belonging: good
      q10: 4, q11: 4, q12: 4, q13: 4, q14: 4, q15: 4, q16: 4, q17: 4, q18: 4, q19: 4,
      // Learning: WEAK - especially communication
      q20: 2, q21: 1, q22: 1, q23: 2, q24: 2, q25: 2, q26: 2,
      // Health: good
      q27: 4, q28: 4, q29: 4, q30: 4, q31: 4, q32: 4, q33: 4,
    };

    const result = service.getRecommendationsForDsp('learning-weak@example.com', answers, null, 5);

    // Should recommend learning-focused resources
    const learningResources = result.recommendations.filter(
      r => r.resource.targetCategories.includes('LIFELONG_LEARNING')
    );
    expect(learningResources.length).toBeGreaterThan(0);

    // The weakest area should be identified correctly
    expect(result.clusteringResult.categoryScores.LIFELONG_LEARNING).toBeLessThan(3);
  });

  it('should recommend leadership resources for high performers', () => {
    const answers: QuestionAnswers = {
      q1: 5, q2: 5, q3: 5, q4: 5, q5: 5, q6: 5, q7: 5, q8: 5, q9: 5,
      q10: 5, q11: 5, q12: 5, q13: 5, q14: 5, q15: 5, q16: 5, q17: 5, q18: 5, q19: 5,
      q20: 5, q21: 5, q22: 5, q23: 5, q24: 5, q25: 5, q26: 5,
      q27: 5, q28: 5, q29: 5, q30: 5, q31: 5, q32: 5, q33: 5,
    };

    const result = service.getRecommendationsForDsp('star-performer@example.com', answers, null, 5);

    // For high performers, insights should mention mentorship
    const hasMentorInsight = result.insights.some(
      i => i.toLowerCase().includes('mentor') || i.toLowerCase().includes('ready')
    );
    expect(hasMentorInsight).toBe(true);
  });

  it('should recommend comprehensive training for struggling DSP', () => {
    const answers: QuestionAnswers = {
      q1: 1, q2: 2, q3: 1, q4: 2, q5: 1, q6: 2, q7: 1, q8: 2, q9: 1,
      q10: 2, q11: 1, q12: 2, q13: 1, q14: 2, q15: 1, q16: 2, q17: 1, q18: 2, q19: 1,
      q20: 1, q21: 2, q22: 1, q23: 2, q24: 1, q25: 2, q26: 1,
      q27: 2, q28: 1, q29: 2, q30: 1, q31: 2, q32: 1, q33: 2,
    };

    const result = service.getRecommendationsForDsp('needs-support@example.com', answers, null, 10);

    // Should recommend resources from multiple categories for comprehensive support
    const categories = new Set(result.recommendations.flatMap(r => r.resource.targetCategories));
    expect(categories.size).toBeGreaterThanOrEqual(2);

    // Cluster profile should indicate needs support
    expect(result.clusteringResult.clusterProfile.weakCategories.length).toBeGreaterThan(0);

    // All category scores should be low
    const scores = Object.values(result.clusteringResult.categoryScores);
    const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    expect(avgScore).toBeLessThan(2.5);
  });

  it('should handle observer-self discrepancy scenario', () => {
    // DSP rates themselves highly
    const selfAnswers: QuestionAnswers = {
      q1: 5, q2: 5, q3: 5, q4: 5, q5: 5, q6: 5, q7: 5, q8: 5, q9: 5,
      q10: 5, q11: 5, q12: 5, q13: 5, q14: 5, q15: 5, q16: 5, q17: 5, q18: 5, q19: 5,
    };
    
    // Observer rates them lower in belonging
    const observerAnswers: QuestionAnswers = {
      q1: 4, q2: 4, q3: 4, q4: 4, q5: 4, q6: 4, q7: 4, q8: 4, q9: 4,
      q10: 2, q11: 2, q12: 2, q13: 2, q14: 2, q15: 2, q16: 2, q17: 2, q18: 2, q19: 2,
    };

    const result = service.getRecommendationsForDsp(
      'gap-dsp@example.com', 
      selfAnswers, 
      observerAnswers, 
      5
    );

    // Should note the discrepancy
    expect(result.clusteringResult.discrepancy).toBeGreaterThan(0);

    // Should recommend belonging resources based on observer ratings
    const belongingResources = result.recommendations.filter(
      r => r.resource.targetCategories.includes('BELONGING')
    );
    expect(belongingResources.length).toBeGreaterThan(0);
  });
});

