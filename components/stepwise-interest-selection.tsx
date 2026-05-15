"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { 
  ChevronDown, 
  CheckCircle, 
  AlertTriangle, 
  Lightbulb,
  Code,
  Briefcase,
  Palette,
  HeartPulse,
  Cog,
  Tv,
  ArrowRight,
  X
} from "lucide-react";
import {
  PRIMARY_INTERESTS,
  SubInterest,
  SkillSet,
  getSubInterests,
  getSkillsForInterest,
  getAllSkillsForPrimaryInterest
} from "@/lib/interests-skills-mapping";

interface StepwiseInterestSelectionProps {
  isRural?: boolean;
  onSelectionChange: (selection: {
    primaryInterest: string | null;
    subInterests: string[];
    selectedSkills: {
      softSkills: string[];
      technicalSkills: string[];
      toolsAndPlatforms: string[];
    };
  }) => void;
  initialData?: {
    primaryInterest?: string;
    subInterests?: string[];
    selectedSkills?: {
      softSkills?: string[];
      technicalSkills?: string[];
      toolsAndPlatforms?: string[];
    };
  };
}

const ICON_MAP: Record<string, React.ReactNode> = {
  'code': <Code className="w-5 h-5" />,
  'briefcase': <Briefcase className="w-5 h-5" />,
  'palette': <Palette className="w-5 h-5" />,
  'heart-pulse': <HeartPulse className="w-5 h-5" />,
  'cog': <Cog className="w-5 h-5" />,
  'tv': <Tv className="w-5 h-5" />,
};

export function StepwiseInterestSelection({ 
  isRural = false, 
  onSelectionChange,
  initialData 
}: StepwiseInterestSelectionProps) {
  // Step 1: Primary Interest
  const [primaryInterest, setPrimaryInterest] = useState<string | null>(initialData?.primaryInterest || null);
  const [primaryInterestOpen, setPrimaryInterestOpen] = useState(false);
  
  // Step 2: Sub-interests
  const [selectedSubInterests, setSelectedSubInterests] = useState<string[]>(initialData?.subInterests || []);
  const [subInterestOpen, setSubInterestOpen] = useState(false);
  
  // Step 3: Skills
  const [selectedSkills, setSelectedSkills] = useState({
    softSkills: initialData?.selectedSkills?.softSkills || [],
    technicalSkills: initialData?.selectedSkills?.technicalSkills || [],
    toolsAndPlatforms: initialData?.selectedSkills?.toolsAndPlatforms || []
  });
  const [skillDropdownsOpen, setSkillDropdownsOpen] = useState({
    softSkills: false,
    technicalSkills: false,
    toolsAndPlatforms: false
  });
  
  // Available options
  const [availableSubInterests, setAvailableSubInterests] = useState<SubInterest[]>([]);
  const [availableSkills, setAvailableSkills] = useState<SkillSet>({ softSkills: [], technicalSkills: [], toolsAndPlatforms: [] });

  // Update available sub-interests when primary interest changes
  useEffect(() => {
    if (primaryInterest) {
      const subInterests = getSubInterests(primaryInterest);
      setAvailableSubInterests(subInterests);
      
      // Reset sub-interests if primary interest changed
      if (initialData?.primaryInterest !== primaryInterest) {
        setSelectedSubInterests([]);
      }
    } else {
      setAvailableSubInterests([]);
      setSelectedSubInterests([]);
    }
  }, [primaryInterest, initialData?.primaryInterest]);

  // Update available skills when interests change
  useEffect(() => {
    if (primaryInterest) {
      if (selectedSubInterests.length > 0) {
        // Get skills for selected sub-interests
        const allSkills: SkillSet = { softSkills: [], technicalSkills: [], toolsAndPlatforms: [] };
        
        selectedSubInterests.forEach(subInterest => {
          const skills = getSkillsForInterest(primaryInterest, subInterest);
          allSkills.softSkills.push(...skills.softSkills);
          allSkills.technicalSkills.push(...skills.technicalSkills);
          allSkills.toolsAndPlatforms.push(...skills.toolsAndPlatforms);
        });
        
        // Remove duplicates
        allSkills.softSkills = [...new Set(allSkills.softSkills)];
        allSkills.technicalSkills = [...new Set(allSkills.technicalSkills)];
        allSkills.toolsAndPlatforms = [...new Set(allSkills.toolsAndPlatforms)];
        
        setAvailableSkills(allSkills);
      } else {
        // Get all skills for primary interest
        const allSkills = getAllSkillsForPrimaryInterest(primaryInterest);
        setAvailableSkills(allSkills);
      }
    } else {
      setAvailableSkills({ softSkills: [], technicalSkills: [], toolsAndPlatforms: [] });
    }
  }, [primaryInterest, selectedSubInterests]);

  // Notify parent of changes
  useEffect(() => {
    onSelectionChange({
      primaryInterest,
      subInterests: selectedSubInterests,
      selectedSkills
    });
  }, [primaryInterest, selectedSubInterests, selectedSkills, onSelectionChange]);

  const handlePrimaryInterestSelect = (interestId: string) => {
    setPrimaryInterest(interestId);
    setPrimaryInterestOpen(false);
    // Reset subsequent selections
    setSelectedSubInterests([]);
    setSelectedSkills({ softSkills: [], technicalSkills: [], toolsAndPlatforms: [] });
  };

  const handleSubInterestToggle = (subInterestId: string) => {
    setSelectedSubInterests(prev => 
      prev.includes(subInterestId) 
        ? prev.filter(id => id !== subInterestId)
        : [...prev, subInterestId]
    );
    // Reset skills when sub-interests change
    setSelectedSkills({ softSkills: [], technicalSkills: [], toolsAndPlatforms: [] });
  };

  const handleSkillToggle = (skillType: keyof typeof selectedSkills, skill: string) => {
    setSelectedSkills(prev => ({
      ...prev,
      [skillType]: prev[skillType].includes(skill)
        ? prev[skillType].filter(s => s !== skill)
        : [...prev[skillType], skill]
    }));
  };

  const getPrimaryInterestName = () => {
    if (!primaryInterest) return 'Select your primary interest';
    const interest = PRIMARY_INTERESTS.find(i => i.id === primaryInterest);
    return isRural ? interest?.nameHi : interest?.name;
  };

  const getSubInterestName = (subInterestId: string) => {
    const subInterest = availableSubInterests.find(s => s.id === subInterestId);
    return isRural ? subInterest?.nameHi : subInterest?.name;
  };

  const DropdownButton = ({ 
    isOpen, 
    onClick, 
    children, 
    className = "",
    disabled = false 
  }: { 
    isOpen: boolean; 
    onClick: () => void; 
    children: React.ReactNode; 
    className?: string;
    disabled?: boolean;
  }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex items-center justify-between p-3 border rounded-lg text-left transition-colors ${
        disabled 
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
          : 'bg-white hover:bg-gray-50 border-gray-200'
      } ${className}`}
    >
      <span>{children}</span>
      <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Step 1: Primary Interest */}
      <Card>
        <CardHeader>
          <CardTitle className={`${isRural ? 'text-lg' : 'text-base'} flex items-center gap-2`}>
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center font-bold">1</div>
            {isRural ? 'मुख्य रुचि चुनें' : 'Select Primary Interest'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <DropdownButton
              isOpen={primaryInterestOpen}
              onClick={() => setPrimaryInterestOpen(!primaryInterestOpen)}
            >
              {getPrimaryInterestName()}
            </DropdownButton>
            
            {primaryInterestOpen && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                {PRIMARY_INTERESTS.map((interest) => (
                  <button
                    type="button"
                    key={interest.id}
                    onClick={() => handlePrimaryInterestSelect(interest.id)}
                    className="w-full text-left p-3 hover:bg-gray-50 flex items-center gap-3 border-b border-gray-100 last:border-b-0"
                  >
                    <div className={`p-2 rounded-lg ${interest.color}`}>
                      {ICON_MAP[interest.icon]}
                    </div>
                    <div>
                      <div className="font-medium">{isRural ? interest.nameHi : interest.name}</div>
                      <div className="text-sm text-gray-600">{isRural ? interest.descriptionHi : interest.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {primaryInterest && (
            <div className="flex items-center gap-2 text-green-600 text-sm">
              <CheckCircle className="w-4 h-4" />
              {isRural ? 'मुख्य रुचि चुनी गई' : 'Primary interest selected'}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Step 2: Sub-interests */}
      <Card className={!primaryInterest ? 'opacity-50' : ''}>
        <CardHeader>
          <CardTitle className={`${isRural ? 'text-lg' : 'text-base'} flex items-center gap-2`}>
            <div className={`w-6 h-6 rounded-full text-white text-sm flex items-center justify-center font-bold ${
              primaryInterest ? 'bg-blue-600' : 'bg-gray-400'
            }`}>2</div>
            {isRural ? 'विशिष्ट रुचियां चुनें' : 'Select Sub-interests'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <DropdownButton
              isOpen={subInterestOpen}
              onClick={() => setSubInterestOpen(!subInterestOpen)}
              disabled={!primaryInterest}
            >
              {selectedSubInterests.length === 0 
                ? (isRural ? 'विशिष्ट रुचियां चुनें' : 'Select specific interests')
                : `${selectedSubInterests.length} ${isRural ? 'रुचियां चुनी गईं' : 'interests selected'}`
              }
            </DropdownButton>
            
            {subInterestOpen && availableSubInterests.length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                {availableSubInterests.map((subInterest) => (
                  <button
                    type="button"
                    key={subInterest.id}
                    onClick={() => handleSubInterestToggle(subInterest.id)}
                    className="w-full text-left p-3 hover:bg-gray-50 flex items-center gap-3 border-b border-gray-100 last:border-b-0"
                  >
                    <div className={`w-4 h-4 border rounded ${
                      selectedSubInterests.includes(subInterest.id) 
                        ? 'bg-blue-600 border-blue-600' 
                        : 'border-gray-300'
                    } flex items-center justify-center`}>
                      {selectedSubInterests.includes(subInterest.id) && (
                        <CheckCircle className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{isRural ? subInterest.nameHi : subInterest.name}</div>
                      <div className="text-sm text-gray-600">{isRural ? subInterest.descriptionHi : subInterest.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {selectedSubInterests.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-green-600 text-sm">
                <CheckCircle className="w-4 h-4" />
                {isRural ? `${selectedSubInterests.length} रुचियां चुनी गईं` : `${selectedSubInterests.length} sub-interests selected`}
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedSubInterests.map(subInterestId => (
                  <Badge 
                    key={subInterestId} 
                    className="bg-blue-100 text-blue-700 flex items-center gap-1"
                  >
                    {getSubInterestName(subInterestId)}
                    <button 
                      type="button"
                      onClick={() => handleSubInterestToggle(subInterestId)}
                      className="ml-1 hover:text-blue-900"
                      title={isRural ? 'रुचि हटाएं' : 'Remove interest'}
                      aria-label={isRural ? 'रुचि हटाएं' : 'Remove interest'}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Step 3: Skills Selection */}
      <Card className={!primaryInterest ? 'opacity-50' : ''}>
        <CardHeader>
          <CardTitle className={`${isRural ? 'text-lg' : 'text-base'} flex items-center gap-2`}>
            <div className={`w-6 h-6 rounded-full text-white text-sm flex items-center justify-center font-bold ${
              primaryInterest ? 'bg-blue-600' : 'bg-gray-400'
            }`}>3</div>
            {isRural ? 'कौशल चुनें' : 'Select Skills'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Soft Skills */}
          <div className="space-y-3">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-purple-600" />
              {isRural ? 'व्यक्तित्व कौशल (Soft Skills)' : 'Soft Skills'}
            </Label>
            <div className="relative">
              <DropdownButton
                isOpen={skillDropdownsOpen.softSkills}
                onClick={() => setSkillDropdownsOpen(prev => ({ ...prev, softSkills: !prev.softSkills }))}
                disabled={!primaryInterest || availableSkills.softSkills.length === 0}
                className="text-sm"
              >
                {selectedSkills.softSkills.length === 0 
                  ? (isRural ? 'व्यक्तित्व कौशल चुनें' : 'Select soft skills')
                  : `${selectedSkills.softSkills.length} ${isRural ? 'कौशल चुने गए' : 'skills selected'}`
                }
              </DropdownButton>
              
              {skillDropdownsOpen.softSkills && availableSkills.softSkills.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-auto">
                  {availableSkills.softSkills.map((skill) => (
                    <button
                      type="button"
                      key={skill}
                      onClick={() => handleSkillToggle('softSkills', skill)}
                      className="w-full text-left p-2 hover:bg-gray-50 flex items-center gap-3 border-b border-gray-100 last:border-b-0 text-sm"
                    >
                      <div className={`w-3 h-3 border rounded ${
                        selectedSkills.softSkills.includes(skill) 
                          ? 'bg-purple-600 border-purple-600' 
                          : 'border-gray-300'
                      }`} />
                      {skill}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {selectedSkills.softSkills.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {selectedSkills.softSkills.map(skill => (
                  <Badge key={skill} className="bg-purple-100 text-purple-700 text-xs flex items-center gap-1">
                    {skill}
                    <button 
                      type="button"
                      onClick={() => handleSkillToggle('softSkills', skill)}
                      title={isRural ? 'कौशल हटाएं' : 'Remove skill'}
                      aria-label={isRural ? 'कौशल हटाएं' : 'Remove skill'}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Technical Skills */}
          <div className="space-y-3">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Code className="w-4 h-4 text-blue-600" />
              {isRural ? 'तकनीकी कौशल (Technical Skills)' : 'Technical Skills'}
            </Label>
            <div className="relative">
              <DropdownButton
                isOpen={skillDropdownsOpen.technicalSkills}
                onClick={() => setSkillDropdownsOpen(prev => ({ ...prev, technicalSkills: !prev.technicalSkills }))}
                disabled={!primaryInterest || availableSkills.technicalSkills.length === 0}
                className="text-sm"
              >
                {selectedSkills.technicalSkills.length === 0 
                  ? (isRural ? 'तकनीकी कौशल चुनें' : 'Select technical skills')
                  : `${selectedSkills.technicalSkills.length} ${isRural ? 'कौशल चुने गए' : 'skills selected'}`
                }
              </DropdownButton>
              
              {skillDropdownsOpen.technicalSkills && availableSkills.technicalSkills.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-auto">
                  {availableSkills.technicalSkills.map((skill) => (
                    <button
                      type="button"
                      key={skill}
                      onClick={() => handleSkillToggle('technicalSkills', skill)}
                      className="w-full text-left p-2 hover:bg-gray-50 flex items-center gap-3 border-b border-gray-100 last:border-b-0 text-sm"
                    >
                      <div className={`w-3 h-3 border rounded ${
                        selectedSkills.technicalSkills.includes(skill) 
                          ? 'bg-blue-600 border-blue-600' 
                          : 'border-gray-300'
                      }`} />
                      {skill}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {selectedSkills.technicalSkills.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {selectedSkills.technicalSkills.map(skill => (
                  <Badge key={skill} className="bg-blue-100 text-blue-700 text-xs flex items-center gap-1">
                    {skill}
                    <button 
                      type="button"
                      onClick={() => handleSkillToggle('technicalSkills', skill)}
                      title={isRural ? 'कौशल हटाएं' : 'Remove skill'}
                      aria-label={isRural ? 'कौशल हटाएं' : 'Remove skill'}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Tools & Platforms */}
          <div className="space-y-3">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Cog className="w-4 h-4 text-green-600" />
              {isRural ? 'टूल्स और प्लेटफॉर्म (Tools & Platforms)' : 'Tools & Platforms'}
            </Label>
            <div className="relative">
              <DropdownButton
                isOpen={skillDropdownsOpen.toolsAndPlatforms}
                onClick={() => setSkillDropdownsOpen(prev => ({ ...prev, toolsAndPlatforms: !prev.toolsAndPlatforms }))}
                disabled={!primaryInterest || availableSkills.toolsAndPlatforms.length === 0}
                className="text-sm"
              >
                {selectedSkills.toolsAndPlatforms.length === 0 
                  ? (isRural ? 'टूल्स और प्लेटफॉर्म चुनें' : 'Select tools & platforms')
                  : `${selectedSkills.toolsAndPlatforms.length} ${isRural ? 'टूल्स चुने गए' : 'tools selected'}`
                }
              </DropdownButton>
              
              {skillDropdownsOpen.toolsAndPlatforms && availableSkills.toolsAndPlatforms.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-auto">
                  {availableSkills.toolsAndPlatforms.map((tool) => (
                    <button
                      type="button"
                      key={tool}
                      onClick={() => handleSkillToggle('toolsAndPlatforms', tool)}
                      className="w-full text-left p-2 hover:bg-gray-50 flex items-center gap-3 border-b border-gray-100 last:border-b-0 text-sm"
                    >
                      <div className={`w-3 h-3 border rounded ${
                        selectedSkills.toolsAndPlatforms.includes(tool) 
                          ? 'bg-green-600 border-green-600' 
                          : 'border-gray-300'
                      }`} />
                      {tool}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {selectedSkills.toolsAndPlatforms.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {selectedSkills.toolsAndPlatforms.map(tool => (
                  <Badge key={tool} className="bg-green-100 text-green-700 text-xs flex items-center gap-1">
                    {tool}
                    <button 
                      type="button"
                      onClick={() => handleSkillToggle('toolsAndPlatforms', tool)}
                      title={isRural ? 'टूल हटाएं' : 'Remove tool'}
                      aria-label={isRural ? 'टूल हटाएं' : 'Remove tool'}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Validation Messages */}
      {!primaryInterest && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-700 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            {isRural ? 'कृपया अपनी मुख्य रुचि चुनें' : 'Please select your primary interest'}
          </p>
        </div>
      )}
      
      {primaryInterest && selectedSubInterests.length === 0 && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700 flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            {isRural ? 'बेहतर सुझावों के लिए विशिष्ट रुचियां चुनें' : 'Select specific interests for better recommendations'}
          </p>
        </div>
      )}

      {primaryInterest && (
        selectedSkills.softSkills.length + selectedSkills.technicalSkills.length + selectedSkills.toolsAndPlatforms.length
      ) >= 5 && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-700 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            {isRural ? 'बढ़िया! आपकी प्रोफ़ाइल तैयार है' : 'Great! Your profile looks complete'}
          </p>
        </div>
      )}
    </div>
  );
}