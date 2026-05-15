# 🇮🇳 InternSetu - PM Internship Portal

**Smart Internship Recommendation System for Government of India**

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-38bdf8)](https://tailwindcss.com/)

## 🎯 Overview

InternSetu is an AI-powered internship recommendation platform developed for the PM Internship Scheme by the Ministry of Corporate Affairs, Government of India. The platform uses intelligent matching algorithms to connect students with suitable 12-month paid internships across India.

## ✨ Key Features

- **🤖 AI-Powered Recommendations** - Rule-based ML algorithm with 5-factor scoring system
- **🗣️ Voice Interface** - Complete voice navigation using Web Speech API
- **🌐 Multi-Language Support** - 15+ Indian languages including Hindi, Tamil, Telugu, Bengali
- **📊 Smart Matching** - Skills, location, education, interests, and preference-based matching
- **♿ Accessibility First** - WCAG compliant with screen reader support
- **📱 Responsive Design** - Works seamlessly on mobile, tablet, and desktop

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: TailwindCSS 4.1, Radix UI Components
- **State Management**: React Hooks, Context API
- **Data**: LocalStorage, Client-side processing
- **Voice**: Web Speech API (Speech Recognition & Synthesis)
- **Internationalization**: Custom i18n with 15+ languages
- **Testing**: Vitest, React Testing Library

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/abhiii9vvv/InternSetu-SIH.git

# Navigate to project directory
cd InternSetu-SIH

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📂 Project Structure

```
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Landing page
│   ├── registration/      # User registration
│   ├── recommendations/   # AI recommendations
│   └── ai/               # Voice assistant
├── components/            # Reusable React components
├── lib/                  # Core business logic
│   ├── recommendation-engine.ts
│   ├── real-data-loader.ts
│   └── translations/
└── public/               # Static assets
```

## 🎨 Core Features

### Recommendation Engine
- **Education Match** (30%): Qualification alignment
- **Skills Match** (25%): Required and preferred skills
- **Location Match** (20%): Geographic proximity
- **Interest Match** (15%): Sector alignment
- **Preference Match** (10%): Work mode and duration

### Accessibility
- Voice-first navigation
- Keyboard navigation support
- High contrast mode
- Screen reader optimized
- ARIA labels and landmarks

## 🌟 Innovation Highlights

- **Smart Skill Inference**: Auto-suggests skills based on interests
- **Dynamic Thresholds**: Adapts matching criteria to profile completeness
- **Fuzzy Matching**: Handles typos and variations in voice input
- **Regional Language Support**: Native language processing
- **Low Bandwidth Optimized**: Works on 2G/3G networks

## 📊 Performance

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.0s
- **Lighthouse Score**: 95+
- **Bundle Size**: Optimized with code splitting

## 🤝 Contributing

This project was developed for Smart India Hackathon 2025. Contributions are welcome!

## 📄 License

This project is developed for educational purposes as part of SIH 2025.

## 👥 Team

Developed by Team [Your Team Name] for Smart India Hackathon 2025

## 📞 Support

For issues and queries, please open an issue on GitHub.

---

**Built with ❤️ for Digital India Initiative**
