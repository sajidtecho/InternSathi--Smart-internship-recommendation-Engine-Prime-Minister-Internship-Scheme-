"use client"

import Image from "next/image"
import { getCompanyLogo } from "@/lib/company-logos"

interface CompanyLogoProps {
  companyName: string
  subtitle?: string
  className?: string
  logoClassName?: string
  textClassName?: string
  subtitleClassName?: string
  showFallbackText?: boolean
  logoSize?: "sm" | "md" | "lg" | "xl"
}

const sizeClasses = {
  sm: "w-12 h-12",
  md: "w-16 h-16", 
  lg: "w-20 h-20",
  xl: "w-24 h-24"
}

export default function CompanyLogo({
  companyName,
  subtitle,
  className = "",
  logoClassName = "",
  textClassName = "",
  subtitleClassName = "",
  showFallbackText = true,
  logoSize = "md"
}: CompanyLogoProps) {
  const logoPath = getCompanyLogo(companyName)
  
  if (logoPath) {
    return (
      <div className={`flex flex-col items-center justify-center space-y-2 ${className}`}>
        <div className={`relative ${sizeClasses[logoSize]} ${logoClassName}`}>
          <Image
            src={logoPath}
            alt={`${companyName} logo`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        {subtitle && (
          <p className={`text-xs text-gray-600 text-center ${subtitleClassName}`}>
            {subtitle}
          </p>
        )}
      </div>
    )
  }
  
  // Fallback to text if no logo available and showFallbackText is true
  if (showFallbackText) {
    return (
      <div className={`text-center ${className}`}>
        <h3 className={`font-bold text-lg ${textClassName}`}>
          {companyName}
        </h3>
        {subtitle && (
          <p className={`text-sm text-gray-600 ${subtitleClassName}`}>
            {subtitle}
          </p>
        )}
      </div>
    )
  }
  
  return null
}