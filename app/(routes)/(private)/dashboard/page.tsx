"use client";

import { useAuthStore } from "@/store/use-auth";
import { DashboardHeader } from "@/components/DashboardHeader";
import { useRouter } from "next/navigation";
import withAuth from "@/components/withAuth";
import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

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
  
    // return (
    //   <div className="min-h-screen bg-[#000000] text-white p-8">
    //     <DashboardHeader />

      
  
    //     <Tabs defaultValue="foryou" className="mb-8">
    //       <TabsList className="bg-[#1A1A1A]">
    //         <TabsTrigger value="foryou">For You</TabsTrigger>
    //         <TabsTrigger value="latest">Latest</TabsTrigger>
    //         <TabsTrigger value="trending">Trending</TabsTrigger>
    //       </TabsList>
    //       <TabsContent value="foryou">
    //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //           {/* {news.map((item) => ( */}
    //             {/*  <NewsCard key={item?.id} news={item} /> */}
    //           {/* //))} */}
    //         </div>
    //       </TabsContent>
    //       <TabsContent value="latest">
    //         {/* Similar structure to "For You" tab */}
    //       </TabsContent>
    //       <TabsContent value="trending">
    //         {/* Similar structure to "For You" tab */}
    //       </TabsContent>
    //     </Tabs>
  
    //     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    //       <Card className="col-span-2 bg-[#1A1A1A] border-[#333]">
    //         <CardHeader>
    //           <CardTitle>Your AI Digest</CardTitle>
    //         </CardHeader>
    //         <CardContent>
    //           {/* Add a summary or highlights of key AI news */}
    //         </CardContent>
    //       </Card>
    //       <div className="space-y-6">
    //         <TrendingTopics />
    //         <RecommendedSources />
    //       </div>
    //     </div>
    //   </div>
    // )

    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">
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
