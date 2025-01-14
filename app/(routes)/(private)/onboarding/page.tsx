'use client'

import React, { useState } from 'react'
import { motion } from "framer-motion"
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/use-auth'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import api from '@/app/api/axiosConfig'
import withAuth from '@/components/withAuth'
import { Database, BookOpen, Brain, Camera, Eye, Code, Calendar, FileText, Briefcase, Heart, Globe, Music, PenTool, BotIcon as Robot, Search, Settings, Share2, ShoppingBag, Smartphone, Star, Terminal, Tv, Users, Zap, Building2, Laptop, Lightbulb, LineChart, MessageSquare, Microscope, Palette, Shield, TypeIcon as type, LucideIcon } from 'lucide-react'

interface Interest {
  name: string
  icon: LucideIcon
}

const Page = () => {
  const [interests, setInterests] = useState<string[]>([])
  const [customInterest, setCustomInterest] = useState('')
  const router = useRouter()
  const {user, loading} = useAuthStore()
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
    { name: 'Art', icon: Palette },
    { name: 'HR', icon: Users },
    { name: 'Analysis', icon: Search },
    { name: 'Fitness', icon: Heart },
    { name: 'Technology', icon: Laptop }
  ]

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
      await api.post("http://localhost:8080/api/v1/interests", {interests})
      router.push('/onboarding/frequency')
    } catch (error) {
      console.error('Failed to save interests:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000000] py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-4xl p-6 bg-transparent bordergray800 border-none">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-white">Let's select your interests</h2>
            <p className="text-sm text-gray-400">
              Choose topics that interest you to personalize your experience
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
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

            <div className="space-y-4">
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