import React from "react"

const partners = [
  { src: "/icons/21 +.png", alt: "NSE" },
  { src: "/icons/logo of cii.jpg", alt: "CII" },
  { src: "/icons/bisag_logo.webp", alt: "BISAG-N" },
  { src: "/icons/FICCI.webp", alt: "FICCI" },
]

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="flex items-center gap-8 mb-10 animate-pulse">
        {partners.map(p => (
          <img key={p.src} src={p.src} alt={p.alt} className="h-14 w-auto opacity-70" />
        ))}
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className="flex gap-2">
          <span className="w-3 h-3 rounded-full bg-orange-500 animate-bounce [animation-delay:-0.2s]"></span>
          <span className="w-3 h-3 rounded-full bg-blue-600 animate-bounce [animation-delay:0s]"></span>
          <span className="w-3 h-3 rounded-full bg-green-600 animate-bounce [animation-delay:0.2s]"></span>
        </div>
        <p className="text-sm text-gray-600 font-medium tracking-wide">Loading Official PM Internship Portal...</p>
      </div>
    </div>
  )
}
