'use client'

import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import api from '@/app/api/axiosConfig'
import withAuth from '@/components/withAuth'
import { useAuthStore } from "@/store/use-auth"
import { AppSidebar } from "@/components/app-sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

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
  const { logout } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    const fetchInterests = async () => {
      console.log(isLoading)
      try {
        const response = await api.get('https://ai-pulse-backend.onrender.com/api/v1/interests')
        setUserInterests(response.data.interest)
      } catch (error) {
        console.error('Failed to fetch interests:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchInterests()
  }, [isLoading])

  const handleAddInterest = async () => {
    if (newInterest && !userInterests.some(i => i.interest === newInterest)) {
      setIsSaving(true)
      try {
        const updatedInterests = [...userInterests.map(i => i.interest), newInterest];
        const response = await api.post("https://ai-pulse-backend.onrender.com/api/v1/interests", { interests: updatedInterests })
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
      const res = await api.delete(`https://ai-pulse-backend.onrender.com/api/v1/interests/${interestToRemove}`)
      if (res.data && res.data.user) {
        setUserInterests(res.data.user.interest);
      }
    } catch (error) {
      console.error('Failed to remove interest:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogout = async () => {
    await logout()
    router.push('/auth/login')
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex bg-[#000000] justify-between h-16 shrink-0 items-center border-b px-4">
          <SidebarTrigger className="-ml-1 text-white" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-10 h-10 rounded-full p-0 bg-white">
                <User className="h-6 w-6" />
                <span className="sr-only">Open user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>    
        </header>
        <div className="bg-[#000000] relative flex flex-1 flex-col gap-4 p-4">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] opacity-50" />
          <div className="relative z-10">
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
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default withAuth(Page)

