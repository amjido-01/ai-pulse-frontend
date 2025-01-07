'use client'

import React from 'react'
import { motion } from "framer-motion"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/use-auth'
import { Button } from "@/components/ui/button"
import api from '@/app/api/axiosConfig'
import withAuth from '@/components/withAuth'

const Page = () => {
  const [interests, setInterests] = useState<string[]>([])
  const router = useRouter()
  const {user, loading} = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)

  console.log(user, loading, isLoading)

  const handleInterestToggle = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    if (interests.length === 0) {
      alert('Please select at least one interest.')
      return
    }
    try {
      // Here you would typically send the interests to your backend
      await api.post("http://localhost:8080/api/v1/interests", {interests})
      console.log('Interests submitted:', interests)
      router.push('/onboarding/frequency')
      
    } catch (error) {
      console.error('Failed to save interests:', error)
    }finally {
      setIsLoading(false)
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000000] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <p className="mt-2 text-center text-sm text-gray-300">
            Let's personalize your experience. Choose your interests:
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {['AI', 'Machine Learning', 'Data Science', 'Finance', 'Graphics', 'Education',  'Robotics', 'Natural Language Processing', 'Computer Vision', "Websites", "Productivity", "Database", "Marketing", "Photography", "Psychology", "Collaboration", "Analytics", "Podcasting"].map((interest) => (
              <Button
                key={interest}
                type="button"
                onClick={() => handleInterestToggle(interest)}
                className={`${
                  interests.includes(interest)
                    ? 'bg-[#50E3C2] text-black'
                    : 'bg-gray-700 text-white'
                } hover:bg-[#4FACFE] transition-colors`}
              >
                {interest}
              </Button>
            ))}
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
              "Next"
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default withAuth(Page)