'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import withAuth from '@/components/withAuth'
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import api from '@/app/api/axiosConfig'
import { motion } from "framer-motion"

const frequencies = [
  { value: 'daily', label: 'Daily' },
  { value: 'twice-weekly', label: 'Twice Weekly' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'bi-weekly', label: 'Bi-Weekly' },
  { value: 'monthly', label: 'Monthly' }
]

const Page = () => {
  const [frequency, setFrequency] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    if (!frequency) return

    try {
    //   await saveNotificationFrequency(frequency)
    const response = await api.post("https://ai-pulse-backend.onrender.com/api/v1/frequency", {frequency})
    sessionStorage.setItem("previousPath", "/onboarding/frequency")
      router.push('/dashboard')
      console.log(response.data, "from freq")
    } catch (error) {
      console.error('Failed to save notification frequency:', error)
    } finally {
      setIsLoading(false)
    }
  }



  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000000] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Choose Your Notification Frequency</h2>
          <p className="mt-2 text-center text-sm text-gray-300">
            How often would you like to receive updates?
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <RadioGroup value={frequency} onValueChange={setFrequency} className="space-y-4">
            {frequencies.map((freq) => (
              <div key={freq.value} className="flex items-center space-x-2">
                <RadioGroupItem value={freq.value} id={freq.value} />
                <Label htmlFor={freq.value} className="text-white">{freq.label}</Label>
              </div>
            ))}
          </RadioGroup>
          <Button
            type="submit"
            disabled={!frequency}
            className="w-full bg-[#50E3C2] text-black hover:bg-[#4FACFE] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
              {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full"
              />
            ) : (
              "Continue to Dashboard"
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default withAuth(Page)