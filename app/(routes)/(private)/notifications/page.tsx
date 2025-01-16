"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import api from "@/app/api/axiosConfig"
import { motion } from "framer-motion"
const page = () => {
  const [userNotifications, setUserNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  useEffect(() => {
    const fetchUserNotifications = async () => {
      try {
        const response = await api.get('http://localhost:8080/api/v1/notifications')
        console.log(response.data)
        setUserNotifications(response.data.notifications)
      } catch (error) {
        console.error('Failed to fetch notification:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserNotifications()
  }, [])

  console.log(userNotifications)


  
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
    <div className='min-h-screen bg-[#000000] py-12 px-4 sm:px-6 lg:px-8'>

    </div>
  )
}

export default page