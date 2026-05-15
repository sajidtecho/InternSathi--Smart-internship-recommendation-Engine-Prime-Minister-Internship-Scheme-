"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  Building2, 
  Code, 
  Heart, 
  Briefcase, 
  GraduationCap, 
  Factory, 
  Truck, 
  Stethoscope,
  Zap,
  Sprout,
  ShoppingCart,
  CreditCard,
  Globe,
  Camera,
  Wrench,
  Car,
  Plane,
  Home,
  Users,
  Shield,
  AlertTriangle,
  Lightbulb
} from "lucide-react";

interface SectorInterest {
  id: string;
  name: string;
  nameHi: string;
  icon: React.ReactNode;
  description: string;
  descriptionHi: string;
  color: string;
}

const SECTOR_OPTIONS: SectorInterest[] = [
  {
    id: 'technology',
    name: 'Technology & IT',
    nameHi: 'प्रौद्योगिकी और आईटी',
    icon: <Code className="w-6 h-6" />,
    description: 'Software development, web design, data analysis',
    descriptionHi: 'सॉफ्टवेयर विकास, वेब डिज़ाइन, डेटा विश्लेषण',
    color: 'bg-blue-100 text-blue-700 border-blue-200'
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Medical',
    nameHi: 'स्वास्थ्य सेवा और चिकित्सा',
    icon: <Stethoscope className="w-6 h-6" />,
    description: 'Medical assistance, health research, pharmacy',
    descriptionHi: 'चिकित्सा सहायता, स्वास्थ्य अनुसंधान, फार्मेसी',
    color: 'bg-red-100 text-red-700 border-red-200'
  },
  {
    id: 'education',
    name: 'Education & Training',
    nameHi: 'शिक्षा और प्रशिक्षण',
    icon: <GraduationCap className="w-6 h-6" />,
    description: 'Teaching assistance, curriculum development, e-learning',
    descriptionHi: 'शिक्षण सहायता, पाठ्यक्रम विकास, ई-लर्निंग',
    color: 'bg-green-100 text-green-700 border-green-200'
  },
  {
    id: 'business',
    name: 'Business & Finance',
    nameHi: 'व्यापार और वित्त',
    icon: <Briefcase className="w-6 h-6" />,
    description: 'Business analysis, accounting, market research',
    descriptionHi: 'व्यापार विश्लेषण, लेखांकन, बाजार अनुसंधान',
    color: 'bg-purple-100 text-purple-700 border-purple-200'
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing & Engineering',
    nameHi: 'विनिर्माण और इंजीनियरिंग',
    icon: <Factory className="w-6 h-6" />,
    description: 'Production, quality control, process improvement',
    descriptionHi: 'उत्पादन, गुणवत्ता नियंत्रण, प्रक्रिया सुधार',
    color: 'bg-orange-100 text-orange-700 border-orange-200'
  },
  {
    id: 'agriculture',
    name: 'Agriculture & Food',
    nameHi: 'कृषि और खाद्य',
    icon: <Sprout className="w-6 h-6" />,
    description: 'Farming technology, food processing, rural development',
    descriptionHi: 'कृषि प्रौद्योगिकी, खाद्य प्रसंस्करण, ग्रामीण विकास',
    color: 'bg-green-100 text-green-700 border-green-200'
  },
  {
    id: 'retail',
    name: 'Retail & E-commerce',
    nameHi: 'खुदरा और ई-कॉमर्स',
    icon: <ShoppingCart className="w-6 h-6" />,
    description: 'Sales support, customer service, digital marketing',
    descriptionHi: 'बिक्री सहायता, ग्राहक सेवा, डिजिटल मार्केटिंग',
    color: 'bg-pink-100 text-pink-700 border-pink-200'
  },
  {
    id: 'banking',
    name: 'Banking & Insurance',
    nameHi: 'बैंकिंग और बीमा',
    icon: <CreditCard className="w-6 h-6" />,
    description: 'Financial services, risk assessment, customer relations',
    descriptionHi: 'वित्तीय सेवाएं, जोखिम मूल्यांकन, ग्राहक संबंध',
    color: 'bg-indigo-100 text-indigo-700 border-indigo-200'
  },
  {
    id: 'media',
    name: 'Media & Communication',
    nameHi: 'मीडिया और संचार',
    icon: <Camera className="w-6 h-6" />,
    description: 'Content creation, journalism, public relations',
    descriptionHi: 'सामग्री निर्माण, पत्रकारिता, जनसंपर्क',
    color: 'bg-yellow-100 text-yellow-700 border-yellow-200'
  },
  {
    id: 'energy',
    name: 'Energy & Utilities',
    nameHi: 'ऊर्जा और उपयोगिताएं',
    icon: <Zap className="w-6 h-6" />,
    description: 'Power generation, renewable energy, utilities management',
    descriptionHi: 'विद्युत उत्पादन, नवीकरणीय ऊर्जा, उपयोगिता प्रबंधन',
    color: 'bg-amber-100 text-amber-700 border-amber-200'
  },
  {
    id: 'logistics',
    name: 'Logistics & Transportation',
    nameHi: 'रसद और परिवहन',
    icon: <Truck className="w-6 h-6" />,
    description: 'Supply chain, delivery services, transportation planning',
    descriptionHi: 'आपूर्ति श्रृंखला, डिलीवरी सेवाएं, परिवहन योजना',
    color: 'bg-gray-100 text-gray-700 border-gray-200'
  },
  {
    id: 'construction',
    name: 'Construction & Real Estate',
    nameHi: 'निर्माण और रियल एस्टेट',
    icon: <Home className="w-6 h-6" />,
    description: 'Building projects, architecture, property management',
    descriptionHi: 'निर्माण परियोजनाएं, वास्तुकला, संपत्ति प्रबंधन',
    color: 'bg-stone-100 text-stone-700 border-stone-200'
  },
  {
    id: 'government',
    name: 'Government & Public Service',
    nameHi: 'सरकार और लोक सेवा',
    icon: <Shield className="w-6 h-6" />,
    description: 'Public administration, policy research, citizen services',
    descriptionHi: 'लोक प्रशासन, नीति अनुसंधान, नागरिक सेवाएं',
    color: 'bg-blue-100 text-blue-700 border-blue-200'
  }
];

interface SectorInterestsProps {
  selectedSectors: string[];
  onSectorChange: (sectors: string[]) => void;
  isRural?: boolean;
}

export function SectorInterests({ selectedSectors, onSectorChange, isRural = false }: SectorInterestsProps) {
  const [showAll, setShowAll] = useState(false);
  
  const displayedSectors = showAll ? SECTOR_OPTIONS : SECTOR_OPTIONS.slice(0, 6);

  const handleSectorToggle = (sectorId: string) => {
    if (selectedSectors.includes(sectorId)) {
      onSectorChange(selectedSectors.filter(id => id !== sectorId));
    } else {
      onSectorChange([...selectedSectors, sectorId]);
    }
  };

  return (
    <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-xl">
          <Building2 className="w-6 h-6 text-blue-600" />
          <div>
            <span className="text-gray-800">
              {isRural ? 'रुचि के क्षेत्र चुनें' : 'Select Areas of Interest'}
            </span>
            {isRural && (
              <p className="text-sm font-normal text-gray-600 mt-1">
                Select Areas of Interest (आप किन क्षेत्रों में काम करना चाहते हैं?)
              </p>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Selected Count */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">
              {isRural ? 'चुने गए:' : 'Selected:'}
            </span>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              {selectedSectors.length}/5 {isRural ? 'अधिकतम' : 'max'}
            </Badge>
          </div>
          {selectedSectors.length >= 3 && (
            <Badge variant="outline" className="border-green-500 text-green-700">
              ✓ {isRural ? 'पर्याप्त चयन' : 'Good selection'}
            </Badge>
          )}
        </div>

        {/* Sector Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayedSectors.map((sector) => {
            const isSelected = selectedSectors.includes(sector.id);
            const isDisabled = !isSelected && selectedSectors.length >= 5;
            
            return (
              <div
                key={sector.id}
                className={`
                  relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                  ${isSelected ? 
                    'border-blue-500 bg-blue-50 shadow-md transform scale-105' : 
                    'border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm'
                  }
                  ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
                `}
                onClick={() => !isDisabled && handleSectorToggle(sector.id)}
              >
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={isSelected}
                    disabled={isDisabled}
                    className="w-5 h-5 mt-1"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`p-2 rounded-lg ${sector.color}`}>
                        {sector.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm">
                          {isRural ? sector.nameHi : sector.name}
                        </h3>
                        {isRural && (
                          <p className="text-xs text-gray-600">{sector.name}</p>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {isRural ? sector.descriptionHi : sector.description}
                    </p>
                  </div>
                </div>
                
                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Show More/Less Button */}
        {SECTOR_OPTIONS.length > 6 && (
          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="bg-white border-blue-300 text-blue-600 hover:bg-blue-50"
            >
              {showAll ? (
                <>
                  <span>{isRural ? 'कम दिखाएं' : 'Show Less'}</span>
                  <div className="w-4 h-4 ml-2">↑</div>
                </>
              ) : (
                <>
                  <span>{isRural ? 'और दिखाएं' : 'Show More'}</span>
                  <div className="w-4 h-4 ml-2">↓</div>
                </>
              )}
            </Button>
          </div>
        )}

        {/* Validation Message */}
        {selectedSectors.length < 1 && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-700 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              {isRural ? 
                'कृपया कम से कम 1 क्षेत्र चुनें' : 
                'Please select at least 1 area of interest'
              }
            </p>
          </div>
        )}
        
        {selectedSectors.length >= 1 && selectedSectors.length < 3 && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700 flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              {isRural ? 
                'बेहतर सुझाव के लिए 3+ क्षेत्र चुनें' : 
                'Select 3+ areas for better recommendations'
              }
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}