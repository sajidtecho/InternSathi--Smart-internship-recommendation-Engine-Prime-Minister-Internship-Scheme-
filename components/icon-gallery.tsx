"use client"

import Image from "next/image"

interface IconItem {
  src: string
  label: string
}

const ICONS: IconItem[] = [
  // Functional / eligibility related icons only (excluding partner/company logos)
  { src: "/icons/briefcase.png", label: "Employment" },
  { src: "/icons/clock.png", label: "Time" },
  { src: "/icons/education.png", label: "Education" },
  { src: "/icons/family.png", label: "Family" },
  { src: "/icons/rupee.png", label: "Rupee" },
  { src: "/icons/wallet.png", label: "Wallet" },
  { src: "/icons/various sector.png", label: "Sectors" },
  { src: "/icons/Map of India.png", label: "India Map" },
  { src: "/icons/JOB status.png", label: "Job Status" },
]

export function IconGallery() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
  <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Eligibility & Feature Icons</h2>
  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
          {ICONS.map(icon => (
            <div key={icon.src} className="flex flex-col items-center text-center group">
              {/* Using regular img due to spaces in filenames to avoid next/image strictness */}
              <img
                src={icon.src}
                alt={icon.label}
                className="h-14 w-14 object-contain mb-2 transition-transform group-hover:scale-110 drop-shadow-sm"
                loading="lazy"
                decoding="async"
              />
              <span className="text-xs font-medium text-gray-600">{icon.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
