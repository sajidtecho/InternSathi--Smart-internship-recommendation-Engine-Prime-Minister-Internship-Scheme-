"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Brain, 
  Star, 
  Plus, 
  X, 
  Code, 
  Languages, 
  Palette, 
  Calculator,
  MessageCircle,
  Users,
  Lightbulb,
  Target,
  BookOpen,
  Wrench,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: 'technical' | 'language' | 'soft' | 'academic';
}

interface SkillCategory {
  id: string;
  name: string;
  nameHi: string;
  icon: React.ReactNode;
  color: string;
  predefinedSkills: string[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'technical',
    name: 'Technical Skills',
    nameHi: 'तकनीकी कौशल',
    icon: <Code className="w-5 h-5" />,
    color: 'bg-blue-100 text-blue-700',
    predefinedSkills: [
      'Microsoft Office', 'Excel', 'PowerPoint', 'Word', 'Computer Basics',
      'Internet Research', 'Email Management', 'Data Entry', 'Typing',
      'Basic Programming', 'HTML/CSS', 'Photoshop', 'Video Editing'
    ]
  },
  {
    id: 'language',
    name: 'Language Skills',
    nameHi: 'भाषा कौशल',
    icon: <Languages className="w-5 h-5" />,
    color: 'bg-green-100 text-green-700',
    predefinedSkills: [
      'Hindi', 'English', 'Tamil', 'Telugu', 'Bengali', 'Marathi', 'Gujarati',
      'Kannada', 'Malayalam', 'Punjabi', 'Urdu', 'Assamese', 'Odia'
    ]
  },
  {
    id: 'soft',
    name: 'Soft Skills',
    nameHi: 'व्यक्तित्व कौशल',
    icon: <Users className="w-5 h-5" />,
    color: 'bg-purple-100 text-purple-700',
    predefinedSkills: [
      'Communication', 'Teamwork', 'Leadership', 'Problem Solving',
      'Time Management', 'Creativity', 'Adaptability', 'Critical Thinking',
      'Customer Service', 'Presentation Skills', 'Networking'
    ]
  },
  {
    id: 'academic',
    name: 'Academic Skills',
    nameHi: 'शैक्षणिक कौशल',
    icon: <BookOpen className="w-5 h-5" />,
    color: 'bg-orange-100 text-orange-700',
    predefinedSkills: [
      'Research', 'Writing', 'Mathematics', 'Science', 'Analysis',
      'Report Writing', 'Data Collection', 'Study Skills', 'Note Taking',
      'Project Management', 'Documentation'
    ]
  }
];

const SKILL_LEVELS = [
  { id: 'beginner', name: 'Beginner', nameHi: 'शुरुआती', color: 'bg-yellow-100 text-yellow-700', stars: 1 },
  { id: 'intermediate', name: 'Intermediate', nameHi: 'मध्यम', color: 'bg-blue-100 text-blue-700', stars: 2 },
  { id: 'advanced', name: 'Advanced', nameHi: 'उन्नत', color: 'bg-green-100 text-green-700', stars: 3 }
];

interface SkillsAssessmentProps {
  skills: Skill[];
  onSkillsChange: (skills: Skill[]) => void;
  isRural?: boolean;
}

export function SkillsAssessment({ skills, onSkillsChange, isRural = false }: SkillsAssessmentProps) {
  const [activeCategory, setActiveCategory] = useState<string>('technical');
  const [customSkill, setCustomSkill] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const activeSkillCategory = SKILL_CATEGORIES.find(cat => cat.id === activeCategory);

  const addSkill = (skillName: string, category: string) => {
    const newSkill: Skill = {
      id: `${category}-${skillName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      name: skillName,
      level: 'beginner',
      category: category as Skill['category']
    };
    onSkillsChange([...skills, newSkill]);
  };

  const removeSkill = (skillId: string) => {
    onSkillsChange(skills.filter(skill => skill.id !== skillId));
  };

  const updateSkillLevel = (skillId: string, level: Skill['level']) => {
    onSkillsChange(skills.map(skill => 
      skill.id === skillId ? { ...skill, level } : skill
    ));
  };

  const addCustomSkill = () => {
    if (customSkill.trim()) {
      addSkill(customSkill.trim(), activeCategory);
      setCustomSkill('');
      setShowCustomInput(false);
    }
  };

  const getSkillsByCategory = (category: string) => {
    return skills.filter(skill => skill.category === category);
  };

  const renderStars = (level: Skill['level']) => {
    const levelInfo = SKILL_LEVELS.find(l => l.id === level);
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3].map(star => (
          <Star 
            key={star} 
            className={`w-3 h-3 ${star <= (levelInfo?.stars || 1) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-xl">
          <Brain className="w-6 h-6 text-purple-600" />
          <div>
            <span className="text-gray-800">
              {isRural ? 'अपने कौशल बताएं' : 'Skills Assessment'}
            </span>
            {isRural && (
              <p className="text-sm font-normal text-gray-600 mt-1">
                Skills Assessment (आप क्या जानते हैं?)
              </p>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Skills Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SKILL_CATEGORIES.map(category => {
            const categorySkills = getSkillsByCategory(category.id);
            return (
              <div key={category.id} className="text-center p-3 bg-white rounded-lg border">
                <div className={`w-8 h-8 rounded-full ${category.color} mx-auto mb-2 flex items-center justify-center`}>
                  {category.icon}
                </div>
                <div className="text-2xl font-bold text-gray-800">{categorySkills.length}</div>
                <div className="text-xs text-gray-600">
                  {isRural ? category.nameHi : category.name}
                </div>
              </div>
            );
          })}
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {SKILL_CATEGORIES.map(category => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(category.id)}
              className={`
                ${activeCategory === category.id ? 
                  'bg-purple-600 text-white' : 
                  'bg-white border-purple-300 text-purple-600 hover:bg-purple-50'
                }
              `}
            >
              {category.icon}
              <span className="ml-2">
                {isRural ? category.nameHi : category.name}
              </span>
              <Badge variant="secondary" className="ml-2 bg-white/20">
                {getSkillsByCategory(category.id).length}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Active Category Skills */}
        {activeSkillCategory && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-2">
              {activeSkillCategory.icon}
              {isRural ? activeSkillCategory.nameHi : activeSkillCategory.name}
            </h3>

            {/* My Skills in this category */}
            <div className="space-y-3">
              {getSkillsByCategory(activeCategory).map(skill => (
                <div key={skill.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="font-medium text-gray-800">{skill.name}</span>
                    {renderStars(skill.level)}
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Level Selector */}
                    <div className="flex gap-1">
                      {SKILL_LEVELS.map(level => (
                        <Button
                          key={level.id}
                          size="sm"
                          variant={skill.level === level.id ? 'default' : 'outline'}
                          onClick={() => updateSkillLevel(skill.id, level.id as Skill['level'])}
                          className={`
                            text-xs px-2 py-1 h-7
                            ${skill.level === level.id ? 
                              'bg-purple-600 text-white' : 
                              'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                            }
                          `}
                        >
                          {isRural ? level.nameHi : level.name}
                        </Button>
                      ))}
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeSkill(skill.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 w-8 h-8 p-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Predefined Skills */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-700">
                {isRural ? 'सुझाए गए कौशल:' : 'Suggested Skills:'}
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeSkillCategory.predefinedSkills
                  .filter(skillName => !skills.some(skill => skill.name.toLowerCase() === skillName.toLowerCase()))
                  .map(skillName => (
                    <Button
                      key={skillName}
                      variant="outline"
                      size="sm"
                      onClick={() => addSkill(skillName, activeCategory)}
                      className="bg-white border-gray-300 text-gray-700 hover:bg-purple-50 hover:border-purple-300"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      {skillName}
                    </Button>
                  ))
                }
              </div>
            </div>

            {/* Custom Skill Input */}
            <div className="space-y-3">
              {!showCustomInput ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCustomInput(true)}
                  className="bg-white border-dashed border-purple-300 text-purple-600 hover:bg-purple-50"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {isRural ? 'अपना कौशल जोड़ें' : 'Add Custom Skill'}
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Input
                    placeholder={isRural ? "अपना कौशल लिखें..." : "Enter your skill..."}
                    value={customSkill}
                    onChange={(e) => setCustomSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addCustomSkill()}
                    className="flex-1"
                  />
                  <Button 
                    size="sm" 
                    onClick={addCustomSkill}
                    disabled={!customSkill.trim()}
                    className="bg-purple-600 text-white hover:bg-purple-700"
                  >
                    {isRural ? 'जोड़ें' : 'Add'}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      setShowCustomInput(false);
                      setCustomSkill('');
                    }}
                  >
                    {isRural ? 'रद्द करें' : 'Cancel'}
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Progress Indicator */}
        <div className="p-4 bg-white rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              {isRural ? 'प्रोफ़ाइल पूर्णता:' : 'Profile Completeness:'}
            </span>
            <span className="text-sm text-gray-600">
              {skills.length}/10 {isRural ? 'कौशल' : 'skills'}
            </span>
          </div>
          <Progress 
            value={Math.min((skills.length / 10) * 100, 100)} 
            className="h-2"
          />
          {skills.length < 3 && (
            <p className="text-xs text-yellow-600 mt-2 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              {isRural ? 
                'बेहतर सुझाव के लिए कम से कम 3 कौशल जोड़ें' : 
                'Add at least 3 skills for better recommendations'
              }
            </p>
          )}
          {skills.length >= 5 && (
            <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              {isRural ? 
                'बढ़िया! आपकी प्रोफ़ाइल अच्छी है' : 
                'Great! Your profile looks good'
              }
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}