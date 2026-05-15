"use client"

import { GovernmentHeader } from "@/components/government-header"
import { GovernmentFooter } from "@/components/government-footer"
import GovernmentVoiceAssistant from "@/components/government-voice-assistant"

export default function AIPage() {
  return (
    <>
      <GovernmentHeader />
      <main className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-900">AI Voice Assistant</h1>
            <p className="text-gray-600">Use your voice or type your answers. If microphone is blocked or unsupported, typing works fully.</p>
          </div>
          <GovernmentVoiceAssistant />
        </div>
      </main>
      <GovernmentFooter />
    </>
  )
}
