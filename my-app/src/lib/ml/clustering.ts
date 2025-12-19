/**
 * K-Means Clustering for DSP Evaluation Profiles
 * 
 * Implements K-means clustering algorithm from scratch to group DSPs
 * based on their evaluation patterns across the 4 main categories:
 * - Choice (q1-q9)
 * - Belonging (q10-q19)
 * - Life-Long Learning (q20-q26)
 * - Healthy Living (q27-q33)
 */

import type { QuestionAnswers } from '../types';

// Category definitions matching the evaluation form
export const CATEGORIES = {
  CHOICE: ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9'] as const,
  BELONGING: ['q10', 'q11', 'q12', 'q13', 'q14', 'q15', 'q16', 'q17', 'q18', 'q19'] as const,
  LIFELONG_LEARNING: ['q20', 'q21', 'q22', 'q23', 'q24', 'q25', 'q26'] as const,
  HEALTHY_LIVING: ['q27', 'q28', 'q29', 'q30', 'q31', 'q32', 'q33'] as const,
} as const;

export type CategoryName = keyof typeof CATEGORIES;

// Feature vector: [choiceAvg, belongingAvg, learningAvg, healthAvg]
export type FeatureVector = [number, number, number, number];

// Cluster profile with interpretable labels
export interface ClusterProfile {
  id: number;
  name: string;
  description: string;
  centroid: FeatureVector;
  weakCategories: CategoryName[];
  strongCategories: CategoryName[];
}

// Result of clustering a single DSP
export interface ClusteringResult {
  clusterId: number;
  clusterProfile: ClusterProfile;
  featureVector: FeatureVector;
  categoryScores: Record<CategoryName, number>;
  discrepancy: number | null; // Difference between self and observer (if available)
}

/**
 * Calculate the average score for a category from answers
 */
export function calculateCategoryAverage(
  answers: QuestionAnswers,
  questions: readonly string[]
): number {
  const values: number[] = [];
  for (const q of questions) {
    const val = answers[q as keyof QuestionAnswers];
    if (val !== null && val !== undefined) {
      values.push(val);
    }
  }
  if (values.length === 0) return 0;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

/**
 * Convert question answers to a 4-dimensional feature vector
 * Each dimension represents the average score for a category
 */
export function answersToFeatureVector(answers: QuestionAnswers): FeatureVector {
  return [
    calculateCategoryAverage(answers, CATEGORIES.CHOICE),
    calculateCategoryAverage(answers, CATEGORIES.BELONGING),
    calculateCategoryAverage(answers, CATEGORIES.LIFELONG_LEARNING),
    calculateCategoryAverage(answers, CATEGORIES.HEALTHY_LIVING),
  ];
}

/**
 * Calculate Euclidean distance between two feature vectors
 */
export function euclideanDistance(a: FeatureVector, b: FeatureVector): number {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += Math.pow(a[i] - b[i], 2);
  }
  return Math.sqrt(sum);
}

/**
 * Calculate the centroid of a group of feature vectors
 */
export function calculateCentroid(vectors: FeatureVector[]): FeatureVector {
  if (vectors.length === 0) {
    return [0, 0, 0, 0];
  }
  
  const sum: FeatureVector = [0, 0, 0, 0];
  for (const v of vectors) {
    for (let i = 0; i < 4; i++) {
      sum[i] += v[i];
    }
  }
  
  return sum.map(s => s / vectors.length) as FeatureVector;
}

/**
 * K-Means clustering algorithm
 * 
 * @param vectors - Array of feature vectors to cluster
 * @param k - Number of clusters
 * @param maxIterations - Maximum iterations before stopping
 * @param seed - Random seed for reproducibility (optional)
 * @returns Array of cluster assignments (index corresponds to input vector index)
 */
export function kMeans(
  vectors: FeatureVector[],
  k: number,
  maxIterations: number = 100,
  seed?: number
): { assignments: number[]; centroids: FeatureVector[]; iterations: number } {
  if (vectors.length === 0) {
    return { assignments: [], centroids: [], iterations: 0 };
  }
  
  if (k >= vectors.length) {
    // Each vector is its own cluster
    return {
      assignments: vectors.map((_, i) => i),
      centroids: [...vectors],
      iterations: 0,
    };
  }

  // Seeded random number generator for reproducibility
  const random = seed !== undefined 
    ? createSeededRandom(seed)
    : () => Math.random();

  // Initialize centroids using k-means++ for better initial placement
  const centroids = initializeCentroidsKMeansPlusPlus(vectors, k, random);
  
  let assignments = new Array(vectors.length).fill(0);
  let iterations = 0;

  for (let iter = 0; iter < maxIterations; iter++) {
    iterations++;
    
    // Assignment step: assign each vector to nearest centroid
    const newAssignments = vectors.map(v => {
      let minDist = Infinity;
      let closest = 0;
      for (let c = 0; c < centroids.length; c++) {
        const dist = euclideanDistance(v, centroids[c]);
        if (dist < minDist) {
          minDist = dist;
          closest = c;
        }
      }
      return closest;
    });

    // Check for convergence
    const converged = newAssignments.every((a, i) => a === assignments[i]);
    assignments = newAssignments;

    if (converged) {
      break;
    }

    // Update step: recalculate centroids
    for (let c = 0; c < k; c++) {
      const clusterVectors = vectors.filter((_, i) => assignments[i] === c);
      if (clusterVectors.length > 0) {
        centroids[c] = calculateCentroid(clusterVectors);
      }
    }
  }

  return { assignments, centroids, iterations };
}

/**
 * K-Means++ initialization for better centroid placement
 */
function initializeCentroidsKMeansPlusPlus(
  vectors: FeatureVector[],
  k: number,
  random: () => number
): FeatureVector[] {
  const centroids: FeatureVector[] = [];
  
  // Pick first centroid randomly
  const firstIdx = Math.floor(random() * vectors.length);
  centroids.push([...vectors[firstIdx]] as FeatureVector);

  // Pick remaining centroids with probability proportional to distance squared
  while (centroids.length < k) {
    const distances = vectors.map(v => {
      const minDist = Math.min(...centroids.map(c => euclideanDistance(v, c)));
      return minDist * minDist;
    });
    
    const totalDist = distances.reduce((a, b) => a + b, 0);
    if (totalDist === 0) {
      // All remaining vectors are identical to existing centroids
      const unusedIdx = vectors.findIndex((_, i) => 
        !centroids.some(c => euclideanDistance(vectors[i], c) === 0)
      );
      if (unusedIdx >= 0) {
        centroids.push([...vectors[unusedIdx]] as FeatureVector);
      } else {
        centroids.push([...vectors[0]] as FeatureVector);
      }
      continue;
    }

    // Weighted random selection
    let r = random() * totalDist;
    let selectedIdx = 0;
    for (let i = 0; i < distances.length; i++) {
      r -= distances[i];
      if (r <= 0) {
        selectedIdx = i;
        break;
      }
    }
    
    centroids.push([...vectors[selectedIdx]] as FeatureVector);
  }

  return centroids;
}

/**
 * Create a seeded random number generator (simple LCG)
 */
function createSeededRandom(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state * 1103515245 + 12345) % 2147483648;
    return state / 2147483648;
  };
}

/**
 * Calculate Within-Cluster Sum of Squares (WCSS) for elbow method
 */
export function calculateWCSS(
  vectors: FeatureVector[],
  assignments: number[],
  centroids: FeatureVector[]
): number {
  let wcss = 0;
  for (let i = 0; i < vectors.length; i++) {
    const centroid = centroids[assignments[i]];
    wcss += Math.pow(euclideanDistance(vectors[i], centroid), 2);
  }
  return wcss;
}

/**
 * Calculate Silhouette Score for cluster quality evaluation
 * Score ranges from -1 to 1, higher is better
 */
export function calculateSilhouetteScore(
  vectors: FeatureVector[],
  assignments: number[]
): number {
  if (vectors.length < 2) return 0;
  
  const k = Math.max(...assignments) + 1;
  if (k === 1) return 0; // Single cluster has no silhouette

  const silhouettes: number[] = [];

  for (let i = 0; i < vectors.length; i++) {
    const cluster = assignments[i];
    
    // Calculate a(i) - average distance to points in same cluster
    const sameCluster = vectors.filter((_, j) => j !== i && assignments[j] === cluster);
    const a = sameCluster.length > 0
      ? sameCluster.reduce((sum, v) => sum + euclideanDistance(vectors[i], v), 0) / sameCluster.length
      : 0;

    // Calculate b(i) - minimum average distance to points in other clusters
    let b = Infinity;
    for (let c = 0; c < k; c++) {
      if (c === cluster) continue;
      const otherCluster = vectors.filter((_, j) => assignments[j] === c);
      if (otherCluster.length > 0) {
        const avgDist = otherCluster.reduce((sum, v) => sum + euclideanDistance(vectors[i], v), 0) / otherCluster.length;
        b = Math.min(b, avgDist);
      }
    }

    if (b === Infinity) b = 0;

    // Silhouette for this point
    const s = a === 0 && b === 0 ? 0 : (b - a) / Math.max(a, b);
    silhouettes.push(s);
  }

  return silhouettes.reduce((a, b) => a + b, 0) / silhouettes.length;
}

/**
 * Predefined cluster profiles based on typical evaluation patterns
 * These are the "archetypes" we expect to find
 */
export const DEFAULT_CLUSTER_PROFILES: Omit<ClusterProfile, 'centroid'>[] = [
  {
    id: 0,
    name: 'Needs Support',
    description: 'Scores below average across multiple areas. Would benefit from comprehensive training.',
    weakCategories: ['CHOICE', 'BELONGING', 'LIFELONG_LEARNING', 'HEALTHY_LIVING'],
    strongCategories: [],
  },
  {
    id: 1,
    name: 'Communication Focus',
    description: 'Strong in practical skills but needs support in choice and communication areas.',
    weakCategories: ['CHOICE', 'LIFELONG_LEARNING'],
    strongCategories: ['BELONGING', 'HEALTHY_LIVING'],
  },
  {
    id: 2,
    name: 'Community Integration',
    description: 'Excels at daily living skills but needs support with community belonging.',
    weakCategories: ['BELONGING'],
    strongCategories: ['CHOICE', 'LIFELONG_LEARNING', 'HEALTHY_LIVING'],
  },
  {
    id: 3,
    name: 'High Performer',
    description: 'Consistently high scores across all categories. Ready for advanced training.',
    weakCategories: [],
    strongCategories: ['CHOICE', 'BELONGING', 'LIFELONG_LEARNING', 'HEALTHY_LIVING'],
  },
];

/**
 * Interpret cluster centroids and create profiles
 */
export function interpretClusters(
  centroids: FeatureVector[],
  threshold: number = 3.0
): ClusterProfile[] {
  const categoryNames: CategoryName[] = ['CHOICE', 'BELONGING', 'LIFELONG_LEARNING', 'HEALTHY_LIVING'];
  
  return centroids.map((centroid, id) => {
    const weakCategories: CategoryName[] = [];
    const strongCategories: CategoryName[] = [];
    
    centroid.forEach((score, i) => {
      if (score < threshold) {
        weakCategories.push(categoryNames[i]);
      } else if (score >= 4.0) {
        strongCategories.push(categoryNames[i]);
      }
    });

    // Determine profile name based on patterns
    let name: string;
    let description: string;

    if (weakCategories.length >= 3) {
      name = 'Needs Comprehensive Support';
      description = 'Would benefit from training across multiple areas.';
    } else if (weakCategories.length === 0 && strongCategories.length >= 3) {
      name = 'High Performer';
      description = 'Consistently high scores. Ready for advanced training and mentorship opportunities.';
    } else if (weakCategories.includes('CHOICE')) {
      name = 'Choice & Autonomy Focus';
      description = 'Needs support in promoting individual choice and decision-making.';
    } else if (weakCategories.includes('BELONGING')) {
      name = 'Community Integration Focus';
      description = 'Would benefit from training on community inclusion and social connections.';
    } else if (weakCategories.includes('LIFELONG_LEARNING')) {
      name = 'Learning Support Focus';
      description = 'Needs development in educational support and skill-building approaches.';
    } else if (weakCategories.includes('HEALTHY_LIVING')) {
      name = 'Health & Wellness Focus';
      description = 'Would benefit from training on health promotion and wellness support.';
    } else {
      name = 'Balanced Performer';
      description = 'Shows consistent performance with room for targeted improvement.';
    }

    return {
      id,
      name,
      description,
      centroid,
      weakCategories,
      strongCategories,
    };
  });
}

/**
 * Classify a single DSP into a cluster based on their answers
 */
export function classifyDsp(
  selfAnswers: QuestionAnswers,
  observerAnswers: QuestionAnswers | null,
  centroids: FeatureVector[],
  profiles: ClusterProfile[]
): ClusteringResult {
  // Use observer answers if available, otherwise self-evaluation
  const primaryAnswers = observerAnswers || selfAnswers;
  const featureVector = answersToFeatureVector(primaryAnswers);
  
  // Find nearest cluster
  let minDist = Infinity;
  let clusterId = 0;
  for (let c = 0; c < centroids.length; c++) {
    const dist = euclideanDistance(featureVector, centroids[c]);
    if (dist < minDist) {
      minDist = dist;
      clusterId = c;
    }
  }

  // Calculate category scores
  const categoryScores: Record<CategoryName, number> = {
    CHOICE: featureVector[0],
    BELONGING: featureVector[1],
    LIFELONG_LEARNING: featureVector[2],
    HEALTHY_LIVING: featureVector[3],
  };

  // Calculate discrepancy if both self and observer answers available
  let discrepancy: number | null = null;
  if (observerAnswers) {
    const selfVector = answersToFeatureVector(selfAnswers);
    const observerVector = featureVector;
    discrepancy = euclideanDistance(selfVector, observerVector);
  }

  return {
    clusterId,
    clusterProfile: profiles[clusterId] || profiles[0],
    featureVector,
    categoryScores,
    discrepancy,
  };
}

/**
 * Find optimal number of clusters using elbow method
 */
export function findOptimalK(
  vectors: FeatureVector[],
  minK: number = 2,
  maxK: number = 6,
  seed?: number
): { optimalK: number; wcssValues: number[] } {
  const wcssValues: number[] = [];
  
  for (let k = minK; k <= maxK; k++) {
    const { assignments, centroids } = kMeans(vectors, k, 100, seed);
    const wcss = calculateWCSS(vectors, assignments, centroids);
    wcssValues.push(wcss);
  }

  // Find elbow point using the angle method
  let optimalK = minK;
  let maxAngle = 0;

  for (let i = 1; i < wcssValues.length - 1; i++) {
    const prev = wcssValues[i - 1];
    const curr = wcssValues[i];
    const next = wcssValues[i + 1];
    
    // Calculate angle at this point
    const angle = Math.abs((prev - curr) - (curr - next));
    if (angle > maxAngle) {
      maxAngle = angle;
      optimalK = minK + i;
    }
  }

  return { optimalK, wcssValues };
}

