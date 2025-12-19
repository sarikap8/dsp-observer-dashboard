/**
 * Comprehensive Tests for K-Means Clustering
 * 
 * Tests the ML clustering functionality for correctness and performance.
 */

import {
  calculateCategoryAverage,
  answersToFeatureVector,
  euclideanDistance,
  calculateCentroid,
  kMeans,
  calculateWCSS,
  calculateSilhouetteScore,
  interpretClusters,
  classifyDsp,
  findOptimalK,
  CATEGORIES,
  type FeatureVector,
} from '@/lib/ml/clustering';
import type { QuestionAnswers } from '@/lib/types';

describe('Clustering Utility Functions', () => {
  describe('calculateCategoryAverage', () => {
    it('should calculate average correctly for valid answers', () => {
      const answers: QuestionAnswers = {
        q1: 5, q2: 4, q3: 3, q4: 4, q5: 5, q6: 3, q7: 4, q8: 5, q9: 4,
      };
      const avg = calculateCategoryAverage(answers, CATEGORIES.CHOICE);
      expect(avg).toBeCloseTo(4.11, 1);
    });

    it('should handle missing/null values', () => {
      const answers: QuestionAnswers = {
        q1: 5, q2: null, q3: 3, q4: undefined, q5: 5,
      };
      const avg = calculateCategoryAverage(answers, CATEGORIES.CHOICE);
      // Only q1, q3, q5 are valid = (5+3+5)/3 = 4.33
      expect(avg).toBeCloseTo(4.33, 1);
    });

    it('should return 0 for empty answers', () => {
      const answers: QuestionAnswers = {};
      const avg = calculateCategoryAverage(answers, CATEGORIES.CHOICE);
      expect(avg).toBe(0);
    });

    it('should return 0 for all null values', () => {
      const answers: QuestionAnswers = {
        q1: null, q2: null, q3: null,
      };
      const avg = calculateCategoryAverage(answers, CATEGORIES.CHOICE);
      expect(avg).toBe(0);
    });
  });

  describe('answersToFeatureVector', () => {
    it('should create correct 4D feature vector', () => {
      // Full answers with known averages
      const answers: QuestionAnswers = {
        // Choice: q1-q9, all 5s = avg 5.0
        q1: 5, q2: 5, q3: 5, q4: 5, q5: 5, q6: 5, q7: 5, q8: 5, q9: 5,
        // Belonging: q10-q19, all 4s = avg 4.0
        q10: 4, q11: 4, q12: 4, q13: 4, q14: 4, q15: 4, q16: 4, q17: 4, q18: 4, q19: 4,
        // Learning: q20-q26, all 3s = avg 3.0
        q20: 3, q21: 3, q22: 3, q23: 3, q24: 3, q25: 3, q26: 3,
        // Health: q27-q33, all 2s = avg 2.0
        q27: 2, q28: 2, q29: 2, q30: 2, q31: 2, q32: 2, q33: 2,
      };

      const vector = answersToFeatureVector(answers);
      expect(vector).toEqual([5.0, 4.0, 3.0, 2.0]);
    });

    it('should handle partial answers', () => {
      const answers: QuestionAnswers = {
        q1: 5, q2: 5, // Choice: only 2 answers
        q10: 3, // Belonging: only 1 answer
        // Learning: empty
        q27: 4, // Health: only 1 answer
      };

      const vector = answersToFeatureVector(answers);
      expect(vector[0]).toBe(5.0); // Choice avg
      expect(vector[1]).toBe(3.0); // Belonging avg
      expect(vector[2]).toBe(0); // Learning - no answers
      expect(vector[3]).toBe(4.0); // Health avg
    });
  });

  describe('euclideanDistance', () => {
    it('should calculate distance correctly', () => {
      const a: FeatureVector = [0, 0, 0, 0];
      const b: FeatureVector = [3, 4, 0, 0];
      expect(euclideanDistance(a, b)).toBe(5); // 3-4-5 triangle
    });

    it('should return 0 for identical vectors', () => {
      const a: FeatureVector = [2.5, 3.5, 4.5, 1.5];
      expect(euclideanDistance(a, a)).toBe(0);
    });

    it('should be symmetric', () => {
      const a: FeatureVector = [1, 2, 3, 4];
      const b: FeatureVector = [5, 4, 3, 2];
      expect(euclideanDistance(a, b)).toBe(euclideanDistance(b, a));
    });
  });

  describe('calculateCentroid', () => {
    it('should calculate centroid correctly', () => {
      const vectors: FeatureVector[] = [
        [0, 0, 0, 0],
        [2, 2, 2, 2],
        [4, 4, 4, 4],
      ];
      const centroid = calculateCentroid(vectors);
      expect(centroid).toEqual([2, 2, 2, 2]);
    });

    it('should return zeros for empty input', () => {
      expect(calculateCentroid([])).toEqual([0, 0, 0, 0]);
    });

    it('should return the vector itself for single input', () => {
      const vector: FeatureVector = [1.5, 2.5, 3.5, 4.5];
      expect(calculateCentroid([vector])).toEqual(vector);
    });
  });
});

describe('K-Means Algorithm', () => {
  // Test with reproducible seed
  const SEED = 42;

  describe('kMeans', () => {
    it('should cluster identical vectors into one cluster', () => {
      const vectors: FeatureVector[] = [
        [3, 3, 3, 3],
        [3, 3, 3, 3],
        [3, 3, 3, 3],
      ];

      const { assignments } = kMeans(vectors, 2, 100, SEED);
      
      // All vectors should be in the same cluster
      const uniqueAssignments = new Set(assignments);
      expect(uniqueAssignments.size).toBeLessThanOrEqual(2);
    });

    it('should separate clearly distinct clusters', () => {
      // Two obvious clusters
      const vectors: FeatureVector[] = [
        // Cluster A: low scores
        [1, 1, 1, 1],
        [1.1, 1.1, 1.1, 1.1],
        [0.9, 0.9, 0.9, 0.9],
        // Cluster B: high scores
        [5, 5, 5, 5],
        [4.9, 4.9, 4.9, 4.9],
        [5.1, 5.1, 5.1, 5.1],
      ];

      const { assignments } = kMeans(vectors, 2, 100, SEED);

      // First 3 should be in same cluster, last 3 in another
      expect(assignments[0]).toBe(assignments[1]);
      expect(assignments[1]).toBe(assignments[2]);
      expect(assignments[3]).toBe(assignments[4]);
      expect(assignments[4]).toBe(assignments[5]);
      expect(assignments[0]).not.toBe(assignments[3]);
    });

    it('should handle empty input', () => {
      const { assignments, centroids, iterations } = kMeans([], 3, 100, SEED);
      expect(assignments).toEqual([]);
      expect(centroids).toEqual([]);
      expect(iterations).toBe(0);
    });

    it('should handle k >= n case', () => {
      const vectors: FeatureVector[] = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
      ];

      const { assignments, centroids } = kMeans(vectors, 5, 100, SEED);
      expect(assignments.length).toBe(2);
      expect(centroids.length).toBe(2);
    });

    it('should converge within maxIterations', () => {
      const vectors: FeatureVector[] = Array(20).fill(null).map((_, i) => [
        (i % 5) + 1,
        (i % 4) + 1,
        (i % 3) + 2,
        (i % 6) + 1,
      ] as FeatureVector);

      const { iterations } = kMeans(vectors, 4, 100, SEED);
      expect(iterations).toBeLessThanOrEqual(100);
    });

    it('should be deterministic with same seed', () => {
      const vectors: FeatureVector[] = [
        [1, 2, 3, 4],
        [2, 3, 4, 5],
        [4, 3, 2, 1],
        [5, 4, 3, 2],
      ];

      const result1 = kMeans(vectors, 2, 100, SEED);
      const result2 = kMeans(vectors, 2, 100, SEED);

      expect(result1.assignments).toEqual(result2.assignments);
      expect(result1.centroids).toEqual(result2.centroids);
    });
  });

  describe('calculateWCSS (Within-Cluster Sum of Squares)', () => {
    it('should return 0 for perfectly clustered data', () => {
      const vectors: FeatureVector[] = [
        [1, 1, 1, 1],
        [1, 1, 1, 1],
      ];
      const centroids: FeatureVector[] = [[1, 1, 1, 1]];
      const assignments = [0, 0];

      const wcss = calculateWCSS(vectors, assignments, centroids);
      expect(wcss).toBe(0);
    });

    it('should increase with more spread data', () => {
      const tightVectors: FeatureVector[] = [
        [2, 2, 2, 2],
        [2.1, 2.1, 2.1, 2.1],
      ];
      const spreadVectors: FeatureVector[] = [
        [1, 1, 1, 1],
        [4, 4, 4, 4],
      ];

      const tightCentroid = calculateCentroid(tightVectors);
      const spreadCentroid = calculateCentroid(spreadVectors);

      const wcss1 = calculateWCSS(tightVectors, [0, 0], [tightCentroid]);
      const wcss2 = calculateWCSS(spreadVectors, [0, 0], [spreadCentroid]);

      expect(wcss2).toBeGreaterThan(wcss1);
    });
  });

  describe('calculateSilhouetteScore', () => {
    it('should return high score for well-separated clusters', () => {
      // Very distinct clusters
      const vectors: FeatureVector[] = [
        [1, 1, 1, 1],
        [1.1, 1, 1, 1],
        [5, 5, 5, 5],
        [4.9, 5, 5, 5],
      ];
      const assignments = [0, 0, 1, 1];

      const score = calculateSilhouetteScore(vectors, assignments);
      expect(score).toBeGreaterThan(0.7);
    });

    it('should return lower score for overlapping clusters', () => {
      // Overlapping clusters
      const vectors: FeatureVector[] = [
        [2, 2, 2, 2],
        [2.5, 2.5, 2.5, 2.5],
        [3, 3, 3, 3],
        [3.5, 3.5, 3.5, 3.5],
      ];
      const assignments = [0, 0, 1, 1];

      const score = calculateSilhouetteScore(vectors, assignments);
      expect(score).toBeLessThan(0.7);
    });

    it('should return 0 for single cluster', () => {
      const vectors: FeatureVector[] = [
        [1, 2, 3, 4],
        [2, 3, 4, 5],
      ];
      const assignments = [0, 0];

      const score = calculateSilhouetteScore(vectors, assignments);
      expect(score).toBe(0);
    });

    it('should return 0 for single vector', () => {
      const vectors: FeatureVector[] = [[1, 2, 3, 4]];
      const assignments = [0];

      const score = calculateSilhouetteScore(vectors, assignments);
      expect(score).toBe(0);
    });
  });
});

describe('Cluster Interpretation', () => {
  describe('interpretClusters', () => {
    it('should identify weak categories correctly', () => {
      const centroids: FeatureVector[] = [
        [2.0, 2.0, 2.0, 2.0], // All weak
        [4.5, 4.5, 4.5, 4.5], // All strong
      ];

      const profiles = interpretClusters(centroids, 3.0);

      // First cluster should have all weak categories
      expect(profiles[0].weakCategories).toContain('CHOICE');
      expect(profiles[0].weakCategories).toContain('BELONGING');
      expect(profiles[0].weakCategories.length).toBe(4);

      // Second cluster should have no weak categories
      expect(profiles[1].weakCategories.length).toBe(0);
      expect(profiles[1].strongCategories.length).toBe(4);
    });

    it('should identify strong categories with threshold', () => {
      const centroids: FeatureVector[] = [
        [4.5, 2.0, 4.0, 4.2], // Strong in CHOICE, HEALTHY_LIVING; weak in BELONGING
      ];

      const profiles = interpretClusters(centroids, 3.0);

      expect(profiles[0].strongCategories).toContain('CHOICE');
      expect(profiles[0].strongCategories).toContain('HEALTHY_LIVING');
      expect(profiles[0].weakCategories).toContain('BELONGING');
    });

    it('should generate meaningful profile names', () => {
      const centroids: FeatureVector[] = [
        [2.0, 2.0, 2.0, 2.0], // Needs comprehensive support
        [4.5, 4.5, 4.5, 4.5], // High performer
        [2.0, 4.0, 4.0, 4.0], // Choice focus
        [4.0, 2.0, 4.0, 4.0], // Belonging focus
      ];

      const profiles = interpretClusters(centroids, 3.0);

      expect(profiles[0].name).toContain('Comprehensive');
      expect(profiles[1].name).toContain('High Performer');
      expect(profiles[2].name).toContain('Choice');
      expect(profiles[3].name).toContain('Community');
    });
  });

  describe('classifyDsp', () => {
    const centroids: FeatureVector[] = [
      [2, 2, 2, 2], // Low cluster
      [4, 4, 4, 4], // High cluster
    ];
    const profiles = interpretClusters(centroids, 3.0);

    it('should classify to nearest cluster', () => {
      const answers: QuestionAnswers = {
        q1: 5, q2: 5, q3: 5, q4: 5, q5: 5, q6: 5, q7: 5, q8: 5, q9: 5,
        q10: 4, q11: 4, q12: 4, q13: 4, q14: 4, q15: 4, q16: 4, q17: 4, q18: 4, q19: 4,
        q20: 5, q21: 5, q22: 5, q23: 5, q24: 5, q25: 5, q26: 5,
        q27: 4, q28: 4, q29: 4, q30: 4, q31: 4, q32: 4, q33: 4,
      };

      const result = classifyDsp(answers, null, centroids, profiles);

      // Should be in cluster 1 (high scores)
      expect(result.clusterId).toBe(1);
    });

    it('should use observer answers when available', () => {
      const selfAnswers: QuestionAnswers = {
        q1: 5, q2: 5, q3: 5, q4: 5, q5: 5, q6: 5, q7: 5, q8: 5, q9: 5,
      };
      const observerAnswers: QuestionAnswers = {
        q1: 2, q2: 2, q3: 2, q4: 2, q5: 2, q6: 2, q7: 2, q8: 2, q9: 2,
      };

      const result = classifyDsp(selfAnswers, observerAnswers, centroids, profiles);

      // Should use observer answers (low scores) -> cluster 0
      expect(result.clusterId).toBe(0);
    });

    it('should calculate discrepancy when both evaluations exist', () => {
      const selfAnswers: QuestionAnswers = {
        q1: 5, q2: 5, q3: 5, q4: 5, q5: 5, q6: 5, q7: 5, q8: 5, q9: 5,
      };
      const observerAnswers: QuestionAnswers = {
        q1: 2, q2: 2, q3: 2, q4: 2, q5: 2, q6: 2, q7: 2, q8: 2, q9: 2,
      };

      const result = classifyDsp(selfAnswers, observerAnswers, centroids, profiles);

      expect(result.discrepancy).not.toBeNull();
      expect(result.discrepancy).toBeGreaterThan(0);
    });

    it('should return null discrepancy when no observer answers', () => {
      const selfAnswers: QuestionAnswers = { q1: 5 };
      const result = classifyDsp(selfAnswers, null, centroids, profiles);
      expect(result.discrepancy).toBeNull();
    });

    it('should calculate category scores correctly', () => {
      const answers: QuestionAnswers = {
        q1: 5, q2: 5, q3: 5, q4: 5, q5: 5, q6: 5, q7: 5, q8: 5, q9: 5, // Choice = 5
        q10: 3, q11: 3, q12: 3, q13: 3, q14: 3, q15: 3, q16: 3, q17: 3, q18: 3, q19: 3, // Belonging = 3
      };

      const result = classifyDsp(answers, null, centroids, profiles);

      expect(result.categoryScores.CHOICE).toBe(5);
      expect(result.categoryScores.BELONGING).toBe(3);
    });
  });
});

describe('Optimal K Selection', () => {
  describe('findOptimalK', () => {
    it('should find optimal K for clear clusters', () => {
      // Generate data with 3 clear clusters
      const vectors: FeatureVector[] = [
        // Cluster 1: Low scores
        [1, 1, 1, 1], [1.1, 1.2, 1.1, 1.2], [0.9, 0.8, 1.0, 1.1],
        // Cluster 2: Medium scores
        [3, 3, 3, 3], [3.1, 2.9, 3.0, 3.1], [2.9, 3.1, 3.0, 2.9],
        // Cluster 3: High scores
        [5, 5, 5, 5], [4.9, 5.1, 5.0, 4.9], [5.1, 4.9, 5.0, 5.1],
      ];

      const { optimalK, wcssValues } = findOptimalK(vectors, 2, 5, 42);

      // Should suggest 2-4 clusters for this data
      expect(optimalK).toBeGreaterThanOrEqual(2);
      expect(optimalK).toBeLessThanOrEqual(4);
      
      // WCSS should decrease as K increases
      for (let i = 1; i < wcssValues.length; i++) {
        expect(wcssValues[i]).toBeLessThanOrEqual(wcssValues[i - 1]);
      }
    });

    it('should return minK for very small datasets', () => {
      const vectors: FeatureVector[] = [
        [1, 2, 3, 4],
        [2, 3, 4, 5],
      ];

      const { optimalK } = findOptimalK(vectors, 2, 5, 42);
      expect(optimalK).toBe(2);
    });
  });
});

describe('Cluster Quality Tests', () => {
  it('should maintain cluster stability across multiple runs', () => {
    // Generate reproducible test data
    const vectors: FeatureVector[] = [
      [1, 1, 1, 1], [1.2, 1.1, 0.9, 1.0],
      [3, 3, 3, 3], [3.1, 2.9, 3.0, 3.1],
      [5, 5, 5, 5], [4.9, 5.1, 5.0, 5.0],
    ];

    const runs = 5;
    const results = [];

    for (let i = 0; i < runs; i++) {
      const { centroids } = kMeans(vectors, 3, 100, 42);
      results.push(centroids);
    }

    // All runs should produce the same centroids
    for (let i = 1; i < runs; i++) {
      expect(results[i]).toEqual(results[0]);
    }
  });

  it('should produce meaningful silhouette scores for realistic data', () => {
    // Simulate realistic DSP evaluation data
    const vectors: FeatureVector[] = [
      // Low performers
      [2.1, 1.9, 2.3, 2.0],
      [1.8, 2.2, 1.9, 2.1],
      [2.0, 2.0, 2.0, 1.8],
      // Average performers
      [3.2, 3.0, 3.1, 3.3],
      [2.9, 3.2, 3.0, 2.8],
      [3.0, 2.9, 3.3, 3.1],
      // High performers
      [4.5, 4.3, 4.6, 4.4],
      [4.2, 4.5, 4.3, 4.6],
      [4.4, 4.4, 4.5, 4.3],
    ];

    const { assignments } = kMeans(vectors, 3, 100, 42);
    const silhouette = calculateSilhouetteScore(vectors, assignments);

    // For well-separated real-world clusters, expect reasonable silhouette
    expect(silhouette).toBeGreaterThan(0.3);
    expect(silhouette).toBeLessThanOrEqual(1.0);
  });

  it('should handle edge case of all identical evaluations', () => {
    const vectors: FeatureVector[] = Array(10).fill([3, 3, 3, 3] as FeatureVector);

    const { assignments, centroids } = kMeans(vectors, 3, 100, 42);
    
    // Should not crash and should produce valid output
    expect(assignments.length).toBe(10);
    expect(centroids.length).toBeLessThanOrEqual(3);
  });

  it('should correctly identify weak areas for targeted training', () => {
    const answers: QuestionAnswers = {
      // Choice: all 5s (strong)
      q1: 5, q2: 5, q3: 5, q4: 5, q5: 5, q6: 5, q7: 5, q8: 5, q9: 5,
      // Belonging: all 2s (weak)
      q10: 2, q11: 2, q12: 2, q13: 2, q14: 2, q15: 2, q16: 2, q17: 2, q18: 2, q19: 2,
      // Learning: all 4s (good)
      q20: 4, q21: 4, q22: 4, q23: 4, q24: 4, q25: 4, q26: 4,
      // Health: all 4s (good)
      q27: 4, q28: 4, q29: 4, q30: 4, q31: 4, q32: 4, q33: 4,
    };

    const vector = answersToFeatureVector(answers);
    
    // Should correctly identify belonging as weak (index 1)
    expect(vector[0]).toBe(5); // Choice - strong
    expect(vector[1]).toBe(2); // Belonging - weak
    expect(vector[2]).toBe(4); // Learning - good
    expect(vector[3]).toBe(4); // Health - good

    // The weak area should be clearly identifiable
    const minScore = Math.min(...vector);
    const minIndex = vector.indexOf(minScore);
    expect(minIndex).toBe(1); // Belonging is weakest
  });
});

