/**
 * Resource Recommendation Engine
 * 
 * Uses clustering results to recommend personalized training resources
 * based on DSP evaluation profiles.
 */

import type { QuestionAnswers } from '../types';
import {
  CategoryName,
  ClusterProfile,
  ClusteringResult,
  FeatureVector,
  answersToFeatureVector,
  classifyDsp,
  interpretClusters,
  kMeans,
} from './clustering';

// Resource categories
export type ResourceCategory = 'training' | 'guide' | 'video' | 'workshop' | 'mentorship';

// Training resource definition
export interface TrainingResource {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  targetCategories: CategoryName[];
  url?: string;
  duration?: string;
  priority: 'high' | 'medium' | 'low';
}

// Recommendation result
export interface Recommendation {
  resource: TrainingResource;
  relevanceScore: number; // 0-1, higher is more relevant
  reason: string;
}

// Full recommendation response
export interface RecommendationResponse {
  dspEmail: string;
  clusteringResult: ClusteringResult;
  recommendations: Recommendation[];
  insights: string[];
  generatedAt: string;
}

/**
 * Resource catalog - maps categories to available resources
 */
export const RESOURCE_CATALOG: TrainingResource[] = [
  // CHOICE category resources
  {
    id: 'choice-101',
    title: 'Promoting Individual Choice',
    description: 'Learn strategies for supporting individual decision-making and respecting personal preferences.',
    category: 'training',
    targetCategories: ['CHOICE'],
    duration: '2 hours',
    priority: 'high',
  },
  {
    id: 'choice-privacy',
    title: 'Privacy and Dignity in Care',
    description: 'Best practices for maintaining privacy, knocking before entering, and hands-on permission protocols.',
    category: 'guide',
    targetCategories: ['CHOICE'],
    duration: '1 hour',
    priority: 'high',
  },
  {
    id: 'choice-meal',
    title: 'Food Choice and Meal Planning',
    description: 'Supporting individuals in making food choices and participating in meal planning.',
    category: 'video',
    targetCategories: ['CHOICE'],
    duration: '45 min',
    priority: 'medium',
  },
  {
    id: 'choice-activity',
    title: 'Activity Options Workshop',
    description: 'Interactive workshop on providing meaningful activity choices throughout the day.',
    category: 'workshop',
    targetCategories: ['CHOICE'],
    duration: '3 hours',
    priority: 'medium',
  },

  // BELONGING category resources
  {
    id: 'belong-community',
    title: 'Community Integration Fundamentals',
    description: 'Building meaningful community connections and supporting social inclusion.',
    category: 'training',
    targetCategories: ['BELONGING'],
    duration: '3 hours',
    priority: 'high',
  },
  {
    id: 'belong-schedule',
    title: 'Person-Centered Scheduling',
    description: 'Creating personalized and group schedules that reflect individual preferences.',
    category: 'guide',
    targetCategories: ['BELONGING'],
    duration: '1.5 hours',
    priority: 'medium',
  },
  {
    id: 'belong-outings',
    title: 'Community Outings Best Practices',
    description: 'Planning and executing successful individual and group community outings.',
    category: 'video',
    targetCategories: ['BELONGING'],
    duration: '1 hour',
    priority: 'medium',
  },
  {
    id: 'belong-relationships',
    title: 'Supporting Social Relationships',
    description: 'Facilitating friendships, family connections, and romantic relationships.',
    category: 'workshop',
    targetCategories: ['BELONGING'],
    duration: '4 hours',
    priority: 'high',
  },
  {
    id: 'belong-visitors',
    title: 'Visitor Policies and Family Engagement',
    description: 'Managing overnight visits and supporting family relationships.',
    category: 'guide',
    targetCategories: ['BELONGING'],
    duration: '45 min',
    priority: 'low',
  },

  // LIFELONG LEARNING category resources
  {
    id: 'learn-plans',
    title: 'Understanding Individual Plans',
    description: 'Deep dive into annual plans, BST steps, and behavioral support documentation.',
    category: 'training',
    targetCategories: ['LIFELONG_LEARNING'],
    duration: '2 hours',
    priority: 'high',
  },
  {
    id: 'learn-communication',
    title: 'Communication Support Strategies',
    description: 'Using and describing communication supports effectively.',
    category: 'training',
    targetCategories: ['LIFELONG_LEARNING'],
    duration: '2.5 hours',
    priority: 'high',
  },
  {
    id: 'learn-bst',
    title: 'BST Implementation Guide',
    description: 'Step-by-step guide to understanding and incorporating BST into daily routines.',
    category: 'guide',
    targetCategories: ['LIFELONG_LEARNING'],
    duration: '1.5 hours',
    priority: 'medium',
  },
  {
    id: 'learn-data',
    title: 'Behavioral Data Collection',
    description: 'Best practices for locating, understanding, and reporting behavioral data.',
    category: 'video',
    targetCategories: ['LIFELONG_LEARNING'],
    duration: '1 hour',
    priority: 'medium',
  },

  // HEALTHY LIVING category resources
  {
    id: 'health-physical',
    title: 'Physical Health Documentation',
    description: 'Understanding and locating physical health forms and medical information.',
    category: 'guide',
    targetCategories: ['HEALTHY_LIVING'],
    duration: '1 hour',
    priority: 'high',
  },
  {
    id: 'health-medication',
    title: 'Medication Management Essentials',
    description: 'Understanding medication needs, administration, and documentation.',
    category: 'training',
    targetCategories: ['HEALTHY_LIVING'],
    duration: '2 hours',
    priority: 'high',
  },
  {
    id: 'health-nutrition',
    title: 'Dietary Needs and Nutrition',
    description: 'Supporting individual dietary requirements and promoting healthy eating.',
    category: 'video',
    targetCategories: ['HEALTHY_LIVING'],
    duration: '45 min',
    priority: 'medium',
  },
  {
    id: 'health-exercise',
    title: 'Physical Activity Programming',
    description: 'Incorporating exercise and physical activities into daily routines.',
    category: 'workshop',
    targetCategories: ['HEALTHY_LIVING'],
    duration: '2 hours',
    priority: 'medium',
  },
  {
    id: 'health-mental',
    title: 'Mental Health and Wellness',
    description: 'Supporting mental health through activities and recognizing signs of distress.',
    category: 'training',
    targetCategories: ['HEALTHY_LIVING'],
    duration: '3 hours',
    priority: 'high',
  },
  {
    id: 'health-hygiene',
    title: 'Personal Hygiene Education',
    description: 'Teaching and supporting personal hygiene practices with dignity.',
    category: 'guide',
    targetCategories: ['HEALTHY_LIVING'],
    duration: '1 hour',
    priority: 'medium',
  },

  // Cross-category resources
  {
    id: 'mentor-program',
    title: 'DSP Mentorship Program',
    description: 'One-on-one mentorship with experienced DSPs for comprehensive skill development.',
    category: 'mentorship',
    targetCategories: ['CHOICE', 'BELONGING', 'LIFELONG_LEARNING', 'HEALTHY_LIVING'],
    duration: '3 months',
    priority: 'high',
  },
  {
    id: 'advanced-leadership',
    title: 'Advanced DSP Leadership Training',
    description: 'For high performers ready to mentor others and take on leadership roles.',
    category: 'workshop',
    targetCategories: ['CHOICE', 'BELONGING', 'LIFELONG_LEARNING', 'HEALTHY_LIVING'],
    duration: '8 hours',
    priority: 'low',
  },
];

/**
 * Calculate relevance score for a resource based on cluster profile
 */
function calculateRelevanceScore(
  resource: TrainingResource,
  clusterResult: ClusteringResult
): number {
  const { weakCategories } = clusterResult.clusterProfile;
  const { categoryScores } = clusterResult;
  
  // Check how many of the resource's target categories are weak areas
  const matchingWeakCategories = resource.targetCategories.filter(
    cat => weakCategories.includes(cat)
  );
  
  // Base score from weak category matches
  let score = matchingWeakCategories.length / resource.targetCategories.length;
  
  // Boost score based on how low the category scores are
  for (const cat of matchingWeakCategories) {
    const catScore = categoryScores[cat];
    // Lower scores = higher relevance boost
    score += (5 - catScore) / 20; // Max 0.25 boost per category
  }
  
  // Priority boost
  if (resource.priority === 'high') {
    score *= 1.2;
  } else if (resource.priority === 'low') {
    score *= 0.8;
  }
  
  // Cap at 1.0
  return Math.min(1.0, score);
}

/**
 * Generate reason for recommending a resource
 */
function generateReason(
  resource: TrainingResource,
  clusterResult: ClusteringResult
): string {
  const { weakCategories, name: clusterName } = clusterResult.clusterProfile;
  const { categoryScores } = clusterResult;
  
  const matchingWeaks = resource.targetCategories.filter(
    cat => weakCategories.includes(cat)
  );
  
  if (matchingWeaks.length === 0) {
    // Resource for strong areas - advanced development
    return `Recommended for continued excellence and advanced skill development.`;
  }
  
  const categoryNames: Record<CategoryName, string> = {
    CHOICE: 'Choice & Autonomy',
    BELONGING: 'Community Belonging',
    LIFELONG_LEARNING: 'Life-Long Learning',
    HEALTHY_LIVING: 'Healthy Living',
  };
  
  const lowestCategory = matchingWeaks.reduce((lowest, cat) => 
    categoryScores[cat] < categoryScores[lowest] ? cat : lowest
  );
  
  const score = categoryScores[lowestCategory].toFixed(1);
  
  return `Your ${categoryNames[lowestCategory]} score (${score}/5) suggests this would be valuable. Based on your "${clusterName}" profile.`;
}

/**
 * Generate insights based on clustering result
 */
function generateInsights(clusterResult: ClusteringResult): string[] {
  const insights: string[] = [];
  const { clusterProfile, categoryScores, discrepancy } = clusterResult;
  
  // Profile-based insight
  insights.push(clusterProfile.description);
  
  // Find strongest category
  const categories = Object.entries(categoryScores) as [CategoryName, number][];
  const strongest = categories.reduce((max, curr) => curr[1] > max[1] ? curr : max);
  const weakest = categories.reduce((min, curr) => curr[1] < min[1] ? curr : min);
  
  const categoryLabels: Record<CategoryName, string> = {
    CHOICE: 'Choice & Autonomy',
    BELONGING: 'Community Belonging',
    LIFELONG_LEARNING: 'Life-Long Learning',
    HEALTHY_LIVING: 'Healthy Living',
  };
  
  if (strongest[1] >= 4.0) {
    insights.push(`Your strength in ${categoryLabels[strongest[0]]} (${strongest[1].toFixed(1)}/5) is notable. Consider mentoring others in this area.`);
  }
  
  if (weakest[1] < 3.0) {
    insights.push(`Focus area: ${categoryLabels[weakest[0]]} (${weakest[1].toFixed(1)}/5). The recommended resources prioritize this category.`);
  }
  
  // Discrepancy insight
  if (discrepancy !== null) {
    if (discrepancy > 1.0) {
      insights.push(`There's a notable gap between your self-assessment and observer ratings. Consider discussing this with your supervisor for additional perspective.`);
    } else if (discrepancy < 0.3) {
      insights.push(`Your self-assessment closely matches your observer's evaluation, indicating strong self-awareness.`);
    }
  }
  
  return insights;
}

/**
 * Get personalized recommendations for a DSP
 */
export function getRecommendations(
  selfAnswers: QuestionAnswers,
  observerAnswers: QuestionAnswers | null,
  centroids: FeatureVector[],
  profiles: ClusterProfile[],
  maxRecommendations: number = 5
): RecommendationResponse {
  // Classify the DSP
  const clusterResult = classifyDsp(selfAnswers, observerAnswers, centroids, profiles);
  
  // Score all resources
  const scoredResources: Recommendation[] = RESOURCE_CATALOG.map(resource => ({
    resource,
    relevanceScore: calculateRelevanceScore(resource, clusterResult),
    reason: generateReason(resource, clusterResult),
  }));
  
  // Sort by relevance and take top N
  scoredResources.sort((a, b) => b.relevanceScore - a.relevanceScore);
  const topRecommendations = scoredResources.slice(0, maxRecommendations);
  
  // Generate insights
  const insights = generateInsights(clusterResult);
  
  return {
    dspEmail: '', // Will be filled by the service
    clusteringResult: clusterResult,
    recommendations: topRecommendations,
    insights,
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Default centroids for when no training data is available
 * Based on expected evaluation patterns
 */
export const DEFAULT_CENTROIDS: FeatureVector[] = [
  [2.0, 2.0, 2.0, 2.0], // Needs Support (all low)
  [4.5, 2.5, 2.5, 4.5], // Strong in Choice/Health, weak in Belonging/Learning
  [4.0, 2.0, 4.0, 4.0], // Strong overall, weak in Belonging
  [4.5, 4.5, 4.5, 4.5], // High Performer (all high)
];

// Pre-computed default profiles
export const DEFAULT_PROFILES = interpretClusters(DEFAULT_CENTROIDS);

/**
 * RecommendationService - Main service class for getting recommendations
 */
export class RecommendationService {
  private centroids: FeatureVector[];
  private profiles: ClusterProfile[];
  private isTrainedFromData: boolean = false;

  constructor() {
    this.centroids = DEFAULT_CENTROIDS;
    this.profiles = DEFAULT_PROFILES;
  }

  /**
   * Train clusters from historical data
   */
  train(evaluationData: QuestionAnswers[], k: number = 4, seed?: number): void {
    if (evaluationData.length < k) {
      console.warn(`Not enough data to train ${k} clusters. Using defaults.`);
      return;
    }

    const vectors = evaluationData.map(answersToFeatureVector);
    const { centroids } = kMeans(vectors, k, 100, seed);
    
    this.centroids = centroids;
    this.profiles = interpretClusters(centroids);
    this.isTrainedFromData = true;
  }

  /**
   * Get recommendations for a DSP
   */
  getRecommendationsForDsp(
    dspEmail: string,
    selfAnswers: QuestionAnswers,
    observerAnswers: QuestionAnswers | null,
    maxRecommendations: number = 5
  ): RecommendationResponse {
    const response = getRecommendations(
      selfAnswers,
      observerAnswers,
      this.centroids,
      this.profiles,
      maxRecommendations
    );
    
    response.dspEmail = dspEmail;
    return response;
  }

  /**
   * Check if service has been trained from actual data
   */
  isTrained(): boolean {
    return this.isTrainedFromData;
  }

  /**
   * Get current cluster profiles
   */
  getClusterProfiles(): ClusterProfile[] {
    return this.profiles;
  }

  /**
   * Get centroids for inspection
   */
  getCentroids(): FeatureVector[] {
    return this.centroids;
  }
}

// Singleton instance
let serviceInstance: RecommendationService | null = null;

export function getRecommendationService(): RecommendationService {
  if (!serviceInstance) {
    serviceInstance = new RecommendationService();
  }
  return serviceInstance;
}
