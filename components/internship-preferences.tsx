"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  Briefcase,
  Home,
  Building,
  Monitor,
  Shuffle,
  FileText
} from "lucide-react";

interface InternshipPreferences {
  workMode: string;
  preferredStartDate: string;
  duration: string;
  stipendExpectation: string;
  willingToRelocate: boolean;
  preferredLocation: string;
  additionalRequirements: string;
  availabilityHours: string;
  transportationMode: string;
}

interface InternshipPreferencesProps {
  preferences: InternshipPreferences;
  onPreferencesChange: (preferences: InternshipPreferences) => void;
  isRural?: boolean;
}

const InternshipPreferencesComponent: React.FC<InternshipPreferencesProps> = ({
  preferences,
  onPreferencesChange,
  isRural = false
}) => {
  const [localPreferences, setLocalPreferences] = useState<InternshipPreferences>(preferences);

  // Sync local state with parent preferences
  React.useEffect(() => {
    setLocalPreferences(preferences);
  }, [preferences]);

  const handleInputChange = (field: keyof InternshipPreferences, value: string | boolean) => {
    const updatedPreferences = { ...localPreferences, [field]: value };
    setLocalPreferences(updatedPreferences);
    onPreferencesChange(updatedPreferences);
  };

  const workModeOptions = [
    { value: "remote", label: isRural ? "दूरस्थ कार्य" : "Remote Work", icon: <Home className="w-4 h-4" /> },
    { value: "onsite", label: isRural ? "कार्यालय में कार्य" : "On-site Work", icon: <Building className="w-4 h-4" /> },
    { value: "hybrid", label: isRural ? "मिश्रित कार्य" : "Hybrid Work", icon: <Monitor className="w-4 h-4" /> },
    { value: "flexible", label: isRural ? "लचीला" : "Flexible", icon: <Shuffle className="w-4 h-4" /> }
  ];

  const durationOptions = [
    { value: "1-2 months", label: isRural ? "1-2 महीने" : "1-2 months" },
    { value: "3-4 months", label: isRural ? "3-4 महीने" : "3-4 months" },
    { value: "5-6 months", label: isRural ? "5-6 महीने" : "5-6 months" },
    { value: "6+ months", label: isRural ? "6+ महीने" : "6+ months" }
  ];

  const stipendOptions = [
    { value: "unpaid", label: isRural ? "बिना वेतन" : "Unpaid" },
    { value: "1000-5000", label: "₹1,000 - ₹5,000" },
    { value: "5000-10000", label: "₹5,000 - ₹10,000" },
    { value: "10000-20000", label: "₹10,000 - ₹20,000" },
    { value: "20000+", label: "₹20,000+" }
  ];

  const availabilityOptions = [
    { value: "part-time", label: isRural ? "अंशकालिक (20-25 घंटे/सप्ताह)" : "Part-time (20-25 hours/week)" },
    { value: "full-time", label: isRural ? "पूर्णकालिक (40+ घंटे/सप्ताह)" : "Full-time (40+ hours/week)" },
    { value: "flexible", label: isRural ? "लचीले घंटे" : "Flexible hours" }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            {isRural ? 'इंटर्नशिप प्राथमिकताएं' : 'Internship Preferences'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Work Mode */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Monitor className="w-4 h-4" />
              {isRural ? 'पसंदीदा कार्य मोड *' : 'Preferred Work Mode *'}
            </Label>
            <Select 
              value={localPreferences.workMode} 
              onValueChange={(value) => handleInputChange('workMode', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={isRural ? "कार्य मोड चुनें" : "Select work mode"} />
              </SelectTrigger>
              <SelectContent>
                {workModeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      {option.icon}
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Preferred Start Date */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {isRural ? 'पसंदीदा प्रारंभ तिथि *' : 'Preferred Start Date *'}
            </Label>
            <Input
              type="date"
              value={localPreferences.preferredStartDate}
              onChange={(e) => handleInputChange('preferredStartDate', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {isRural ? 'पसंदीदा अवधि *' : 'Preferred Duration *'}
            </Label>
            <Select 
              value={localPreferences.duration} 
              onValueChange={(value) => handleInputChange('duration', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={isRural ? "अवधि चुनें" : "Select duration"} />
              </SelectTrigger>
              <SelectContent>
                {durationOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Availability Hours */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {isRural ? 'उपलब्धता' : 'Availability'}
            </Label>
            <Select 
              value={localPreferences.availabilityHours} 
              onValueChange={(value) => handleInputChange('availabilityHours', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={isRural ? "उपलब्धता चुनें" : "Select availability"} />
              </SelectTrigger>
              <SelectContent>
                {availabilityOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            {isRural ? 'वित्तीय और स्थान प्राथमिकताएं' : 'Financial & Location Preferences'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Stipend Expectation */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              {isRural ? 'वेतन अपेक्षा (प्रति माह)' : 'Stipend Expectation (per month)'}
            </Label>
            <Select 
              value={localPreferences.stipendExpectation} 
              onValueChange={(value) => handleInputChange('stipendExpectation', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={isRural ? "रेंज चुनें" : "Select range"} />
              </SelectTrigger>
              <SelectContent>
                {stipendOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Preferred Location */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {isRural ? 'पसंदीदा स्थान' : 'Preferred Location'}
            </Label>
            <Input
              value={localPreferences.preferredLocation}
              onChange={(e) => handleInputChange('preferredLocation', e.target.value)}
              placeholder={isRural ? "शहर या राज्य दर्ज करें" : "Enter city or state"}
            />
          </div>

          {/* Willing to Relocate */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="relocate"
              checked={localPreferences.willingToRelocate}
              onCheckedChange={(checked) => handleInputChange('willingToRelocate', checked as boolean)}
            />
            <Label htmlFor="relocate" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {isRural ? 'मैं इंटर्नशिप के लिए स्थानांतरित होने को तैयार हूं' : 'I am willing to relocate for the internship'}
            </Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            {isRural ? 'अतिरिक्त आवश्यकताएं' : 'Additional Requirements'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label>
              {isRural ? 'अतिरिक्त आवश्यकताएं/टिप्पणियां' : 'Additional Requirements/Notes'}
            </Label>
            <textarea
              value={localPreferences.additionalRequirements}
              onChange={(e) => handleInputChange('additionalRequirements', e.target.value)}
              placeholder={isRural 
                ? "कोई विशिष्ट आवश्यकताएं, पहुंच की जरूरतें, या अतिरिक्त जानकारी..."
                : "Any specific requirements, accessibility needs, or additional information..."
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px] resize-y"
              rows={4}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InternshipPreferencesComponent;