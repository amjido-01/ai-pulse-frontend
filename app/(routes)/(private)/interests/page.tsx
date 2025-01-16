'use client'

import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion"
import { useAuthStore } from '@/store/use-auth'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import api from '@/app/api/axiosConfig'
import withAuth from '@/components/withAuth'


type Interest = {
  id: number;
  interest: string;
  userId: string;
};

const Page = () => {
  const [userInterests, setUserInterests] = useState<Interest[]>([])
  const [newInterest, setNewInterest] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const response = await api.get('http://localhost:8080/api/v1/interests')
        setUserInterests(response.data.interest)
      } catch (error) {
        console.error('Failed to fetch interests:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchInterests()
  }, [])



  const handleAddInterest = async () => {
    if (newInterest && !userInterests.some(i => i.interest === newInterest)) {
      setIsSaving(true)
      try {

          // Create a new array of interests including the new one
          const updatedInterests = [...userInterests.map(i => i.interest), newInterest];

        const response = await api.post("http://localhost:8080/api/v1/interests", { interests: updatedInterests })

          setUserInterests(response.data.responseBody.interest); 
          setNewInterest('');
      } catch (error) {
        console.error('Failed to add interest:', error)
      } finally {
        setIsSaving(false)
      }
    }
  }


  const handleRemoveInterest = async (interestToRemove: number) => {
    setIsSaving(true)
    try {
      // await api.delete(`/api/v1/interests/${interestToRemove.id}`)
      const res = await api.delete(`http://localhost:8080/api/v1/interests/${interestToRemove}`)
      console.log(res.data)
      // setUserInterests(prev => prev.filter(interest => interest.id !== interestToRemove.id))
       // Assuming the response contains the updated user object
       if (res.data && res.data.user) {
        // Update the state with the new interests
        setUserInterests(res.data.user.interest);
    }
    } catch (error) {
      console.error('Failed to remove interest:', error)
    } finally {
      setIsSaving(false)
    }
  }


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#000000]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#000000] py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-2xl mx-auto bg-transparent border-none text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-[#50E3C2]">Manage Your Interests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Your Current Interests</h2>
              <div className="flex flex-wrap gap-2">
              {userInterests?.map((interest) => (
                <Button
                  key={interest.id}
                  variant="outline"
                  className="bg-gray-800 text-[#50E3C2] hover:bg-gray-700"
                  onClick={() => handleRemoveInterest(interest.id)}
                >
                  {interest.interest} ✕
                </Button>
              ))}
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Add New Interest</h2>
              <div className="flex space-x-2">
                <Input
                  type="text"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  placeholder="Enter new interest"
                  className="flex-grow bg-gray-800 text-white border-gray-700 focus:border-[#50E3C2]"
                />
                <Button
                  onClick={handleAddInterest}
                  disabled={isSaving}
                  className="bg-[#50E3C2] text-black hover:bg-[#4FACFE] transition-colors"
                >
                  {isSaving ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                    />
                  ) : (
                    "Add"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default withAuth(Page)

