"use client";

import { useAuthStore } from "@/store/use-auth";
import { useRouter } from "next/navigation";
import withAuth from "@/components/withAuth";
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BellIcon, 
  //SearchIcon, 
  BookmarkIcon, 
  //TrendingUpIcon 
} from 'lucide-react'
// import NewsCard from '@/components/NewsCard'
import TrendingTopics from '@/components/TrendingTopics'
import RecommendedSources from '@/components/RecommendedSources'

function Dashboard() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  // const [news, setNews] = useState([])
    const [loading, setLoading] = useState(true)
    // const { user, fetchInterests } = useAuthStore()
  const handleLogout = async () => {
    await logout();
    router.push("/auth/login");
  };
    
  
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
  
    // Placeholder function to simulate fetching news
    // const fetchNews = async (interests) => {
    //   // This would be replaced with an actual API call
    //   return [
    //     { id: 1, title: "New GPT-4 Breakthrough", category: "Natural Language Processing" },
    //     { id: 2, title: "AI in Healthcare: Latest Advancements", category: "Healthcare" },
    //     { id: 3, title: "Robotics Revolution in Manufacturing", category: "Robotics" },
    //     // ... more news items
    //   ]
    // }
  
    if (loading) {
      return <div>Loading...</div>
    }
  
    return (
      <div className="min-h-screen bg-[#000000] text-white p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Welcome back, {user?.name}</h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <BellIcon className="h-5 w-5" />
            </Button>
            <Button onClick={handleLogout} variant="ghost" size="icon">
              <BookmarkIcon  className="h-5 w-5" />
            </Button>
          </div>
        </header>
  
        <div className="mb-8">
          <Input 
            type="search" 
            placeholder="Search AI news..." 
            className="w-full bg-[#1A1A1A] border-[#333] text-white"
          />
        </div>
  
        <Tabs defaultValue="foryou" className="mb-8">
          <TabsList className="bg-[#1A1A1A]">
            <TabsTrigger value="foryou">For You</TabsTrigger>
            <TabsTrigger value="latest">Latest</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
          </TabsList>
          <TabsContent value="foryou">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* {news.map((item) => ( */}
                {/*  <NewsCard key={item?.id} news={item} /> */}
              {/* //))} */}
            </div>
          </TabsContent>
          <TabsContent value="latest">
            {/* Similar structure to "For You" tab */}
          </TabsContent>
          <TabsContent value="trending">
            {/* Similar structure to "For You" tab */}
          </TabsContent>
        </Tabs>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="col-span-2 bg-[#1A1A1A] border-[#333]">
            <CardHeader>
              <CardTitle>Your AI Digest</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Add a summary or highlights of key AI news */}
            </CardContent>
          </Card>
          <div className="space-y-6">
            <TrendingTopics />
            <RecommendedSources />
          </div>
        </div>
      </div>
    )
}

export default withAuth(Dashboard);
