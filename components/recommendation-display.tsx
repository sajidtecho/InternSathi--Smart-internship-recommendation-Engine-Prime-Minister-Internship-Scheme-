import React, { useState } from 'react';
import { RecommendationResult, UserProfile } from '@/lib/recommendation-types';
import { RecommendationCard } from './recommendation-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Target, 
  BookOpen, 
  MapPin, 
  BarChart3, 
  DollarSign, 
  Clock, 
  Trophy, 
  Rocket, 
  FileText, 
  RefreshCw,
  Frown
} from 'lucide-react';

interface RecommendationDisplayProps {
  recommendations: RecommendationResult[];
  userProfile: UserProfile;
  onApply: (internshipId: string) => void;
  onLearnMore: (internshipId: string) => void;
  onRefineSearch?: () => void;
  isLoading?: boolean;
  isRural?: boolean;
}

export function RecommendationDisplay({
  recommendations,
  userProfile,
  onApply,
  onLearnMore,
  onRefineSearch,
  isLoading = false,
  isRural = false
}: RecommendationDisplayProps) {
  const [viewAll, setViewAll] = useState(false);
  const displayedRecommendations = viewAll ? recommendations : recommendations.slice(0, 3);

  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h3 className={`${isRural ? 'text-xl' : 'text-lg'} font-semibold text-gray-700 flex items-center justify-center gap-2`}>
            <Search className="w-6 h-6" /> आपके लिए सबसे अच्छे अवसर खोजे जा रहे हैं...
          </h3>
          <p className={`${isRural ? 'text-base' : 'text-sm'} text-gray-600 mt-2`}>
            कृपया प्रतीक्षा करें
          </p>
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <Card className="text-center p-8 border-dashed border-2 border-gray-300">
          <CardContent className="space-y-4">
            <div className="text-6xl flex justify-center">
              <Frown className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className={`${isRural ? 'text-xl' : 'text-lg'} font-semibold text-gray-700`}>
              कोई उपयुक्त इंटर्नशिप नहीं मिली
            </h3>
            <p className={`${isRural ? 'text-base' : 'text-sm'} text-gray-600 max-w-md mx-auto`}>
              आपकी वरीयताओं के अनुसार कोई इंटर्नशिप उपलब्ध नहीं है। कृपया अपनी खोज बदलें या बाद में पुनः प्रयास करें।
            </p>
            {onRefineSearch && (
              <Button onClick={onRefineSearch} className="mt-4 flex items-center gap-2">
                <Search className="w-4 h-4" />
                खोज सुधारें
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  const averageMatch = Math.round(
    recommendations.reduce((sum, rec) => sum + rec.matchPercentage, 0) / recommendations.length
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Target className="w-10 h-10 text-blue-600" />
          <h2 className={`${isRural ? 'text-3xl' : 'text-2xl'} font-bold text-gray-900`}>
            आपके लिए सुझाई गई इंटर्नशिप
          </h2>
        </div>
        
        {/* User Profile Summary */}
        <Card className="max-w-2xl mx-auto bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
              <Badge className="bg-blue-600 text-white flex items-center gap-1">
                <BookOpen className="w-3 h-3" />
                {userProfile.education || 'Education not specified'}
              </Badge>
              <Badge variant="outline" className="bg-white flex items-center gap-1">
                <Target className="w-3 h-3" />
                {userProfile.interests?.join(', ') || 'No interests selected'}
              </Badge>
              <Badge variant="outline" className="bg-white flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {userProfile.location?.state || 'Location not specified'}
              </Badge>
              <Badge className="bg-green-600 text-white flex items-center gap-1">
                <Target className="w-3 h-3" />
                औसत मैच: {averageMatch}%
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="text-center p-4 bg-green-50 border-green-200">
          <div className="text-2xl text-green-600 mb-2">
            <BarChart3 className="w-8 h-8 mx-auto" />
          </div>
          <div className={`${isRural ? 'text-xl' : 'text-lg'} font-bold text-green-700`}>
            {recommendations.length}
          </div>
          <div className={`${isRural ? 'text-sm' : 'text-xs'} text-gray-600`}>
            कुल अवसर
          </div>
        </Card>
        
        <Card className="text-center p-4 bg-blue-50 border-blue-200">
          <div className="text-2xl text-blue-600 mb-2">
            <Target className="w-8 h-8 mx-auto" />
          </div>
          <div className={`${isRural ? 'text-xl' : 'text-lg'} font-bold text-blue-700`}>
            {averageMatch}%
          </div>
          <div className={`${isRural ? 'text-sm' : 'text-xs'} text-gray-600`}>
            औसत मैच
          </div>
        </Card>
        
        <Card className="text-center p-4 bg-purple-50 border-purple-200">
          <div className="text-2xl text-purple-600 mb-2">
            <DollarSign className="w-8 h-8 mx-auto" />
          </div>
          <div className={`${isRural ? 'text-xl' : 'text-lg'} font-bold text-purple-700`}>
            ₹5,000
          </div>
          <div className={`${isRural ? 'text-sm' : 'text-xs'} text-gray-600`}>
            मासिक वेतन
          </div>
        </Card>
        
        <Card className="text-center p-4 bg-orange-50 border-orange-200">
          <div className="text-2xl text-orange-600 mb-2">
            <Clock className="w-8 h-8 mx-auto" />
          </div>
          <div className={`${isRural ? 'text-xl' : 'text-lg'} font-bold text-orange-700`}>
            12 महीने
          </div>
          <div className={`${isRural ? 'text-sm' : 'text-xs'} text-gray-600`}>
            अवधि
          </div>
        </Card>
      </div>

      {/* Recommendations Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className={`${isRural ? 'text-xl' : 'text-lg'} font-semibold text-gray-800 flex items-center gap-2`}>
            <Trophy className="w-5 h-5 text-yellow-500" />
            सर्वोत्तम सुझाव
          </h3>
          {recommendations.length > 3 && (
            <Button
              variant="outline"
              onClick={() => setViewAll(!viewAll)}
              className="border-blue-500 text-blue-600 hover:bg-blue-50"
            >
              {viewAll ? 'कम दिखाएं' : 'सभी देखें'} ({recommendations.length})
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {displayedRecommendations.map((recommendation, index) => (
            <RecommendationCard
              key={recommendation.internship.id}
              recommendation={recommendation}
              onApply={onApply}
              onLearnMore={onLearnMore}
            />
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="text-center p-6">
          <div className="space-y-4">
            <div className="text-3xl flex justify-center">
              <Rocket className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className={`${isRural ? 'text-xl' : 'text-lg'} font-bold text-gray-900`}>
              अपना करियर शुरू करने के लिए तैयार हैं?
            </h3>
            <p className={`${isRural ? 'text-base' : 'text-sm'} text-gray-600 max-w-2xl mx-auto`}>
              प्रधानमंत्री इंटर्नशिप स्कीम के तहत देश की बेहतरीन कंपनियों के साथ काम करने का अवसर पाएं।
              अभी आवेदन करें और अपना भविष्य बनाएं!
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-6 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                आवेदन गाइड देखें
              </Button>
              {onRefineSearch && (
                <Button variant="outline" onClick={onRefineSearch} className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  खोज बदलें
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}