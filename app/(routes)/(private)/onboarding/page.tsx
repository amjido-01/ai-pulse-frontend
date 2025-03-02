'use client'

import React, { useState } from 'react'
import { motion } from "framer-motion"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import api from '@/app/api/axiosConfig'
import withAuth from '@/components/withAuth'
import { Database, BookOpen, Brain, HelpingHand, Camera, Eye, Code, Calendar, FileText, Heart, Globe, Music, PenTool, BotIcon as Robot, Search, Settings, ShoppingBag, Users, Zap, Building2, Laptop, Lightbulb, LineChart, MessageSquare, Microscope, Palette, Shield, LucideIcon, Star, ChevronDown, Calculator, ShoppingCart, BookOpenCheck, Briefcase } from 'lucide-react'
import { cn } from "@/lib/utils"


interface Interest {
  name: string
  icon: LucideIcon
}

const Page = () => {
  const [interests, setInterests] = useState<string[]>([])
  const [customInterest, setCustomInterest] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const predefinedInterests: Interest[] = [
    { name: 'Data Science', icon: LineChart },
    { name: 'Finance', icon: Building2 },
    { name: 'Graphics', icon: Palette },
    { name: 'Education', icon: BookOpen },
    { name: 'Robotics', icon: Robot },
    { name: 'Natural Language', icon: MessageSquare },
    { name: 'Computer Vision', icon: Eye },
    { name: 'Websites', icon: Globe },
    { name: 'Productivity', icon: Zap },
    { name: 'Database', icon: Database },
    { name: 'Marketing', icon: ShoppingBag },
    { name: 'Photography', icon: Camera },
    { name: 'Psychology', icon: Brain },
    { name: "Management", icon: Microscope },
    { name: "DevOps", icon: Globe },
    { name: 'Collaboration', icon: Users },
    { name: 'Analytics', icon: Search },
    { name: 'Podcasting', icon: Music },
    { name: 'Developer', icon: Code },
    { name: 'Scheduling', icon: Calendar },
    { name: 'Content', icon: FileText },
    { name: 'Automation', icon: Settings },
    { name: 'Government', icon: Shield },
    { name: 'Healthcare', icon: Heart },
    { name: 'Resumes', icon: FileText },
    { name: 'Generative', icon: PenTool },
    { name: 'Intelligence', icon: Lightbulb },
    { name: 'Community', icon: Users },
    { name: 'Assistance', icon: HelpingHand },
    { name: 'Insight', icon: Eye },
    { name: 'Salesforce', icon: Briefcase },
    { name: 'Art', icon: Palette },
    { name: 'HR', icon: Users },
    { name: 'Analysis', icon: Search },
    { name: 'Fitness', icon: Heart },
    { name: 'Technology', icon: Laptop },
    { name: 'Accounting', icon: Calculator },
    { name: 'Ecommerce', icon: ShoppingCart },
    { name: 'Research', icon: BookOpenCheck },
    { name: 'Auditor', icon: Briefcase },
    { name: 'Creative', icon: Palette }
];


  const handleInterestToggle = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    )
  }

  const handleAddCustomInterest = () => {
    if (customInterest && !interests.includes(customInterest)) {
      setInterests(prev => [...prev, customInterest])
      setCustomInterest('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    if (interests.length === 0) {
      alert('Please select at least one interest.')
      return
    }
    try {
      await api.post("https://ai-pulse-backend.onrender.com/api/v1/interests", {interests})
      router.push('/onboarding/frequency')
    } catch (error) {
      console.error('Failed to save interests:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000000] py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-4xl p-6 bg-transparent border-gray-800 border-none">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-white">Let's select your interests</h2>
            <p className="text-sm text-gray-400">
              Choose topics that interest you to personalize your experience
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <div className="relative">
                <div className={cn(
                  "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mb-8 gap-3",
                  !isExpanded && "max-h-[360px] overflow-hidden"
                )}>
                  {predefinedInterests.map(({ name, icon: Icon }) => (
                    <Button
                      key={name}
                      type="button"
                      onClick={() => handleInterestToggle(name)}
                      variant="outline"
                      className={`
                        h-auto py-3 px-4 justify-start space-x-2
                        ${interests.includes(name)
                          ? 'bg-[#50E3C2] text-black border-[#50E3C2] hover:bg-[#4FACFE] hover:text-black'
                          : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700'}
                      `}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="text-sm truncate">{name}</span>
                    </Button>
                  ))}
                </div>
                {!isExpanded && (
                  <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#000000] to-transparent pointer-events-none" />
                )}
                {predefinedInterests.length > 12 && (
                  <Button
                    type="button"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-[#50E3C2] text-black hover:bg-[#4FACFE] py-1 px-2 shadow-lg"
                  >
                    <ChevronDown className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-180")} />
                    expand
                  </Button>
                )}
              </div>
            </div>

            <div className="mb-4 mt-8">
              <div className="flex space-x-2">
                <Input
                  type="text"
                  value={customInterest}
                  onChange={(e) => setCustomInterest(e.target.value)}
                  placeholder="Add a custom interest"
                  className="flex-grow bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                />
                <Button
                  type="button"
                  onClick={handleAddCustomInterest}
                  className="bg-[#50E3C2] text-black hover:bg-[#4FACFE]"
                >
                  Add
                </Button>
              </div>

              {interests.filter(interest => !predefinedInterests.map(i => i.name).includes(interest)).length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-400">Custom Interests:</p>
                  <div className="flex flex-wrap gap-2">
                    {interests
                      .filter(interest => !predefinedInterests.map(i => i.name).includes(interest))
                      .map((interest) => (
                        <Button
                          key={interest}
                          type="button"
                          onClick={() => handleInterestToggle(interest)}
                          variant="outline"
                          className="bg-[#50E3C2] text-black border-[#50E3C2] hover:bg-[#4FACFE] hover:text-black"
                        >
                          <Star className="h-4 w-4 mr-2" />
                          {interest}
                          <span className="ml-2">✕</span>
                        </Button>
                      ))}
                  </div>
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-[#50E3C2] text-black hover:bg-[#4FACFE] transition-colors"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full"
                />
              ) : (
                "Continue"
              )}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  )
}

export default withAuth(Page)