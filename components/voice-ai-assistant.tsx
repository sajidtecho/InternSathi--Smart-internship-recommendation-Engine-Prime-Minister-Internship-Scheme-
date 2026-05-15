"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Square,
  Headphones,
  Settings,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MessageSquare,
  FileText,
  UserCheck,
  Target,
  MapPin,
  Briefcase
} from 'lucide-react'

interface VoiceSession {
  id: string
  transcript: string
  response: string
  timestamp: Date
  confidence: number
}

interface FormField {
  field: string
  description: string
  required: boolean
  example: string
}

interface InternshipRecommendation {
  company: string
  position: string
  location: string
  sector: string
  stipend: string
  matchScore: number
  requirements: string[]
}

const formFields: FormField[] = [
  {
    field: "Personal Information",
    description: "Your basic details including name, age, contact information",
    required: true,
    example: "Full Name: John Doe, Age: 22, Mobile: +91-9876543210"
  },
  {
    field: "Educational Qualifications",
    description: "Your educational background and certifications",
    required: true,
    example: "B.Tech Computer Science, 75% aggregate"
  },
  {
    field: "Skills & Interests",
    description: "Technical and soft skills, areas of interest",
    required: true,
    example: "Programming: Java, Python; Interests: AI/ML, Web Development"
  },
  {
    field: "Preferred Location",
    description: "Cities or states where you'd like to work",
    required: false,
    example: "Delhi, Mumbai, Bangalore"
  },
  {
    field: "Preferred Sector",
    description: "Industry sectors you're interested in",
    required: true,
    example: "Information Technology, Finance, Healthcare"
  }
]

const sampleRecommendations: InternshipRecommendation[] = [
  {
    company: "TCS",
    position: "Software Development Intern",
    location: "Bangalore",
    sector: "IT",
    stipend: "₹8,000/month",
    matchScore: 92,
    requirements: ["B.Tech/BE Computer Science", "Java/Python knowledge", "Good communication"]
  },
  {
    company: "Infosys",
    position: "Data Analytics Intern",
    location: "Hyderabad",
    sector: "IT",
    stipend: "₹7,500/month",
    matchScore: 88,
    requirements: ["Engineering Graduate", "Data Analysis skills", "SQL knowledge"]
  },
  {
    company: "HDFC Bank",
    position: "Banking Operations Intern",
    location: "Mumbai",
    sector: "Finance",
    stipend: "₹6,000/month",
    matchScore: 75,
    requirements: ["Graduate in any stream", "Customer service orientation", "Basic computer skills"]
  }
]

export default function VoiceAIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentTranscript, setCurrentTranscript] = useState('')
  const [sessions, setSessions] = useState<VoiceSession[]>([])
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [selectedMode, setSelectedMode] = useState<'form-help' | 'recommendations'>('form-help')
  const [userProfile, setUserProfile] = useState<any>({})
  
  const recognition = useRef<any>(null)
  const synthesis = useRef<any>(null)
  const audioContext = useRef<AudioContext | null>(null)

  useEffect(() => {
    // Initialize speech recognition
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      recognition.current = new (window as any).webkitSpeechRecognition()
      recognition.current.continuous = true
      recognition.current.interimResults = true
      recognition.current.lang = 'en-IN'
      
      recognition.current.onresult = (event: any) => {
        let finalTranscript = ''
        let interimTranscript = ''
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript
          } else {
            interimTranscript += transcript
          }
        }
        
        setCurrentTranscript(finalTranscript || interimTranscript)
        
        if (finalTranscript) {
          processVoiceInput(finalTranscript, event.results[event.results.length - 1][0].confidence)
        }
      }
      
      recognition.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
      }
      
      recognition.current.onend = () => {
        setIsListening(false)
      }
    }

    // Initialize speech synthesis
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthesis.current = window.speechSynthesis
    }

    // Initialize Web Audio API for better audio handling
    if (typeof window !== 'undefined' && 'AudioContext' in window) {
      audioContext.current = new AudioContext()
    }
  }, [])

  const processVoiceInput = async (transcript: string, confidence: number) => {
    setIsProcessing(true)
    setCurrentTranscript('')
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    let response = ''
    
    if (selectedMode === 'form-help') {
      response = generateFormHelp(transcript)
    } else {
      response = generateRecommendations(transcript)
    }
    
    const session: VoiceSession = {
      id: Date.now().toString(),
      transcript,
      response,
      timestamp: new Date(),
      confidence
    }
    
    setSessions(prev => [session, ...prev])
    
    if (voiceEnabled && synthesis.current) {
      speakText(response)
    }
    
    setIsProcessing(false)
  }

  const generateFormHelp = (query: string): string => {
    const lowerQuery = query.toLowerCase()
    
    if (lowerQuery.includes('personal') || lowerQuery.includes('name') || lowerQuery.includes('contact')) {
      return "For personal information, you need to provide your full name as per Aadhaar card, age, mobile number, email address, and current address. Make sure all details match your government documents."
    }
    
    if (lowerQuery.includes('education') || lowerQuery.includes('qualification') || lowerQuery.includes('degree')) {
      return "In educational qualifications, mention your highest degree, university name, year of passing, and percentage or CGPA. Also include any relevant certifications or additional courses."
    }
    
    if (lowerQuery.includes('skill') || lowerQuery.includes('interest') || lowerQuery.includes('experience')) {
      return "List both technical and soft skills. For technical skills, mention programming languages, tools, and technologies you know. For interests, specify areas like AI, web development, data science, etc. Include any projects or internships."
    }
    
    if (lowerQuery.includes('location') || lowerQuery.includes('city') || lowerQuery.includes('state')) {
      return "Choose preferred work locations based on your convenience and family situation. You can select multiple cities. Consider factors like cost of living, transportation, and future opportunities."
    }
    
    if (lowerQuery.includes('sector') || lowerQuery.includes('industry') || lowerQuery.includes('field')) {
      return "Select sectors aligned with your education and interests. Popular sectors include IT, Manufacturing, Healthcare, Finance, Agriculture, and Retail. Choose based on your career goals and skills."
    }
    
    if (lowerQuery.includes('document') || lowerQuery.includes('upload') || lowerQuery.includes('certificate')) {
      return "Required documents: Aadhaar card, educational certificates, bank account details, passport photo, caste certificate (if applicable), and income certificate. Ensure all documents are clear and valid."
    }
    
    return "I can help you with form filling. You can ask about personal information, educational qualifications, skills, preferred locations, sectors, or required documents. What specific field do you need help with?"
  }

  const generateRecommendations = (query: string): string => {
    const lowerQuery = query.toLowerCase()
    
    // Extract user preferences from voice input
    let recommendations = sampleRecommendations
    
    if (lowerQuery.includes('it') || lowerQuery.includes('software') || lowerQuery.includes('computer')) {
      recommendations = recommendations.filter(r => r.sector === 'IT')
      return `Based on your interest in IT, I recommend: ${recommendations[0].company} - ${recommendations[0].position} in ${recommendations[0].location} with ${recommendations[0].stipend} stipend. Match score: ${recommendations[0].matchScore}%. This position requires ${recommendations[0].requirements.join(', ')}.`
    }
    
    if (lowerQuery.includes('finance') || lowerQuery.includes('bank') || lowerQuery.includes('accounting')) {
      recommendations = recommendations.filter(r => r.sector === 'Finance')
      return `For finance sector, I suggest: ${recommendations[0].company} - ${recommendations[0].position} in ${recommendations[0].location} with ${recommendations[0].stipend} stipend. Match score: ${recommendations[0].matchScore}%. Requirements include ${recommendations[0].requirements.join(', ')}.`
    }
    
    if (lowerQuery.includes('bangalore') || lowerQuery.includes('mumbai') || lowerQuery.includes('delhi')) {
      const location = lowerQuery.includes('bangalore') ? 'Bangalore' : lowerQuery.includes('mumbai') ? 'Mumbai' : 'Delhi'
      recommendations = recommendations.filter(r => r.location.includes(location))
      if (recommendations.length > 0) {
        return `For ${location}, I found: ${recommendations[0].company} - ${recommendations[0].position} with ${recommendations[0].stipend} stipend. This has a ${recommendations[0].matchScore}% match with your profile.`
      }
    }
    
    return `Based on your profile, here are top recommendations: 
    1. ${sampleRecommendations[0].company} - ${sampleRecommendations[0].position} (${sampleRecommendations[0].matchScore}% match)
    2. ${sampleRecommendations[1].company} - ${sampleRecommendations[1].position} (${sampleRecommendations[1].matchScore}% match)
    Would you like detailed information about any of these positions?`
  }

  const speakText = (text: string) => {
    if (synthesis.current) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'en-IN'
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = 0.8
      
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)
      
      synthesis.current.speak(utterance)
    }
  }

  const startListening = () => {
    if (recognition.current && !isListening) {
      setIsListening(true)
      setCurrentTranscript('')
      recognition.current.start()
    }
  }

  const stopListening = () => {
    if (recognition.current && isListening) {
      recognition.current.stop()
      setIsListening(false)
    }
  }

  const stopSpeaking = () => {
    if (synthesis.current) {
      synthesis.current.cancel()
      setIsSpeaking(false)
    }
  }

  const clearSessions = () => {
    setSessions([])
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 left-4 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white rounded-full w-12 h-12 shadow-lg"
          title="Open Voice AI Assistant"
        >
          <Headphones className="w-5 h-5" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Card className="w-80 h-[500px] shadow-2xl border-green-200">
        {/* Header */}
        <CardHeader className="bg-green-600 text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Headphones className="w-6 h-6" />
              <CardTitle className="text-lg">Voice AI Assistant</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className="text-white hover:bg-green-700 p-1"
                title={voiceEnabled ? "Disable Voice Output" : "Enable Voice Output"}
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-green-700 p-1"
                title="Close Assistant"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0 h-full flex flex-col">
          {/* Mode Selection */}
          <div className="p-3 border-b bg-gray-50">
            <div className="flex gap-2">
              <Button
                variant={selectedMode === 'form-help' ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedMode('form-help')}
                className="flex-1"
              >
                <FileText className="w-4 h-4 mr-1" />
                Form Help
              </Button>
              <Button
                variant={selectedMode === 'recommendations' ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedMode('recommendations')}
                className="flex-1"
              >
                <Target className="w-4 h-4 mr-1" />
                Recommendations
              </Button>
            </div>
          </div>

          {/* Current Status */}
          <div className="p-3 border-b bg-blue-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isListening && (
                  <>
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-red-600">Listening...</span>
                  </>
                )}
                {isProcessing && (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm font-medium text-blue-600">Processing...</span>
                  </>
                )}
                {isSpeaking && (
                  <>
                    <Volume2 className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-600">Speaking...</span>
                  </>
                )}
                {!isListening && !isProcessing && !isSpeaking && (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-500">Ready</span>
                  </>
                )}
              </div>
              <span className="text-xs text-gray-500">
                {selectedMode === 'form-help' ? 'Form Assistance Mode' : 'Recommendation Mode'}
              </span>
            </div>
            {currentTranscript && (
              <div className="mt-2 p-2 bg-white rounded border">
                <p className="text-sm text-gray-700">"{currentTranscript}"</p>
              </div>
            )}
          </div>

          {/* Sessions History */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {sessions.length === 0 && (
              <div className="text-center py-8">
                <Headphones className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 text-sm">
                  {selectedMode === 'form-help' 
                    ? "Ask me about filling the internship application form!"
                    : "Tell me your preferences to get personalized internship recommendations!"
                  }
                </p>
              </div>
            )}
            
            {sessions.map((session) => (
              <div key={session.id} className="space-y-2">
                <div className="flex justify-end">
                  <div className="bg-blue-600 text-white p-3 rounded-lg max-w-[80%]">
                    <p className="text-sm">{session.transcript}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs opacity-75">
                        Confidence: {Math.round(session.confidence * 100)}%
                      </span>
                      <span className="text-xs opacity-75">
                        {session.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
                    <div className="flex items-start gap-2">
                      <Headphones className="w-4 h-4 mt-1 text-green-600 flex-shrink-0" />
                      <p className="text-sm text-gray-800">{session.response}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="p-4 border-t bg-white">
            <div className="flex gap-2 justify-center">
              <Button
                onClick={isListening ? stopListening : startListening}
                disabled={isProcessing}
                className={`${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-green-500 hover:bg-green-600'
                } text-white px-6 py-3 rounded-full transition-all duration-300`}
                title={isListening ? "Stop Listening" : "Start Listening"}
              >
                {isListening ? (
                  <>
                    <MicOff className="w-5 h-5 mr-2" />
                    Stop
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5 mr-2" />
                    Start
                  </>
                )}
              </Button>
              
              {isSpeaking && (
                <Button
                  onClick={stopSpeaking}
                  variant="outline"
                  className="px-4 py-3 rounded-full"
                  title="Stop Speaking"
                >
                  <Square className="w-4 h-4" />
                </Button>
              )}
            </div>
            
            <div className="flex justify-between items-center mt-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSessions}
                className="text-xs text-gray-500"
              >
                Clear History
              </Button>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <CheckCircle2 className="w-3 h-3" />
                <span>AI Voice Ready</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}