"use client";

import { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User } from 'lucide-react';

import { useAuthStore } from "@/store/use-auth";
import withAuth from "@/components/withAuth";
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button";
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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

function Dashboard() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [news, setNews] = useState([])

  useEffect(() => {
    const loadDashboard = async () => {
      try {
         // Fetch user interests
         const interests = user?.interest;
         if (!interests || !interests.length) {
           setIsDialogOpen(true)
           return
         }
        
        // Fetch news based on interests (placeholder)
        const fetchedNews = await fetchNews(interests)
        setNews(fetchedNews)
      } catch (error) {
        console.error('Failed to load dashboard:', error)
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [])

  const handleLogout = async () => {
    await logout()
    router.push('/auth/login')
  }

  const handleRedirectToInterests = () => {
    setIsDialogOpen(false)
    router.push('/onboarding')
  }
  console.log(user)

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-[#000000]">Loading...</div>
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
            <h1 className="text-2xl font-bold text-white mb-6">Welcome back, {user?.name}!</h1>
            
            <div className="grid gap-6 md:grid-cols-3 mb-6">
              <QuickStat title="Interest" value={user?.interest.length as number} />
              <QuickStat title="Saved Articles" value="5" />
              <QuickStat title="Top Interest" value="Machine Learning" />
            </div>

            <h2 className="text-xl font-semibold text-white mb-4">Latest AI News</h2>
            <div className="grid gap-4 md:grid-cols-3 border-2 border-red-500">
              {news.map((article, index) => (
                <ArticleCard key={index} {...article} />
              ))}
            </div>

            <h2 className="text-xl font-semibold text-white mt-6 mb-4">Trending Topics</h2>
            <div className="flex flex-wrap gap-2">
              {['GPT-4', 'Quantum Computing', 'Robotics', 'Neural Networks'].map((topic) => (
                <Button key={topic} variant="outline" className="bg-gray-800 text-white hover:bg-gray-700">
                  {topic}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </SidebarInset>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-[#50E3C2]">Select Interests</DialogTitle>
            <DialogDescription className="text-gray-300">
              Please select at least one interest to discover AI products tailored to your preferences.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <Button 
              onClick={handleRedirectToInterests}
              className="w-full bg-[#50E3C2] text-black hover:bg-[#4FACFE] transition-colors"
            >
              Go to Interests
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  )
}

function QuickStat({ title, value }: { title: string, value: number }) {
  return (
    <div className="bg-gray-800 rounded-xl p-4">
      <h3 className="text-lg font-medium text-gray-400">{title}</h3>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  )
}

function ArticleCard({ title, excerpt, source, date }: { title: string, excerpt: string, source: string, date: string }) {
  return (
    <div className="bg-gray-800 rounded-xl p-4">
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 mb-4">{excerpt}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{source} • {date}</span>
        <Button variant="outline" size="sm" className="text-white hover:bg-gray-700">
          Save
        </Button>
      </div>
    </div>
  )
}

// Placeholder function for fetching news
async function fetchNews(interests: string[]) {
  // This would be replaced with an actual API call
  return [
    {
      title: "Breakthrough in Quantum Computing",
      excerpt: "Scientists achieve new milestone in quantum supremacy...",
      source: "Tech News",
      date: "2023-06-15"
    },
    {
      title: "AI Ethics: The Road Ahead",
      excerpt: "Experts discuss the future of AI governance and ethics...",
      source: "AI Journal",
      date: "2023-06-14"
    },
    {
      title: "Machine Learning in Healthcare",
      excerpt: "New ML models show promise in early disease detection...",
      source: "Health Tech Today",
      date: "2023-06-13"
    }
  ]
}

export default withAuth(Dashboard);
// api key oISmk6TGsTnbB--fGbtoQ_M1vBm-IbCVs2Gtl7UhoUQ 
// api scret  Ce6MVBCjU2P0M673zY3Qiz9K8Hz7RoPJQt6qw3AJlHY