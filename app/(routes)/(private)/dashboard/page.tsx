"use client";

import { useAuthStore } from "@/store/use-auth";
import { useRouter } from "next/navigation";
import withAuth from "@/components/withAuth";
import { useState, useEffect } from 'react'
import Link from "next/link";
import { AppSidebar } from "@/components/app-sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

function Dashboard() {
  const { user, 
   logout
   } = useAuthStore();
  const router = useRouter();
  console.log(router)
    const [loading, setLoading] = useState(true)
    // const { user, fetchInterests } = useAuthStore()
  
  console.log(user)
    useEffect(() => {
      const loadDashboard = async () => {
        try {
          // const interests = await fetchInterests()
          // Fetch news based on interests
          // This is a placeholder. In a real app, you'd call your backend API
          // const fetchedNews = await fetchNews(interests)
          // setNews(fetchedNews)
        } catch (error) {
          console.error('Failed to load dashboard:', error)
        } finally {
          setLoading(false)
        }
      }
  
      loadDashboard()
    }, 
    //[fetchInterests]
  )

  const handleLogout = async () => {
    await logout()
    router.push('/auth/login')
  }
  
    if (loading) {
      return <div>Loading...</div>
    }

    return (
      <SidebarProvider>
        <AppSidebar className="bg-red-500"/>
        <SidebarInset>
          <header className="flex bg-[#000000] justify-between h-16 shrink-0 items-center border-b px-4">
            <SidebarTrigger className="-ml-1 text-white" /> 
            
            <DropdownMenu>
        <DropdownMenuTrigger asChild className="border-2 bg-white">
          <Button variant="ghost" className="w-10 h-10 rounded-full p-0">
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
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
}

export default withAuth(Dashboard);