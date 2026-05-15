import React from 'react';
import { Internship, MatchReason } from '@/lib/recommendation-types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, IndianRupee, Clock3, MapPin, BookOpen, Building2, Target as TargetIcon, CheckCircle, Star, GraduationCap, Lightbulb, Calendar, Rocket, Gift } from 'lucide-react';
import { getSectorIcon } from '@/lib/sector-icons';

interface InternshipDetailModalProps {
  internship: Internship;
  matchReasons?: MatchReason[];
  matchPercentage?: number;
  isOpen: boolean;
  onClose: () => void;
  onApply: (internshipId: string) => void;
  isRural?: boolean;
}

export function InternshipDetailModal({
  internship,
  matchReasons = [],
  matchPercentage,
  isOpen,
  onClose,
  onApply,
  isRural = false
}: InternshipDetailModalProps) {
  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto ${
        isRural ? 'text-lg' : ''
      }`}>
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{getSectorIcon(internship.sector)}</div>
            <div>
              <h2 className={`${isRural ? 'text-2xl' : 'text-xl'} font-bold text-gray-900`}>
                {internship.title}
              </h2>
              <p className={`${isRural ? 'text-base' : 'text-sm'} text-gray-600`}>
                {internship.company}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Match Score Banner */}
          {matchPercentage && (
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-4">
                  <TargetIcon className="w-6 h-6 text-green-700" />
                  <div>
                    <div className={`${isRural ? 'text-2xl' : 'text-xl'} font-bold text-green-700`}>
                      {matchPercentage}% मैच
                    </div>
                    <p className={`${isRural ? 'text-sm' : 'text-xs'} text-gray-600`}>
                      आपकी प्रोफाइल के साथ
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Key Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 text-center">
                <IndianRupee className="w-6 h-6 text-green-600 mb-2" />
                <div className={`${isRural ? 'text-lg' : 'text-base'} font-bold text-green-700`}>
                  ₹{internship.stipend.toLocaleString()}
                </div>
                <div className={`${isRural ? 'text-sm' : 'text-xs'} text-gray-600`}>
                  प्रति माह
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 text-center">
                <Clock3 className="w-6 h-6 text-blue-600 mb-2" />
                <div className={`${isRural ? 'text-lg' : 'text-base'} font-bold text-blue-700`}>
                  {internship.duration}
                </div>
                <div className={`${isRural ? 'text-sm' : 'text-xs'} text-gray-600`}>
                  अवधि
                </div>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4 text-center">
                <MapPin className="w-6 h-6 text-purple-600 mb-2" />
                <div className={`${isRural ? 'text-lg' : 'text-base'} font-bold text-purple-700`}>
                  {internship.location.mode}
                </div>
                <div className={`${isRural ? 'text-sm' : 'text-xs'} text-gray-600`}>
                  कार्य मोड
                </div>
              </CardContent>
            </Card>

            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="p-4 text-center">
                <TargetIcon className="w-6 h-6 text-orange-600 mb-2" />
                <div className={`${isRural ? 'text-lg' : 'text-base'} font-bold text-orange-700`}>
                  {internship.difficulty}
                </div>
                <div className={`${isRural ? 'text-sm' : 'text-xs'} text-gray-600`}>
                  स्तर
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle className={`${isRural ? 'text-lg' : 'text-base'} flex items-center gap-2`}>
                <BookOpen className="w-4 h-4" /> विवरण
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`${isRural ? 'text-base' : 'text-sm'} text-gray-700 leading-relaxed`}>
                {internship.description}
              </p>
            </CardContent>
          </Card>

          {/* Location Details */}
          <Card>
            <CardHeader>
              <CardTitle className={`${isRural ? 'text-lg' : 'text-base'} flex items-center gap-2`}>
                <MapPin className="w-4 h-4" /> स्थान विवरण
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                <span className={`${isRural ? 'text-base' : 'text-sm'} text-gray-700`}>
                  शहर: {internship.location.district}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span className={`${isRural ? 'text-base' : 'text-sm'} text-gray-700`}>
                  राज्य: {internship.location.state}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                <span className={`${isRural ? 'text-base' : 'text-sm'} text-gray-700`}>
                  कार्य मोड: {internship.location.mode}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Skills Required */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className={`${isRural ? 'text-lg' : 'text-base'} flex items-center gap-2`}>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  आवश्यक कौशल
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {internship.requiredSkills.map((skill, index) => (
                    <Badge key={index} className="bg-red-100 text-red-800 border-red-200">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className={`${isRural ? 'text-lg' : 'text-base'} flex items-center gap-2`}>
                  <Star className="w-4 h-4 text-yellow-500" />
                  वांछित कौशल
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {internship.preferredSkills?.map((skill, index) => (
                    <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {skill}
                    </Badge>
                  )) || <p className={`${isRural ? 'text-sm' : 'text-xs'} text-gray-500`}>कोई विशेष आवश्यकता नहीं</p>}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Education Requirements */}
          <Card>
            <CardHeader>
              <CardTitle className={`${isRural ? 'text-lg' : 'text-base'} flex items-center gap-2`}>
                <GraduationCap className="w-4 h-4 text-blue-600" />
                शैक्षणिक योग्यता
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {internship.requiredEducation.map((education, index) => (
                  <Badge key={index} className="bg-purple-100 text-purple-800 border-purple-200">
                    {education}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card>
            <CardHeader>
              <CardTitle className={`${isRural ? 'text-lg' : 'text-base'} flex items-center gap-2`}>
                <Gift className="w-4 h-4 text-purple-600" />
                लाभ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {internship.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-green-50 rounded-lg border border-green-200">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className={`${isRural ? 'text-sm' : 'text-xs'} text-gray-700`}>
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Why This Matches */}
          {matchReasons.length > 0 && (
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader>
                <CardTitle className={`${isRural ? 'text-lg' : 'text-base'} flex items-center gap-2 text-blue-900`}>
                  <Lightbulb className="w-4 h-4 text-yellow-500" />
                  यह आपके लिए क्यों सही है
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {matchReasons.map((reason, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-blue-200">
                      <span className="text-xl">{reason.icon}</span>
                      <div className="flex-1">
                        <p className={`${isRural ? 'text-sm' : 'text-xs'} text-gray-700`}>
                          {reason.message}
                        </p>
                        <div className="mt-1 bg-blue-100 rounded-full h-2">
                          <div 
                            className={`bg-blue-600 h-2 rounded-full transition-all duration-500 ${
                              reason.weight >= 0.8 ? 'w-4/5' :
                              reason.weight >= 0.6 ? 'w-3/5' :
                              reason.weight >= 0.4 ? 'w-2/5' :
                              reason.weight >= 0.2 ? 'w-1/5' : 'w-1/12'
                            }`}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Important Dates */}
          <Card className="bg-yellow-50 border-yellow-200">
            <CardHeader>
              <CardTitle className={`${isRural ? 'text-lg' : 'text-base'} flex items-center gap-2 text-yellow-800`}>
                <Calendar className="w-4 h-4 text-yellow-600" />
                महत्वपूर्ण तारीखें
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Clock3 className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className={`${isRural ? 'text-sm' : 'text-xs'} text-gray-600`}>आवेदन की अंतिम तारीख</p>
                    <p className={`${isRural ? 'text-base' : 'text-sm'} font-semibold text-yellow-800`}>
                      {new Date(internship.applicationDeadline).toLocaleDateString('hi-IN')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className={`${isRural ? 'text-sm' : 'text-xs'} text-gray-600`}>शुरुआत की तारीख</p>
                    <p className={`${isRural ? 'text-base' : 'text-sm'} font-semibold text-yellow-800`}>
                      {new Date(internship.startDate).toLocaleDateString('hi-IN')}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex gap-3">
          <Button
            onClick={() => onApply(internship.id)}
            className={`flex-1 ${isRural ? 'h-12 text-lg' : 'h-10'} bg-green-600 hover:bg-green-700 text-white font-bold flex items-center justify-center gap-2`}
          >
            <Rocket className="w-4 h-4" />
            अभी आवेदन करें
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className={`${isRural ? 'h-12 px-6' : 'h-10 px-4'} border-gray-300`}
          >
            बंद करें
          </Button>
        </div>
      </div>
    </div>
  );
}