'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RecommendationCard } from '@/components/recommendation-card';
import { GovernmentHeader } from "@/components/government-header";
import { GovernmentFooter } from "@/components/government-footer";
import { getStoredUserData, storeUserData } from '@/lib/real-data-loader';
import { RuleBasedRecommendationEngine } from '@/lib/recommendation-engine';
import { ClientDataLoader } from '@/lib/real-data-loader';
import { UserProfile, RecommendationResult } from '@/lib/recommendation-types';
import { useTranslationContext } from '@/lib/translation-provider';
import { RECOMMENDATION_WEIGHTS, computeDynamicThreshold, BASE_MIN_SCORE_THRESHOLD } from '@/lib/recommendation-config';
import { 
  UserPlus, 
  Mic, 
  FileText, 
  ArrowRight, 
  User, 
  BookOpen, 
  MapPin, 
  Target,
  AlertCircle
} from 'lucide-react';
import { LayoutGrid, List as ListIcon } from 'lucide-react';

export default function RecommendationsPage() {
  const { currentLang } = useTranslationContext();
  const [recommendations, setRecommendations] = useState<RecommendationResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [showQuickForm, setShowQuickForm] = useState(false);
  const [simpleMode, setSimpleMode] = useState(false);
  const [quickFormData, setQuickFormData] = useState({
    skills: '',
    interests: '',
    location: '',
    education: 'Graduate' as const
  });
  const didInitFromQuery = useRef(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        let profile: UserProfile | null = userData;

        // Initialize from URL/session ONCE
        if (!didInitFromQuery.current && typeof window !== 'undefined') {
          const params = new URLSearchParams(window.location.search);
          const simple = params.get('simple');
          const profileParam = params.get('profile');
          const viewParam = params.get('view');
          const sessionSimple = sessionStorage.getItem('simpleView');
          const sessionView = sessionStorage.getItem('viewMode');
          const initialSimple = simple === '1' || sessionSimple === '1';
          setSimpleMode(initialSimple);
          const initialView = (viewParam === 'list' || sessionView === 'list') ? 'list' : 'grid';
          setViewMode(initialView);

          if (profileParam) {
            try {
              const decoded = decodeURIComponent(profileParam);
              profile = JSON.parse(decoded) as UserProfile;
              storeUserData(profile);
            } catch (e) {
              console.warn('Failed to parse profile from URL:', e);
            }
          }
          didInitFromQuery.current = true;
        }

        if (!profile) {
          profile = getStoredUserData();
        }
        setUserData(profile);

        if (profile) {
          // Pass the user profile to get personalized internship data
          const internships = ClientDataLoader.getSampleRealData(profile);
          let recs = RuleBasedRecommendationEngine.getRecommendations(profile, internships);
          if (simpleMode) {
            recs = recs.slice(0, 5);
          }
          setRecommendations(recs);
        }
      } catch (error) {
        console.error('Error loading recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRecommendations();
  }, [simpleMode, userData]);

  const handleQuickFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const quickUserData: UserProfile = {
        education: quickFormData.education,
        field: 'General',
        skills: quickFormData.skills.split(',').map(s => s.trim()).filter(s => s.length > 0),
        interests: quickFormData.interests.split(',').map(s => s.trim()).filter(s => s.length > 0),
        languages: ['English'],
        location: {
          state: quickFormData.location || 'Any',
          district: '',
          isRural: false
        },
        workMode: 'Hybrid',
        stipendExpectation: 5000,
        duration: '12 months'
      };

      // Pass user profile to get personalized internship data
      const internships = ClientDataLoader.getSampleRealData(quickUserData);
      const recs = RuleBasedRecommendationEngine.getRecommendations(quickUserData, internships);
      storeUserData(quickUserData); // Store user data
      setRecommendations(recs);
      setUserData(quickUserData);
      setShowQuickForm(false);
    } catch (error) {
      console.error('Error generating recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = (internshipId: string) => {
    console.log('Applying to internship:', internshipId);
    // Handle application logic
  };

  const handleLearnMore = (internshipId: string) => {
    console.log('Learning more about internship:', internshipId);
    // Handle learn more logic
  };

  // Helper to exit simple mode and clean URL
  const exitSimpleMode = () => {
    setSimpleMode(false);
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('simpleView', '0');
        const url = new URL(window.location.href);
        url.searchParams.delete('simple');
        // Keep profile if present to not lose state in deep-link scenarios
        window.history.replaceState({}, '', url.toString());
      } catch {}
    }
  };

  // Handle view mode toggle with persistence
  const setAndPersistViewMode = (mode: 'grid' | 'list') => {
    setViewMode(mode);
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('viewMode', mode);
        const url = new URL(window.location.href);
        if (mode === 'grid') {
          url.searchParams.delete('view');
        } else {
          url.searchParams.set('view', 'list');
        }
        window.history.replaceState({}, '', url.toString());
      } catch {}
    }
  };

  if (loading) {
    return (
      <>
        <GovernmentHeader />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">
              {currentLang === 'hi' ? 'आपकी सिफारिशें लोड हो रही हैं...' : 'Loading your recommendations...'}
            </p>
          </div>
        </div>
        <GovernmentFooter />
      </>
    );
  }

  return (
    <>
      <GovernmentHeader />
      <div className="min-h-screen bg-gray-50">

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {!userData && !simpleMode ? (
            /* No Data - Show Options */
            <div className="text-center py-12">
              <div className="max-w-2xl mx-auto">
                <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {currentLang === 'hi' ? 'सिफारिशें पाने के लिए' : 'Get Personalized Recommendations'}
                </h3>
                <p className="text-gray-600 mb-8">
                  {currentLang === 'hi' 
                    ? 'व्यक्तिगत सुझाव पाने के लिए कृपया अपनी जानकारी साझा करें'
                    : 'Please share your details to get personalized internship suggestions'
                  }
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {/* Voice Assistant Option */}
                  <Card className="border-2 border-blue-200 hover:border-blue-400 transition-colors cursor-pointer"
                        onClick={() => window.location.href = '/#ai-matcher'}>
                    <CardContent className="p-6 text-center">
                      <Mic className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {currentLang === 'hi' ? 'वॉइस असिस्टेंट' : 'Voice Assistant'}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {currentLang === 'hi' 
                          ? 'आवाज में बात करके जानकारी दें'
                          : 'Share details through voice conversation'
                        }
                      </p>
                    </CardContent>
                  </Card>

                  {/* Registration Form Option */}
                  <Card className="border-2 border-green-200 hover:border-green-400 transition-colors cursor-pointer"
                        onClick={() => window.location.href = '/registration'}>
                    <CardContent className="p-6 text-center">
                      <FileText className="w-12 h-12 text-green-600 mx-auto mb-4" />
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {currentLang === 'hi' ? 'पूर्ण फॉर्म' : 'Complete Form'}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {currentLang === 'hi' 
                          ? 'विस्तृत पंजीकरण फॉर्म भरें'
                          : 'Fill detailed registration form'
                        }
                      </p>
                    </CardContent>
                  </Card>

                  {/* Quick Form Option */}
                  <Card className="border-2 border-orange-200 hover:border-orange-400 transition-colors cursor-pointer"
                        onClick={() => setShowQuickForm(true)}>
                    <CardContent className="p-6 text-center">
                      <Target className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {currentLang === 'hi' ? 'त्वरित फॉर्म' : 'Quick Form'}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {currentLang === 'hi' 
                          ? 'तुरंत बुनियादी जानकारी दें'
                          : 'Share basic info instantly'
                        }
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* User Profile Summary (detailed when not simple) */}
              {userData && (
                <div className="mb-8">
                  <Card className="border-l-4 border-blue-500">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <User className="w-8 h-8 text-blue-600" />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {currentLang === 'hi' ? 'आपकी प्रोफ़ाइल' : 'Your Profile'}
                          </h3>
                          {userData.name && (
                            <p className="text-gray-600">
                              {currentLang === 'hi' ? 'नाम:' : 'Name:'} {userData.name}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className={simpleMode ? "grid md:grid-cols-2 gap-3 text-sm" : "grid md:grid-cols-4 gap-4 text-sm"}>
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-700">
                            {currentLang === 'hi' ? 'शिक्षा:' : 'Education:'} {userData.education}
                          </span>
                        </div>
                        {userData.skills.length > 0 && (
                          <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-700">
                              {currentLang === 'hi' ? 'कौशल:' : 'Skills:'} {userData.skills.slice(0, 2).join(', ')}
                              {userData.skills.length > 2 && ' +' + (userData.skills.length - 2)}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-700">
                            {currentLang === 'hi' ? 'स्थान:' : 'Location:'} {userData.location.state || 'Any'}
                          </span>
                        </div>
                        {userData.interests.length > 0 && (
                          <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-700">
                              {currentLang === 'hi' ? 'रुचि:' : 'Interest:'} {userData.interests[0]}
                            </span>
                          </div>
                        )}
                        {!simpleMode && (
                          <>
                            <div className="flex items-center gap-2">
                              <span className="w-4 h-4 text-gray-500 inline-block" aria-hidden />
                              <span className="text-gray-700">
                                {currentLang === 'hi' ? 'कार्य मोड:' : 'Work mode:'} {userData.workMode || (currentLang === 'hi' ? 'कोई भी' : 'Any')}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="w-4 h-4 text-gray-500 inline-block" aria-hidden />
                              <span className="text-gray-700">
                                {currentLang === 'hi' ? 'अवधि:' : 'Duration:'} {userData.duration || (currentLang === 'hi' ? 'लचीला' : 'Flexible')}
                              </span>
                            </div>
                            {'stipendExpectation' in userData && (
                              <div className="flex items-center gap-2">
                                <span className="w-4 h-4 text-gray-500 inline-block" aria-hidden />
                                <span className="text-gray-700">
                                  {currentLang === 'hi' ? 'वजीफा अपेक्षा:' : 'Stipend expectation:'} ₹{(userData as any).stipendExpectation?.toLocaleString?.() || (userData as any).stipendExpectation}
                                </span>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                      {/* Controls row: simple toggle action and view selector */}
                      <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
                        {simpleMode && (
                          <Button
                            variant="outline"
                            onClick={exitSimpleMode}
                          >
                            {currentLang === 'hi' ? 'विस्तृत स्कोर देखें' : 'See detailed scoring'}
                          </Button>
                        )}
                        {/* View toggle */}
                        <div className="ml-auto flex items-center gap-2">
                          <span className="text-xs text-gray-500">
                            {currentLang === 'hi' ? 'दृश्य:' : 'View:'}
                          </span>
                          <button
                            onClick={() => setAndPersistViewMode('grid')}
                            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-md border text-sm ${viewMode === 'grid' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                            aria-label={currentLang === 'hi' ? 'कार्ड दृश्य' : 'Card view'}
                          >
                            <LayoutGrid className="w-4 h-4" /> {currentLang === 'hi' ? 'कार्ड' : 'Cards'}
                          </button>
                          <button
                            onClick={() => setAndPersistViewMode('list')}
                            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-md border text-sm ${viewMode === 'list' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                            aria-label={currentLang === 'hi' ? 'सूची दृश्य' : 'List view'}
                          >
                            <ListIcon className="w-4 h-4" /> {currentLang === 'hi' ? 'सूची' : 'List'}
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Scoring Explanation (only in detailed mode) */}
              {!simpleMode && userData && (
                <div className="mb-8">
                  <Card className="border-l-4 border-green-500">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {currentLang === 'hi' ? 'आपका स्कोर कैसे निकाला गया' : 'How your score is calculated'}
                      </h3>
                      {/* Weights */}
                      <div className="grid md:grid-cols-2 gap-4 mb-4 text-sm">
                        {([
                          { key: 'EDUCATION', label: currentLang === 'hi' ? 'शिक्षा' : 'Education' },
                          { key: 'SKILLS', label: currentLang === 'hi' ? 'कौशल' : 'Skills' },
                          { key: 'LOCATION', label: currentLang === 'hi' ? 'स्थान' : 'Location' },
                          { key: 'INTERESTS', label: currentLang === 'hi' ? 'रुचि' : 'Interests' },
                          { key: 'PREFERENCES', label: currentLang === 'hi' ? 'पसंद' : 'Preferences' }
                        ] as const).map(item => (
                          <div key={item.key} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-md px-3 py-2">
                            <span className="text-gray-700">{item.label}</span>
                            <span className="font-semibold text-gray-900">{RECOMMENDATION_WEIGHTS[item.key as keyof typeof RECOMMENDATION_WEIGHTS]}%</span>
                          </div>
                        ))}
                      </div>

                      {/* Threshold */}
                      <div className="bg-green-50 border border-green-200 rounded-md p-4">
                        {(() => {
                          const info = computeDynamicThreshold(userData);
                          const relax = BASE_MIN_SCORE_THRESHOLD - info.appliedThreshold;
                          return (
                            <div className="text-sm text-green-900">
                              <p className="font-medium mb-1">
                                {currentLang === 'hi' ? 'न्यूनतम आवश्यक स्कोर' : 'Minimum required score'}
                              </p>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="bg-white border border-green-300 text-green-800 px-2 py-0.5 rounded">{currentLang === 'hi' ? 'आधार' : 'Base'}: {BASE_MIN_SCORE_THRESHOLD}</span>
                                <span className="text-green-700">-</span>
                                <span className="bg-white border border-green-300 text-green-800 px-2 py-0.5 rounded">{currentLang === 'hi' ? 'राहत' : 'Relax'}: {relax}</span>
                                <span className="text-green-700">=</span>
                                <span className="bg-white border border-green-300 text-green-900 font-semibold px-2 py-0.5 rounded">{currentLang === 'hi' ? 'लागू' : 'Applied'}: {info.appliedThreshold}</span>
                              </div>
                              {info.missingDimensions.length > 0 && (
                                <p className="mt-2 text-xs text-green-800">
                                  {currentLang === 'hi' ? 'इन जानकारियों की कमी के कारण सीमा कम की गई:' : 'Threshold relaxed due to missing info:'}
                                  <span className="ml-1">
                                    {info.missingDimensions.map((m, i) => (
                                      <span key={m} className="inline-block bg-white border border-green-300 text-green-800 px-2 py-0.5 rounded mr-1 mb-1">
                                        {currentLang === 'hi' ? (
                                          m === 'education' ? 'शिक्षा' : m === 'skills' ? 'कौशल' : m === 'interests' ? 'रुचि' : m === 'location' ? 'स्थान' : 'पसंद'
                                        ) : m}
                                      </span>
                                    ))}
                                  </span>
                                </p>
                              )}
                            </div>
                          );
                        })()}
                      </div>

                      <p className="text-xs text-gray-600 mt-3">
                        {currentLang === 'hi'
                          ? 'प्रत्येक इंटर्नशिप का मिलान ऊपर दिए गए कारकों के भारित स्कोर पर आधारित है। उच्चतम स्कोर वाले परिणाम शीर्ष पर होते हैं।'
                          : 'Each internship match is a weighted sum of the above factors. Higher scores appear first.'}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Recommendations */}
              {recommendations.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900">
                    {currentLang === 'hi' ? 'कोई सिफारिश नहीं मिली' : 'No recommendations found'}
                  </h3>
                  <p className="mt-2 text-gray-600">
                    {currentLang === 'hi' 
                      ? 'कृपया अपनी प्रोफ़ाइल को पूरा करें या विभिन्न कौशल जोड़ें।'
                      : 'Please complete your profile or try adding different skills.'
                    }
                  </p>
                </div>
              ) : (
                <div className={viewMode === 'grid' ? "grid gap-6 lg:grid-cols-2 xl:grid-cols-3" : "space-y-4"}>
                  {(simpleMode ? recommendations.slice(0, Math.min(5, recommendations.length)) : recommendations).map((recommendation: RecommendationResult, index: number) => (
                    <RecommendationCard
                      key={index}
                      recommendation={recommendation}
                      lang={currentLang}
                      variant={simpleMode ? 'simple' : 'full'}
                      layout={viewMode}
                      onApply={handleApply}
                      onLearnMore={handleLearnMore}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Quick Form Modal */}
        {showQuickForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-md w-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  {currentLang === 'hi' ? 'त्वरित सिफारिश फॉर्म' : 'Quick Recommendation Form'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleQuickFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {currentLang === 'hi' ? 'कौशल (कॉमा से अलग करें)' : 'Skills (comma separated)'}
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={currentLang === 'hi' ? 'जैसे: Programming, Design' : 'e.g. Programming, Design'}
                      value={quickFormData.skills}
                      onChange={(e) => setQuickFormData({...quickFormData, skills: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {currentLang === 'hi' ? 'रुचि के क्षेत्र' : 'Interests'}
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={currentLang === 'hi' ? 'जैसे: IT, Finance' : 'e.g. IT, Finance'}
                      value={quickFormData.interests}
                      onChange={(e) => setQuickFormData({...quickFormData, interests: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {currentLang === 'hi' ? 'पसंदीदा स्थान' : 'Preferred Location'}
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={currentLang === 'hi' ? 'जैसे: Maharashtra, Delhi' : 'e.g. Maharashtra, Delhi'}
                      value={quickFormData.location}
                      onChange={(e) => setQuickFormData({...quickFormData, location: e.target.value})}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      type="submit" 
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      <ArrowRight className="w-4 h-4 mr-2" />
                      {currentLang === 'hi' ? 'सिफारिशें प्राप्त करें' : 'Get Recommendations'}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowQuickForm(false)}
                    >
                      {currentLang === 'hi' ? 'रद्द करें' : 'Cancel'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      <GovernmentFooter />
    </>
  );
}