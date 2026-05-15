"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  Filter, 
  Building2, 
  Users, 
  TrendingUp, 
  MapPin,
  Calendar,
  Star,
  Eye,
  Heart,
  IndianRupee,
  Clock,
  BookOpen
} from "lucide-react"
import { SAMPLE_INTERNSHIPS } from "@/lib/sample-data"
import { Internship } from "@/lib/recommendation-types"
import Image from "next/image"

export default function EnginePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [filteredInternships, setFilteredInternships] = useState<Internship[]>(SAMPLE_INTERNSHIPS)
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set())

  // Filter internships based on search query and selected filter
  useEffect(() => {
    let filtered = SAMPLE_INTERNSHIPS

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(internship =>
        internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (internship.location.district || "").toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply category filter
    if (selectedFilter !== "all") {
      filtered = filtered.filter(internship =>
        internship.sector.toLowerCase() === selectedFilter.toLowerCase()
      )
    }

    setFilteredInternships(filtered)
  }, [searchQuery, selectedFilter])

  const toggleBookmark = (internshipId: string) => {
    setBookmarkedIds(prev => {
      const newBookmarks = new Set(prev)
      if (newBookmarks.has(internshipId)) {
        newBookmarks.delete(internshipId)
      } else {
        newBookmarks.add(internshipId)
      }
      return newBookmarks
    })
  }

  const sectors = [...new Set(SAMPLE_INTERNSHIPS.map(internship => internship.sector))]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Internship Engine</h1>
              <p className="text-lg text-gray-600 mt-1">
                Discover {SAMPLE_INTERNSHIPS.length} internship opportunities from leading companies
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search internships, companies, locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mt-6">
            <Button
              variant={selectedFilter === "all" ? "default" : "outline"}
              onClick={() => setSelectedFilter("all")}
              className="px-4 py-2"
            >
              All Sectors ({SAMPLE_INTERNSHIPS.length})
            </Button>
            {sectors.map((sector) => {
              const count = SAMPLE_INTERNSHIPS.filter(i => i.sector === sector).length
              return (
                <Button
                  key={sector}
                  variant={selectedFilter === sector ? "default" : "outline"}
                  onClick={() => setSelectedFilter(sector)}
                  className="px-4 py-2"
                >
                  {sector} ({count})
                </Button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="text-gray-600">
            Showing {filteredInternships.length} of {SAMPLE_INTERNSHIPS.length} internships
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Internship Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInternships.map((internship) => (
            <Card key={internship.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg font-semibold line-clamp-2">
                      {internship.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Building2 className="w-4 h-4 text-gray-500 shrink-0" />
                      <span className="text-sm text-gray-600 truncate">{internship.company}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleBookmark(internship.id)}
                    className="p-1 h-8 w-8"
                  >
                    <Heart 
                      className={`w-4 h-4 ${
                        bookmarkedIds.has(internship.id) 
                          ? 'fill-red-500 text-red-500' 
                          : 'text-gray-400'
                      }`} 
                    />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {/* Sector Badge */}
                  <div>
                    <Badge variant="secondary" className="text-xs">
                      {internship.sector}
                    </Badge>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span>{internship.location.district}, {internship.location.state}</span>
                  </div>

                  {/* Stipend */}
                  <div className="flex items-center gap-2 text-sm font-medium text-green-600">
                    <IndianRupee className="w-4 h-4 shrink-0" />
                    <span>₹{internship.stipend?.toLocaleString()}/month</span>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4 shrink-0" />
                    <span>{internship.duration}</span>
                  </div>

                  {/* Skills */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Required Skills:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {internship.requiredSkills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {internship.requiredSkills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{internship.requiredSkills.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <Users className="w-4 h-4 mr-2" />
                      Apply
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results State */}
        {filteredInternships.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No internships found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or filters to find more opportunities.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery("")
                  setSelectedFilter("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}