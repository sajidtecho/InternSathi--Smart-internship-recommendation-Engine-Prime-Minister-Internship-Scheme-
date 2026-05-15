"use client"

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Heart, 
  Code, 
  Zap, 
  Award, 
  Github, 
  Linkedin, 
  Mail,
  Users,
  Star,
  Coffee
} from 'lucide-react'

interface TeamMember {
  name: string
  role: string
  avatar: string
  contributions: string[]
  social?: {
    github?: string
    linkedin?: string
    email?: string
  }
}

const teamMembers: TeamMember[] = [
  {
    name: "Abhinav Tiwary",
    role: "Full Stack Developer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Abhinav&backgroundColor=b6e3f4&hairColor=262e33&topType=ShortHairShortFlat&facialHairType=BeardMedium&facialHairColor=262e33&skinColor=f8d25c&clothingType=Hoodie&clothingColor=3c4f5c",
    contributions: [
      "Full Stack Development",
      "Project Architecture", 
      "Frontend & Backend",
      "Team Coordination"
    ],
    social: {
      github: "abhiii9vvv",
      linkedin: "abhinav-tiwary",
      email: "abhinav@internsetu.com"
    }
  },
  {
    name: "Sajid Ahmed",
    role: "Backend Developer & Database Architect",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sajid&backgroundColor=ffd5dc,ffdfbf,f4f4f4",
    contributions: [
      "API Development",
      "Database Design",
      "Authentication System",
      "Server Architecture"
    ],
    social: {
      github: "sajidahmed",
      linkedin: "sajid-ahmed"
    }
  },
  {
    name: "Mehr Chawla", 
    role: "Frontend Developer & UI/UX Designer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mehr&backgroundColor=c0aede,d1d4f9,ffd5dc",
    contributions: [
      "UI/UX Design",
      "Frontend Development",
      "Component Library",
      "User Experience"
    ],
    social: {
      github: "mehrchawla",
      linkedin: "mehr-chawla"
    }
  },
  {
    name: "Irfan Khan",
    role: "AI/ML Engineer & Data Scientist",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=IrfanKhan&backgroundColor=c0aede&hairColor=4a5568&skinColor=ae9142&eyes=variant13&mouth=variant26",
    contributions: [
      "AI/ML Development",
      "Recommendation Engine",
      "Chatbot Development",
      "Data Analytics"
    ],
    social: {
      github: "irfankhan",
      linkedin: "irfan-khan"
    }
  },
  {
    name: "Bilal",
    role: "DevOps Engineer & System Administrator",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bilal&backgroundColor=d1d4f9,ffd5dc,ffdfbf",
    contributions: [
      "DevOps & Deployment",
      "System Administration",
      "CI/CD Pipelines",
      "Cloud Infrastructure"
    ],
    social: {
      github: "bilal",
      linkedin: "bilal"
    }
  },
  {
    name: "Adil Alamgir",
    role: "QA Engineer & Performance Specialist",
    avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=AdilAlamgir&backgroundColor=ffdfbf&hairColor=2c1b18&skinColor=d08b5b&eyes=variant14&mouth=happy01",
    contributions: [
      "Quality Assurance",
      "Performance Testing",
      "Bug Testing & Fixes",
      "User Acceptance Testing"
    ],
    social: {
      github: "adil-alamgir",
      linkedin: "adil-alamgir"
    }
  }
]

const technologies = [
  "Next.js 14", "React", "TypeScript", "Tailwind CSS", 
  "Node.js", "AI/ML", "Speech API", "Government Standards"
]

const achievements = [
  { icon: Award, text: "Smart India Hackathon 2025", color: "text-yellow-500" },
  { icon: Users, text: "Multi-language Support (13 Languages)", color: "text-blue-500" },
  { icon: Zap, text: "Voice AI Integration", color: "text-green-500" },
  { icon: Star, text: "Government Portal Compliance", color: "text-purple-500" }
]

export default function TeamCredits() {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-16" id="team-credits">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex flex-col items-center justify-center mb-6">
            <img 
              src="/Icons/logo.ico" 
              alt="InternSetu Logo" 
              className="h-32 w-32 mb-4"
            />
            <div className="flex items-center justify-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-red-500" />
              <h2 className="text-xl font-bold text-gray-900">Made with <Heart className="w-5 h-5 text-red-500 inline" /> by</h2>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Team InternSetu
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Passionate developers building the future of internship programs in India. 
            Creating accessible, inclusive, and intelligent solutions for youth empowerment.
          </p>
        </div>

        {/* Achievements Banner */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <achievement.icon className={`w-8 h-8 mx-auto mb-3 ${achievement.color}`} />
                  <p className="font-semibold text-gray-700 text-sm">{achievement.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Members */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">Meet Our Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6 text-center">
                  <div className="relative mb-4">
                    <img 
                      src={member.avatar} 
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-blue-100"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
                      <Code className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  
                  <h4 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h4>
                  <p className="text-blue-600 font-semibold mb-4">{member.role}</p>
                  
                  <div className="mb-4">
                    <h5 className="text-sm font-semibold text-gray-700 mb-2">Key Contributions:</h5>
                    <div className="space-y-1">
                      {member.contributions.map((contribution, idx) => (
                        <span 
                          key={idx}
                          className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-1 mb-1"
                        >
                          {contribution}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {member.social && (
                    <div className="flex justify-center gap-3">
                      {member.social.github && (
                        <a 
                          href={`https://github.com/${member.social.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-gray-900 transition-colors"
                          title="GitHub Profile"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {member.social.linkedin && (
                        <a 
                          href={`https://linkedin.com/in/${member.social.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          title="LinkedIn Profile"
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                      {member.social.email && (
                        <a 
                          href={`mailto:${member.social.email}`}
                          className="text-green-600 hover:text-green-800 transition-colors"
                          title="Send Email"
                        >
                          <Mail className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Technologies Used */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">Technologies & Tools</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech, index) => (
              <span 
                key={index}
                className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Project Stats */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">6</div>
              <div className="text-gray-600">Team Members</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">5000+</div>
              <div className="text-gray-600">Lines of Code</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">13</div>
              <div className="text-gray-600">Languages Supported</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">200+</div>
              <div className="text-gray-600">Hours Invested</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
              <div className="text-3xl font-bold text-red-600 mb-2">∞</div>
              <div className="text-gray-600">Cups of Coffee</div>
            </div>
          </div>
        </div>

        {/* Message */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 to-green-600 text-white">
          <CardContent className="p-8 text-center">
            <Coffee className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-lg leading-relaxed max-w-4xl mx-auto mb-6">
              To democratize internship opportunities across India by creating an intelligent, 
              accessible, and inclusive platform that connects talented youth with meaningful 
              career experiences. We believe in the power of technology to transform lives 
              and build a stronger, more skilled India.
            </p>
            <div className="flex items-center justify-center gap-2 text-lg font-semibold">
              <span>Made with</span>
              <Heart className="w-6 h-6 text-red-300 animate-pulse" />
              <span>for</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">Digital India</span>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-600">
            © 2025 Team InternSetu | Smart India Hackathon 2025 | 
            <span className="font-semibold"> Building the Future of Internships</span>
          </p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <span className="text-sm text-gray-500">Connect with us:</span>
            <a 
              href="https://github.com/abhiii9vvv/v0-internship-website-design" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              title="Project Repository"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}