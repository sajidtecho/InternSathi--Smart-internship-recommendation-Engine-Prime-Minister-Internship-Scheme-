import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Quote, MapPin } from "lucide-react"
import Image from "next/image"

export function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Puwattara Bora",
      role: "Intern Sampling",
      company: "OIL AND NATURAL GAS CORPORATION LIMITED",
      location: "Assam",
      image: "/young-professional-woman-smiling.png",
      testimonial:
        "The PM Internship Scheme has been a life-changing experience. Working with ONGC has given me invaluable industry exposure and practical skills.",
      rating: 5,
    },
    {
      id: 2,
      name: "Rahul Kumar",
      role: "Software Development Intern",
      company: "Tata Consultancy Services",
      location: "Mumbai",
      image: "/young-professional-man-glasses.png",
      testimonial:
        "The 12-month internship at TCS has equipped me with real-world programming skills. The mentorship has been exceptional.",
      rating: 5,
    },
    {
      id: 3,
      name: "Priya Sharma",
      role: "Banking Operations Intern",
      company: "HDFC Bank",
      location: "Delhi",
      image: "/young-professional-woman.png",
      testimonial:
        "This program opened doors I never thought possible. The practical banking experience has been invaluable for my career.",
      rating: 5,
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from interns who have transformed their careers through the PM Internship Scheme
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-primary mb-4" />

                <blockquote className="text-gray-700 mb-6 italic">"{testimonial.testimonial}"</blockquote>

                <div className="flex items-center gap-3">
                  <Image
                    src={testimonial.image || "https://picsum.photos/seed/internsetu-testimonial/100/100"}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-primary font-medium">{testimonial.role}</p>
                    <p className="text-sm text-gray-600">{testimonial.company}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{testimonial.location}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8 bg-transparent">
            Read More Stories
          </Button>
        </div>
      </div>
    </section>
  )
}
