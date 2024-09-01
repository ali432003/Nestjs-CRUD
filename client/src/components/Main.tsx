import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowRight, CheckCircle, Star } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-screen bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="absolute inset-0 bg-grid-slate-400/[0.05] bg-[size:40px_40px]" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-primary mb-6 animate-fade-up">
            Welcome to Our Amazing Product
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 animate-fade-up animation-delay-200">
            Revolutionize your workflow with our cutting-edge solution
          </p>
          <Button size="lg" className="animate-fade-up animation-delay-300">
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Easy to Use", description: "Intuitive interface for all skill levels" },
            { title: "Powerful Features", description: "Advanced tools to boost your productivity" },
            { title: "24/7 Support", description: "Our team is always here to help you" }
          ].map((feature, index) => (
            <Card key={index} className="transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: "John Doe", role: "CEO", content: "This product has transformed our business operations." },
            { name: "Jane Smith", role: "Designer", content: "The user interface is both beautiful and functional." },
            { name: "Mike Johnson", role: "Developer", content: "The API is a joy to work with. Highly recommended!" }
          ].map((testimonial, index) => (
            <Card key={index} className="transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle>{testimonial.name}</CardTitle>
                <CardDescription>{testimonial.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">"{testimonial.content}"</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of satisfied customers and take your productivity to the next level.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Input type="email" placeholder="Enter your email" className="max-w-sm" />
            <Button size="lg">
              Sign Up Now <CheckCircle className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      
    </div>
  )
}