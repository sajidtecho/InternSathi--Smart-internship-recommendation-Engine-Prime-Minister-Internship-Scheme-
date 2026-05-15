"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { GovernmentHeader } from "@/components/government-header"
import { GovernmentFooter } from "@/components/government-footer"
import PMISChatbot from "@/components/pmis-chatbot"
import GovernmentVoiceAssistant from "@/components/government-voice-assistant"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, Building, Award, Shield, GraduationCap, IndianRupee, Bot, Target, Cpu, CheckCircle, CheckCircle2, FileText, Search, UserPlus, MousePointer, Mic, FormInput } from "lucide-react"
import Image from "next/image"
import { useTranslationContext } from "@/lib/translation-provider"
import CompanyLogo from "@/components/company-logo"

export default function HomePage() {
  const { currentLang, setCurrentLang, t, isLoading } = useTranslationContext()

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#FF9933] text-white px-4 py-2 rounded z-50">Skip to main content</a>
      <GovernmentHeader currentLang={currentLang} onLanguageChange={setCurrentLang} />
      
      <div className="px-2 md:px-4 lg:px-6">
        {/* Notification Banner */}
        <div className="bg-blue-600 text-white py-2 px-4 text-center text-sm">
          <div className="max-w-7xl mx-auto">
            <span className="font-medium">{(t as any).latestUpdate || "Latest Update:"}</span> {(t as any).notificationText || "Internship Screening & Selection Ongoing! Check your email and SMS regularly. Confirm joining the Internship through your offer letter."}
          </div>
        </div>

      {/* Main Hero Section - InternSetu */}
      <section
        id="main-content"
        className="bg-texture-hero border-b-4 border-orange-400 rounded-bl-[3rem] rounded-br-[3rem] relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative min-h-[400px] md:min-h-[500px]">
            <div className="grid md:grid-cols-2 gap-8 items-center h-full">
              <div className="space-y-6 py-16 z-10 relative">
                <p className="text-purple-300 text-lg">{(t as any).acceptedOffer || "Accepted the Offer"}</p>
                <h1 className="text-5xl lg:text-6xl font-bold text-white text-balance">{(t as any).butNotJoined || "But not Joined yet?"}</h1>
                <div className="inline-block bg-orange-500 text-white px-4 py-2 rounded-lg">
                  <p className="font-semibold">{(t as any).dontWorryWindow || "Don't worry-the window is still open!"}</p>
                </div>
                <p className="text-purple-200 max-w-md leading-relaxed">
                  {(t as any).reachOutText || "Reach out to the company that made you the offer. contact details are in your offer letter."}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3"
                  >
                    {(t as any).reachOutNow || "Reach Out Now"}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
              <div className="hidden md:flex justify-end items-end h-full">
                <figure className="relative flex flex-col items-center">
                  <Image
                    src="/images/pm-hero.png"
                    alt="PM Narendra Modi"
                    width={400}
                    height={500}
                    className="object-contain object-bottom max-h-[500px] w-auto block lg:translate-y-1 xl:translate-y-2 2xl:translate-y-3"
                  />
                  <figcaption className="absolute bottom-0 left-1/2 -translate-x-1/2 inline-flex items-center justify-center px-3 py-1 rounded-md border border-orange-500 bg-white text-orange-700 text-sm font-semibold shadow-sm">
                    Hon’ble PM Narendra Modi
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility & Benefits Section */}
      <section 
        className="py-16 my-6 rounded-tl-[3rem] rounded-br-[3rem] shadow-lg relative bg-texture-light"
        id="eligibility"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Eligibility Section */}
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {(t as any).areYouEligible || "Are you"} <span className="text-orange-500">{(t as any).eligible || "Eligible"} ?</span>
                </h2>
                <p className="text-lg text-gray-600">
                  {(t as any).checkCriteria || "Check all criteria below to confirm your eligibility"}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {/* Age Criteria */}
                <Card className="relative aspect-square hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-orange-100 to-orange-200 border-2 border-orange-300 overflow-hidden">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    <img src="/icons/21 +.png" alt="Age 21+" className="w-20 h-20 object-contain mb-1" loading="lazy" />
                    <h3 className="font-bold text-orange-600 text-lg mb-0.5">{(t as any).age || "Age"}</h3>
                    <p className="text-sm text-gray-800 text-center">{(t as any).ageRange || "21-24 Years"}</p>
                  </div>
                </Card>
                {/* Job Status */}
                <Card className="relative aspect-square hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-100 to-blue-200 border-2 border-blue-300 overflow-hidden">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    <img src="/icons/briefcase.png" alt="Job Status" className="w-20 h-20 object-contain mb-1" loading="lazy" />
                    <h3 className="font-bold text-blue-600 text-lg mb-0.5">{(t as any).jobStatus || "Job Status"}</h3>
                    <p className="text-sm text-gray-800 text-center">{(t as any).notEmployedFullTime || "Not Employed Full Time"}</p>
                  </div>
                </Card>
                {/* Education */}
                <Card className="relative aspect-square hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-100 to-green-200 border-2 border-green-300 overflow-hidden">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    <img src="/icons/education.png" alt="Education" className="w-20 h-20 object-contain mb-1" loading="lazy" />
                    <h3 className="font-bold text-green-600 text-lg mb-0.5">{(t as any).education || "Education"}</h3>
                    <p className="text-sm text-gray-800 text-center">{(t as any).notEnrolledFullTime || "Not Enrolled Full Time"}</p>
                  </div>
                </Card>
                {/* Family Income */}
                <Card className="relative aspect-square hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-100 to-purple-200 border-2 border-purple-300 overflow-hidden">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    <img src="/icons/family.png" alt="Family" className="w-20 h-20 object-contain mb-1" loading="lazy" />
                    <h3 className="font-bold text-purple-600 text-lg mb-0.5 text-center">
                      {(t as any).familyIncome || "Family (Self/ Spouse / Parents)"}
                    </h3>
                    <div className="text-sm text-gray-800 text-center">
                      <p>{(t as any).incomeCondition1 || "• No one is Earning more than ₹8 Lakhs PA"}</p>
                      <p>{(t as any).incomeCondition2 || "• No Member has a GOVT. Job"}</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Core Benefits Section */}
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {(t as any).coreBenefitsTitle || "Core Benefits"} <span className="text-orange-500">{(t as any).coreBenefitsSubtitle || "for PM Internship Scheme"}</span>
                </h2>
                <p className="text-lg text-gray-600">
                  {(t as any).comprehensivePackage || "Comprehensive package for your career development"}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {/* Professional Experience */}
                <Card className="relative aspect-square hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-100 to-blue-200 border-2 border-blue-300 overflow-hidden">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    <img src="/icons/briefcase.png" alt="Professional Experience" className="w-20 h-20 object-contain mb-1" loading="lazy" />
                    <h3 className="font-bold text-blue-600 text-lg text-center">
                      {(t as any).professionalExperience || "12 months real-life experience in India's top companies"}
                    </h3>
                  </div>
                </Card>
                {/* Monthly Stipend */}
                <Card className="relative aspect-square hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-100 to-green-200 border-2 border-green-300 overflow-hidden">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    <img src="/icons/rupee.png" alt="Monthly Stipend" className="w-20 h-20 object-contain mb-1" loading="lazy" />
                    <h3 className="font-bold text-green-600 text-lg text-center">
                      {(t as any).monthlyAssistance || "Monthly assistance of ₹4500 by Government of India and ₹500 by Industry"}
                    </h3>
                  </div>
                </Card>
                {/* One Time Grant */}
                <Card className="relative aspect-square hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-yellow-100 to-yellow-200 border-2 border-yellow-300 overflow-hidden">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    <img src="/icons/wallet.png" alt="One Time Grant" className="w-20 h-20 object-contain mb-1" loading="lazy" />
                    <h3 className="font-bold text-yellow-600 text-lg text-center">
                      {(t as any).oneTimeGrantAmount || "One-time Grant of ₹6000 for incidentals"}
                    </h3>
                  </div>
                </Card>
                {/* Sector Selection */}
                <Card className="relative aspect-square hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-indigo-100 to-indigo-200 border-2 border-indigo-300 overflow-hidden">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    <img src="/icons/various sector.png" alt="Sector Selection" className="w-20 h-20 object-contain mb-1" loading="lazy" />
                    <h3 className="font-bold text-indigo-600 text-lg text-center">
                      {(t as any).sectorVariety || "Select from Various Sectors and from top Companies of India"}
                    </h3>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            {/* Register Now button removed */}
          </div>
        </div>
      </section>

      {/* AI Recommendation Options Section - Simple Government Style */}
      <section 
        className="py-16 bg-gray-50" 
        id="ai-matcher"
      >
        <div className="max-w-6xl mx-auto px-4">
          {/* Simple Section Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img src="/icons/Logo of PM internship.jpg" alt="PM Internship" className="w-12 h-12 object-contain rounded" />
              <h2 className="text-3xl font-bold text-gray-800">
                {t.getPersonalizedRecommendations}
              </h2>
            </div>
            
            {/* Simple tricolor line */}
            <div className="flex items-center justify-center gap-1 mb-6">
              <div className="h-1 w-16 bg-orange-500"></div>
              <div className="h-1 w-16 bg-white border border-gray-300"></div>
              <div className="h-1 w-16 bg-green-600"></div>
            </div>
            
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              {t.choosePreferredMethod}
            </p>
          </div>

          {/* Simple Two Options Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* AI Voice Assistant Option */}
            <Card className="bg-white border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                {/* Simple icon */}
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mic className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {t.aiVoiceAssistant}
                </h3>
                
                <p className="text-gray-600 mb-6 text-base leading-relaxed">
                  {t.voiceAssistantDescription}
                </p>
                
                {/* Simple badges */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                    {t.quickBadge}
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                    {t.smartBadge}
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                    {t.personalBadge}
                  </Badge>
                </div>
                
                {/* Simple button - navigate to dedicated AI page */}
                <Link href="/ai" className="w-full">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-base font-semibold">
                    <Mic className="w-5 h-5 mr-2" />
                    {t.talkWithAI}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Form Input Option */}
            <Card className="bg-white border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                {/* Simple icon */}
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FormInput className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {t.fillForm}
                </h3>
                
                <p className="text-gray-600 mb-6 text-base leading-relaxed">
                  {t.fillFormDescription}
                </p>
                
                {/* Simple badges */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                    {t.detailedBadge}
                  </Badge>
                  <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                    {t.accurateBadge}
                  </Badge>
                  <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                    {t.comprehensiveBadge}
                  </Badge>
                </div>
                
                {/* Simple button */}
                <Link href="/registration" className="w-full">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-base font-semibold">
                    <FormInput className="w-5 h-5 mr-2" />
                    {t.fillForm}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Simple additional info */}
          <div className="text-center mt-10">
            <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Government of India</span>
              </div>
              <p className="text-gray-600 text-sm">
                {t.bothOptionsInfo}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Opportunities in Various Sectors */}
      <section className="py-16 bg-white my-6 rounded-tr-[3rem] rounded-bl-[3rem] shadow-lg" id="opportunities">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{(t as any).exploreOpportunities || "Explore Opportunities in various Sectors"}</h2>
            <p className="text-lg text-gray-600">{(t as any).discoverInternships || "Discover internships across diverse industries"}</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="group hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 overflow-hidden">
              <div className="relative h-40 overflow-hidden">
                <img
                  src="/images/new_images/1.webp"
                  alt="Manufacturing Sector"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-3">
                  <h3 className="text-white font-bold text-center text-lg">{(t as any).manufacturing || "Manufacturing"}</h3>
                </div>
              </div>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 overflow-hidden">
              <div className="relative h-40 overflow-hidden">
                <img
                  src="/images/new_images/2.webp"
                  alt="IT Sector"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-3">
                  <h3 className="text-white font-bold text-center text-lg">{(t as any).it || "IT"}</h3>
                </div>
              </div>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 overflow-hidden">
              <div className="relative h-40 overflow-hidden">
                <img
                  src="/images/new_images/3.webp"
                  alt="Finance Sector"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-3">
                  <h3 className="text-white font-bold text-center text-lg">{(t as any).finance || "Finance"}</h3>
                </div>
              </div>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 overflow-hidden">
              <div className="relative h-40 overflow-hidden">
                <img
                  src="/images/new_images/4.webp"
                  alt="Healthcare Sector"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-3">
                  <h3 className="text-white font-bold text-center text-lg">{(t as any).healthcare || "Healthcare"}</h3>
                </div>
              </div>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button className="bg-[#0d47a1] hover:bg-[#0a3a82] text-white px-8 py-3">
              {(t as any).showMore || "Show More"}
            </Button>
          </div>
        </div>
      </section>

      {/* Download PMIS Mobile App Section */}
      <section 
        className="py-16 relative overflow-hidden my-6 rounded-tr-[3rem] rounded-bl-[3rem] shadow-lg bg-texture-blue" 
        id="mobile-app"
      >
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full bg-app-section"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-4xl font-bold mb-6">{(t as any).downloadPMISApp || "Download PMIS Mobile Application"}</h2>
              <p className="text-lg mb-8 leading-relaxed">
                {(t as any).registerCompleteApply || "Register, complete your profile, and apply for paid internships seamlessly."}
              </p>
              <div className="flex justify-center lg:justify-start">
                <a href="#" className="inline-block">
                  <img
                    src="/images/new_images/google_play_btn.png"
                    alt="Get it on Google Play"
                    className="h-16 w-auto"
                    loading="lazy"
                  />
                </a>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              {/* This space is now used by the background image */}
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Gallery Section */}
      <section 
        className="py-16 my-6 rounded-tl-[3rem] rounded-br-[3rem] shadow-lg overflow-hidden bg-texture-gallery" 
        id="gallery"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{(t as any).galleryTitle || "Gallery"}</h2>
            <p className="text-lg text-gray-600">{(t as any).exploreEvents || "Explore our events, activities, and experiences across India"}</p>
          </div>
          
          {/* Events Gallery Row */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">{(t as any).recentEvents || "Recent Events"}</h3>
            <div className="relative overflow-hidden">
              <div className="flex animate-scroll-left space-x-6">
                {/* First set of images */}
                {[
                  { src: "/images/new_images/assam-1.webp", titleKey: "shillongRoundtable", locationKey: "assam" },
                  { src: "/images/new_images/assam-2.webp", titleKey: "youthEngagement", locationKey: "assam" },
                  { src: "/images/new_images/assam-3.webp", titleKey: "industryConnect", locationKey: "assam" },
                  { src: "/images/new_images/dun-1.webp", titleKey: "internInteraction", locationKey: "dehradun" },
                  { src: "/images/new_images/dun-2.webp", titleKey: "collaborativeDiscussions", locationKey: "dehradun" },
                  { src: "/images/new_images/hyd-1.webp", titleKey: "pmisInternConnect", locationKey: "hyderabad" },
                  { src: "/images/new_images/hyd-2.webp", titleKey: "innovationWorkshop", locationKey: "hyderabad" },
                  { src: "/images/new_images/mumbai-1.webp", titleKey: "corporatePartnership", locationKey: "mumbai" },
                  { src: "/images/new_images/mumbai-2.webp", titleKey: "skillsDevelopment", locationKey: "mumbai" },
                  { src: "/images/new_images/ind-1.webp", titleKey: "nationalConference", locationKey: "india" },
                  { src: "/images/new_images/ind-2.webp", titleKey: "successStoriesGallery", locationKey: "india" },
                  { src: "/images/new_images/ind-3.webp", titleKey: "awardCeremony", locationKey: "india" },
                ].map((item, index) => (
                  <div key={index} className="flex-shrink-0 w-80 bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative h-48">
                      <img
                        src={item.src}
                        alt={(t as any)[item.titleKey] || item.titleKey}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <h4 className="text-white font-semibold text-sm">{(t as any)[item.titleKey] || item.titleKey}</h4>
                        <p className="text-white/80 text-xs">{(t as any)[item.locationKey] || item.locationKey}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {[
                  { src: "/images/new_images/assam-1.webp", titleKey: "shillongRoundtable", locationKey: "assam" },
                  { src: "/images/new_images/assam-2.webp", titleKey: "youthEngagement", locationKey: "assam" },
                  { src: "/images/new_images/assam-3.webp", titleKey: "industryConnect", locationKey: "assam" },
                  { src: "/images/new_images/dun-1.webp", titleKey: "internInteraction", locationKey: "dehradun" },
                  { src: "/images/new_images/dun-2.webp", titleKey: "collaborativeDiscussions", locationKey: "dehradun" },
                  { src: "/images/new_images/hyd-1.webp", titleKey: "pmisInternConnect", locationKey: "hyderabad" },
                  { src: "/images/new_images/hyd-2.webp", titleKey: "innovationWorkshop", locationKey: "hyderabad" },
                  { src: "/images/new_images/mumbai-1.webp", titleKey: "corporatePartnership", locationKey: "mumbai" },
                  { src: "/images/new_images/mumbai-2.webp", titleKey: "skillsDevelopment", locationKey: "mumbai" },
                  { src: "/images/new_images/ind-1.webp", titleKey: "nationalConference", locationKey: "india" },
                  { src: "/images/new_images/ind-2.webp", titleKey: "successStoriesGallery", locationKey: "india" },
                  { src: "/images/new_images/ind-3.webp", titleKey: "awardCeremony", locationKey: "india" },
                ].map((item, index) => (
                  <div key={`duplicate-${index}`} className="flex-shrink-0 w-80 bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative h-48">
                      <img
                        src={item.src}
                        alt={(t as any)[item.titleKey] || item.titleKey}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <h4 className="text-white font-semibold text-sm">{(t as any)[item.titleKey] || item.titleKey}</h4>
                        <p className="text-white/80 text-xs">{(t as any)[item.locationKey] || item.locationKey}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sector Highlights Row */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">Sector Highlights</h3>
            <div className="relative overflow-hidden">
              <div className="flex animate-scroll-right space-x-6">
                {/* First set */}
                {[
                  { src: "/images/new_images/5.webp", title: "Manufacturing Excellence" },
                  { src: "/images/new_images/6.webp", title: "Technology Innovation" },
                  { src: "/images/new_images/7.webp", title: "Financial Services" },
                  { src: "/images/new_images/8.webp", title: "Healthcare Solutions" },
                  { src: "/images/new_images/9.webp", title: "Education & Training" },
                  { src: "/images/new_images/10.webp", title: "Agricultural Development" },
                  { src: "/images/new_images/11.webp", title: "Infrastructure Projects" },
                  { src: "/images/new_images/12.webp", title: "Renewable Energy" },
                  { src: "/images/new_images/13.webp", title: "Digital India Initiative" },
                  { src: "/images/new_images/14.webp", title: "Startup Ecosystem" },
                ].map((item, index) => (
                  <div key={index} className="flex-shrink-0 w-72 bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative h-40">
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900/80 to-transparent p-3">
                        <h4 className="text-white font-semibold text-sm">{item.title}</h4>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Duplicate set */}
                {[
                  { src: "/images/new_images/5.webp", title: "Manufacturing Excellence" },
                  { src: "/images/new_images/6.webp", title: "Technology Innovation" },
                  { src: "/images/new_images/7.webp", title: "Financial Services" },
                  { src: "/images/new_images/8.webp", title: "Healthcare Solutions" },
                  { src: "/images/new_images/9.webp", title: "Education & Training" },
                  { src: "/images/new_images/10.webp", title: "Agricultural Development" },
                  { src: "/images/new_images/11.webp", title: "Infrastructure Projects" },
                  { src: "/images/new_images/12.webp", title: "Renewable Energy" },
                  { src: "/images/new_images/13.webp", title: "Digital India Initiative" },
                  { src: "/images/new_images/14.webp", title: "Startup Ecosystem" },
                ].map((item, index) => (
                  <div key={`duplicate-${index}`} className="flex-shrink-0 w-72 bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative h-40">
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900/80 to-transparent p-3">
                        <h4 className="text-white font-semibold text-sm">{item.title}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Success Stories Row */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">Success Stories</h3>
            <div className="relative overflow-hidden">
              <div className="flex animate-scroll-left-fast space-x-6">
                {/* First set */}
                {[
                  { src: "/images/new_images/15.webp", title: "Outstanding Achievements" },
                  { src: "/images/new_images/16.webp", title: "Career Growth Stories" },
                  { src: "/images/new_images/17.webp", title: "Innovation Awards" },
                  { src: "/images/new_images/18.webp", title: "Industry Recognition" },
                  { src: "/images/new_images/19.webp", title: "Excellence in Service" },
                  { src: "/images/new_images/20.webp", title: "Leadership Development" },
                  { src: "/images/new_images/21.webp", title: "Impact Stories" },
                  { src: "/images/new_images/22.webp", title: "Community Engagement" },
                  { src: "/images/new_images/23.webp", title: "Future Leaders" },
                  { src: "/images/new_images/24.webp", title: "Skills Excellence" },
                ].map((item, index) => (
                  <div key={index} className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative h-36">
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-orange-900/80 to-transparent p-3">
                        <h4 className="text-white font-semibold text-xs">{item.title}</h4>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Duplicate set */}
                {[
                  { src: "/images/new_images/15.webp", title: "Outstanding Achievements" },
                  { src: "/images/new_images/16.webp", title: "Career Growth Stories" },
                  { src: "/images/new_images/17.webp", title: "Innovation Awards" },
                  { src: "/images/new_images/18.webp", title: "Industry Recognition" },
                  { src: "/images/new_images/19.webp", title: "Excellence in Service" },
                  { src: "/images/new_images/20.webp", title: "Leadership Development" },
                  { src: "/images/new_images/21.webp", title: "Impact Stories" },
                  { src: "/images/new_images/22.webp", title: "Community Engagement" },
                  { src: "/images/new_images/23.webp", title: "Future Leaders" },
                  { src: "/images/new_images/24.webp", title: "Skills Excellence" },
                ].map((item, index) => (
                  <div key={`duplicate-${index}`} className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative h-36">
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-orange-900/80 to-transparent p-3">
                        <h4 className="text-white font-semibold text-xs">{item.title}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Partners Section */}
      <section 
        className="py-16 my-6 rounded-tr-[3rem] rounded-bl-[3rem] shadow-lg overflow-hidden bg-texture-partners" 
        id="partners"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Esteemed Partners</h2>
            <p className="text-lg text-gray-600">
              Collaborating with leading companies across India to provide valuable internship experiences.
            </p>
          </div>
          
          {/* Horizontal Sliding Partners */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll-left-fast space-x-6">
              {/* First set of partner companies */}
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="TATA" 
                  subtitle="Consultancy Services"
                  logoSize="lg"
                  textClassName="text-blue-900"
                />
              </div>
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="INFOSYS" 
                  subtitle="Limited"
                  logoSize="lg"
                  textClassName="text-blue-600"
                />
              </div>
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="WIPRO" 
                  subtitle="Technologies"
                  logoSize="lg"
                  textClassName="text-green-700"
                />
              </div>
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="HCL" 
                  subtitle="Technologies Limited"
                  logoSize="lg"
                  textClassName="text-blue-800"
                />
              </div>
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="ICICI" 
                  subtitle="Bank Limited"
                  logoSize="lg"
                  textClassName="text-orange-600"
                />
              </div>
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="HDFC" 
                  subtitle="Bank"
                  logoSize="lg"
                  textClassName="text-blue-700"
                />
              </div>
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="BAJAJ" 
                  subtitle="Finance Limited"
                  logoSize="lg"
                  textClassName="text-blue-900"
                />
              </div>
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="MARUTI" 
                  subtitle="Suzuki India"
                  logoSize="lg"
                  textClassName="text-orange-500"
                />
              </div>
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="MAHINDRA" 
                  subtitle="& Mahindra"
                  logoSize="lg"
                  textClassName="text-red-700"
                />
              </div>
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="TATA STEEL" 
                  subtitle="Limited"
                  logoSize="lg"
                  textClassName="text-blue-800"
                />
              </div>
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="ASHOK LEYLAND" 
                  subtitle="Limited"
                  logoSize="lg"
                  textClassName="text-green-600"
                />
              </div>
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="HERO" 
                  subtitle="MotoCorp"
                  logoSize="lg"
                  textClassName="text-blue-600"
                />
              </div>
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="APOLLO" 
                  subtitle="Tyres Limited"
                  logoSize="lg"
                  textClassName="text-red-600"
                />
              </div>
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="EICHER" 
                  subtitle="Motors Limited"
                  logoSize="lg"
                  textClassName="text-purple-600"
                />
              </div>
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="TVS MOTOR" 
                  subtitle="Company"
                  logoSize="lg"
                  textClassName="text-red-700"
                />
              </div>
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="ADOBE" 
                  subtitle="Systems India"
                  logoSize="lg"
                  textClassName="text-red-500"
                />
              </div>
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="MICROSOFT" 
                  subtitle="India R&D"
                  logoSize="lg"
                  textClassName="text-blue-600"
                />
              </div>
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="GOOGLE" 
                  subtitle="IT Services India"
                  logoSize="lg"
                  textClassName="text-red-500"
                />
              </div>
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="IBM" 
                  subtitle="India Private"
                  logoSize="lg"
                  textClassName="text-blue-700"
                />
              </div>
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="ORACLE" 
                  subtitle="India Private"
                  logoSize="lg"
                  textClassName="text-red-600"
                />
              </div>
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="SAMSUNG" 
                  subtitle="R&D Institute"
                  logoSize="lg"
                  textClassName="text-blue-800"
                />
              </div>
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="HONDA" 
                  subtitle="Motorcycle & Scooter"
                  logoSize="lg"
                  textClassName="text-red-700"
                />
              </div>
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="HYUNDAI" 
                  subtitle="Motor India"
                  logoSize="lg"
                  textClassName="text-blue-600"
                />
              </div>
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="TOYOTA" 
                  subtitle="Kirloskar Motor"
                  logoSize="lg"
                  textClassName="text-red-600"
                />
              </div>
              
              {/* Duplicate set for seamless loop */}
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="TATA" 
                  subtitle="Consultancy Services"
                  logoSize="lg"
                  textClassName="text-blue-900"
                />
              </div>
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="INFOSYS" 
                  subtitle="Limited"
                  logoSize="lg"
                  textClassName="text-blue-600"
                />
              </div>
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="WIPRO" 
                  subtitle="Technologies"
                  logoSize="lg"
                  textClassName="text-green-700"
                />
              </div>
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="HCL" 
                  subtitle="Technologies Limited"
                  logoSize="lg"
                  textClassName="text-blue-800"
                />
              </div>
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="ICICI" 
                  subtitle="Bank Limited"
                  logoSize="lg"
                  textClassName="text-orange-600"
                />
              </div>
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="HDFC" 
                  subtitle="Bank"
                  logoSize="lg"
                  textClassName="text-blue-700"
                />
              </div>
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="BAJAJ" 
                  subtitle="Finance Limited"
                  logoSize="lg"
                  textClassName="text-blue-900"
                />
              </div>
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="MARUTI" 
                  subtitle="Suzuki India"
                  logoSize="lg"
                  textClassName="text-orange-500"
                />
              </div>
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="MAHINDRA" 
                  subtitle="& Mahindra"
                  logoSize="lg"
                  textClassName="text-red-700"
                />
              </div>
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="TATA MOTORS" 
                  subtitle="Limited"
                  logoSize="lg"
                  textClassName="text-blue-800"
                />
              </div>
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="ASHOK LEYLAND" 
                  subtitle="Limited"
                  logoSize="lg"
                  textClassName="text-green-600"
                />
              </div>
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="HERO" 
                  subtitle="MotoCorp"
                  logoSize="lg"
                  textClassName="text-blue-600"
                />
              </div>
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="APOLLO" 
                  subtitle="Tyres Limited"
                  logoSize="lg"
                  textClassName="text-red-600"
                />
              </div>
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="EICHER" 
                  subtitle="Motors Limited"
                  logoSize="lg"
                  textClassName="text-purple-600"
                />
              </div>
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="TVS MOTOR" 
                  subtitle="Company"
                  logoSize="lg"
                  textClassName="text-red-700"
                />
              </div>
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="ADOBE" 
                  subtitle="Systems India"
                  logoSize="lg"
                  textClassName="text-red-500"
                />
              </div>
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="MICROSOFT" 
                  subtitle="India R&D"
                  logoSize="lg"
                  textClassName="text-blue-600"
                />
              </div>
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="GOOGLE" 
                  subtitle="IT Services India"
                  logoSize="lg"
                  textClassName="text-red-500"
                />
              </div>
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="IBM" 
                  subtitle="India Private"
                  logoSize="lg"
                  textClassName="text-blue-700"
                />
              </div>
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="ORACLE" 
                  subtitle="India Private"
                  logoSize="lg"
                  textClassName="text-red-600"
                />
              </div>
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="SAMSUNG" 
                  subtitle="R&D Institute"
                  logoSize="lg"
                  textClassName="text-blue-800"
                />
              </div>
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="HONDA" 
                  subtitle="Motorcycle & Scooter"
                  logoSize="lg"
                  textClassName="text-red-700"
                />
              </div>
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="HYUNDAI" 
                  subtitle="Motor India"
                  logoSize="lg"
                  textClassName="text-blue-600"
                />
              </div>
              <div className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-md border">
                <CompanyLogo 
                  companyName="TOYOTA" 
                  subtitle="Kirloskar Motor"
                  logoSize="lg"
                  textClassName="text-red-600"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-100 my-6 rounded-tl-[3rem] rounded-br-[3rem] shadow-lg" id="support">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.readyToStart}</h2>
          <p className="text-xl mb-8 text-gray-600">{t.joinThousands}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[#0d47a1] hover:bg-[#0a3a82] text-white px-8 py-3"
              onClick={() => (window.location.href = "/registration")}
            >
              {t.applyNow}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#0d47a1] text-[#0d47a1] hover:bg-[#0d47a1] hover:text-white px-8 py-3 bg-transparent"
              onClick={() => (window.location.href = "/registration")}
            >
              {t.checkEligibility}
            </Button>
          </div>
        </div>
      </section>
      </div>

      {/* Floating AI Components */}
      <PMISChatbot />

      <GovernmentFooter />
    </div>
  )
}
