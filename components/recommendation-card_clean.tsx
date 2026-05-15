import React from 'react';
import { RecommendationResult } from '@/lib/recommendation-types';
import { getSectorIcon } from '@/lib/sector-icons';
import { Building2, MapPin, Target, IndianRupee, Clock } from 'lucide-react';

interface RecommendationCardProps {
  recommendation: RecommendationResult;
  onApply: (internshipId: string) => void;
  onLearnMore: (internshipId: string) => void;
}

export function RecommendationCard({ 
  recommendation, 
  onApply, 
  onLearnMore
}: RecommendationCardProps): JSX.Element {
  const { internship, matchPercentage, rank } = recommendation as any;
  
  // Get match percentage color
  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4 flex-1">
            <div className="text-3xl bg-blue-50 p-3 rounded-lg">
              {getSectorIcon(internship.sector || 'general')}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                {internship.title || 'Internship Opportunity'}
              </h3>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Building2 className="w-4 h-4" />
                <span className="font-medium">{internship.company || 'Company Name'}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{internship.location?.district || 'Location'}, {internship.location?.state || 'India'}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <div className={`${getMatchColor(matchPercentage)} text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1`}>
              <Target className="w-3 h-3" />
              {matchPercentage}%
            </div>
            <span className="text-xs text-gray-500">#{rank} Match</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-xs text-gray-600 font-medium">Stipend</p>
                <p className="text-lg font-bold text-green-700">
                  ₹{(internship.stipend || 5000).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-xs text-gray-600 font-medium">Duration</p>
                <p className="text-lg font-bold text-blue-700">
                  {internship.duration || '12 months'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sector and Mode */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
            {internship.sector || 'General'}
          </span>
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
            {internship.location?.mode || 'On-site'}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button 
            onClick={() => onApply(internship.id || 'unknown')}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Apply Now
          </button>
          <button 
            onClick={() => onLearnMore(internship.id || 'unknown')}
            className="px-6 py-3 border border-blue-500 text-blue-600 hover:bg-blue-50 font-medium rounded-lg transition-colors"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}