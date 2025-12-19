'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, Lightbulb, TrendingUp, Video, Users, Award, ChevronDown, ChevronUp } from 'lucide-react';

// Types matching the API response
type ResourceCategory = 'training' | 'guide' | 'video' | 'workshop' | 'mentorship';

interface TrainingResource {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  targetCategories: string[];
  url?: string;
  duration?: string;
  priority: 'high' | 'medium' | 'low';
}

interface Recommendation {
  resource: TrainingResource;
  relevanceScore: number;
  reason: string;
}

interface ClusterProfile {
  id: number;
  name: string;
  description: string;
  weakCategories: string[];
  strongCategories: string[];
}

interface RecommendationResponse {
  dspEmail: string;
  clusteringResult: {
    clusterId: number;
    clusterProfile: ClusterProfile;
    categoryScores: Record<string, number>;
    discrepancy: number | null;
  };
  recommendations: Recommendation[];
  insights: string[];
  generatedAt: string;
}

// Icon mapping for resource categories
const CategoryIcon = ({ category }: { category: ResourceCategory }) => {
  const iconClass = "w-5 h-5";
  switch (category) {
    case 'training':
      return <BookOpen className={iconClass} />;
    case 'video':
      return <Video className={iconClass} />;
    case 'workshop':
      return <Users className={iconClass} />;
    case 'mentorship':
      return <Award className={iconClass} />;
    case 'guide':
    default:
      return <BookOpen className={iconClass} />;
  }
};

// Priority badge component
const PriorityBadge = ({ priority }: { priority: 'high' | 'medium' | 'low' }) => {
  const colors = {
    high: 'bg-red-100 text-red-700 border-red-200',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    low: 'bg-green-100 text-green-700 border-green-200',
  };

  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border ${colors[priority]} capitalize`}>
      {priority}
    </span>
  );
};

// Relevance score bar
const RelevanceBar = ({ score }: { score: number }) => {
  const percentage = Math.round(score * 100);
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-xs text-gray-500 w-10">{percentage}%</span>
    </div>
  );
};

// Single recommendation card
const RecommendationCard = ({ recommendation, index }: { recommendation: Recommendation; index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const { resource, relevanceScore, reason } = recommendation;

  const categoryColors: Record<ResourceCategory, string> = {
    training: 'border-l-blue-500',
    guide: 'border-l-purple-500',
    video: 'border-l-pink-500',
    workshop: 'border-l-orange-500',
    mentorship: 'border-l-emerald-500',
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-sm border border-gray-200 border-l-4 ${categoryColors[resource.category]} overflow-hidden transition-all`}
    >
      <div 
        className="p-4 cursor-pointer hover:bg-gray-50"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="p-2 bg-gray-100 rounded-lg text-gray-600 flex-shrink-0">
              <CategoryIcon category={resource.category} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-medium text-gray-900">{resource.title}</h4>
                <PriorityBadge priority={resource.priority} />
              </div>
              <p className="text-sm text-gray-500 capitalize mt-0.5">
                {resource.category} • {resource.duration || 'Self-paced'}
              </p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600 p-1">
            {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

        {/* Relevance bar */}
        <div className="mt-3">
          <p className="text-xs text-gray-500 mb-1">Relevance</p>
          <RelevanceBar score={relevanceScore} />
        </div>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="px-4 pb-4 pt-2 border-t border-gray-100 bg-gray-50">
          <p className="text-sm text-gray-700 mb-3">{resource.description}</p>
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
            <p className="text-sm text-blue-800">
              <span className="font-medium">Why this is recommended: </span>
              {reason}
            </p>
          </div>
          {resource.url && (
            <a 
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
            >
              Start Learning
            </a>
          )}
        </div>
      )}
    </div>
  );
};

// Insight card
const InsightCard = ({ insight, index }: { insight: string; index: number }) => (
  <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
    <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
    <p className="text-sm text-amber-800">{insight}</p>
  </div>
);

// Profile summary card
const ProfileSummary = ({ clusterProfile, categoryScores }: { 
  clusterProfile: ClusterProfile; 
  categoryScores: Record<string, number>;
}) => {
  const categoryLabels: Record<string, string> = {
    CHOICE: 'Choice & Autonomy',
    BELONGING: 'Community Belonging',
    LIFELONG_LEARNING: 'Life-Long Learning',
    HEALTHY_LIVING: 'Healthy Living',
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-5 border border-indigo-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <TrendingUp className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <h3 className="font-semibold text-indigo-900">{clusterProfile.name}</h3>
          <p className="text-sm text-indigo-600">{clusterProfile.description}</p>
        </div>
      </div>

      {/* Category scores */}
      <div className="space-y-3">
        {Object.entries(categoryScores).map(([category, score]) => (
          <div key={category}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-700">{categoryLabels[category] || category}</span>
              <span className={`text-sm font-medium ${
                score >= 4 ? 'text-green-600' : score >= 3 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {score.toFixed(1)}/5
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all ${
                  score >= 4 ? 'bg-green-500' : score >= 3 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${(score / 5) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Recommendations component
interface RecommendationsProps {
  dspEmail: string;
}

export const Recommendations = ({ dspEmail }: RecommendationsProps) => {
  const [data, setData] = useState<RecommendationResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!dspEmail) return;
      
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/recommendations?email=${encodeURIComponent(dspEmail)}`);
        const result = await response.json();

        if (result.success) {
          setData(result.data);
        } else {
          setError(result.message || 'Failed to load recommendations');
        }
      } catch (err) {
        setError('Unable to load recommendations. Please try again later.');
        console.error('Error fetching recommendations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [dspEmail]);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-24 bg-gray-100 rounded-xl"></div>
          <div className="space-y-3">
            <div className="h-20 bg-gray-100 rounded-lg"></div>
            <div className="h-20 bg-gray-100 rounded-lg"></div>
            <div className="h-20 bg-gray-100 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="text-center py-8">
          <BookOpen className="w-12 h-12 mx-auto text-gray-300 mb-3" />
          <p className="text-gray-600">{error}</p>
          <p className="text-sm text-gray-400 mt-1">Complete your self-evaluation to receive personalized recommendations.</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Personalized Recommendations</h2>
        <span className="text-xs text-gray-400">
          Powered by ML • Updated {new Date(data.generatedAt).toLocaleDateString()}
        </span>
      </div>

      {/* Profile Summary */}
      <ProfileSummary 
        clusterProfile={data.clusteringResult.clusterProfile}
        categoryScores={data.clusteringResult.categoryScores}
      />

      {/* Insights */}
      {data.insights.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Insights</h3>
          <div className="space-y-2">
            {data.insights.map((insight, i) => (
              <InsightCard key={i} insight={insight} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Recommended Resources</h3>
        <div className="space-y-3">
          {data.recommendations.map((rec, i) => (
            <RecommendationCard key={rec.resource.id} recommendation={rec} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;

