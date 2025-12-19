/**
 * ML Module Exports
 * 
 * Central export point for all ML functionality
 */

// Clustering exports
export {
  CATEGORIES,
  type CategoryName,
  type FeatureVector,
  type ClusterProfile,
  type ClusteringResult,
  answersToFeatureVector,
  calculateCategoryAverage,
  euclideanDistance,
  calculateCentroid,
  kMeans,
  calculateWCSS,
  calculateSilhouetteScore,
  interpretClusters,
  classifyDsp,
  findOptimalK,
  DEFAULT_CLUSTER_PROFILES,
} from './clustering';

// Recommendation exports
export {
  type ResourceCategory,
  type TrainingResource,
  type Recommendation,
  type RecommendationResponse,
  RESOURCE_CATALOG,
  getRecommendations,
  DEFAULT_CENTROIDS,
  DEFAULT_PROFILES,
  RecommendationService,
  getRecommendationService,
} from './recommendations';

