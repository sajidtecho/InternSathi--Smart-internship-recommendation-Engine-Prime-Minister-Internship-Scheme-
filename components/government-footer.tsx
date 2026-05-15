"use client"

import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Phone, Mail, MapPin } from "lucide-react"
import { useTranslationContext } from "@/lib/translation-provider"

export function GovernmentFooter() {
  const { t, isLoading } = useTranslationContext()
  
  if (isLoading) {
    return null
  }
  
  return (
    <footer className="bg-slate-900 text-white border-t-4 border-t-government-orange">
      <div className="h-1 w-full flex">
        <span className="flex-1 bg-[#FF9933]"></span>
        <span className="flex-1 bg-white"></span>
        <span className="flex-1 bg-[#138808]"></span>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Government Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/icons/ministry-corporate-affairs-official.png" 
                alt="Ministry of Corporate Affairs" 
                className="h-12 w-auto"
              />
            </div>
            <h3 className="font-semibold text-lg mb-4">Ministry of Corporate Affairs</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Government of India<br/>
              Empowering youth through skill development and industry exposure
            </p>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-orange-400" />
                <span className="text-gray-300 text-sm">1800 11 6090</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-orange-400" />
                <span className="text-gray-300 text-sm">support@internsetu.gov.in</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-orange-400 mt-1" />
                <div className="text-gray-300 text-sm">
                  <p>5th Floor, 'A' Wing, Shastri Bhawan, Dr.</p>
                  <p>Rajendra Prasad Road, New Delhi-110001</p>
                </div>
              </div>
            </div>
          </div>

          {/* Get to Know */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Get to Know</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Partner Companies
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Videos
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/credits" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Team Credits
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media & Download */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Download Mobile App</h3>
            <div className="mb-6">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                className="h-10 w-auto mb-3 cursor-pointer"
                loading="lazy"
              />
            </div>
            
            <h4 className="font-semibold mb-3">Social Media</h4>
            <div className="flex gap-3">
              <a href="#" aria-label="YouTube" className="bg-blue-600 p-2 rounded hover:bg-blue-700 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Instagram" className="bg-pink-600 p-2 rounded hover:bg-pink-700 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="bg-blue-700 p-2 rounded hover:bg-blue-800 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Twitter" className="bg-gray-700 p-2 rounded hover:bg-gray-800 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              <p>Build Version: 1756588+2477</p>
              <p>© 2025 PM INTERNSHIP. All rights reserved.</p>
              <p>Powered by BISAG-N in Technical collaboration with BISAG-N</p>
            </div>
            <div className="text-sm text-gray-400">
              <p className="font-semibold text-gray-300">Official Government of India Portal</p>
              <p>Content owned & maintained by Ministry of Corporate Affairs</p>
              <p className="text-xs text-gray-500 mt-2">Designed with accessibility & security best practices (GIGW compliant intent)</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}