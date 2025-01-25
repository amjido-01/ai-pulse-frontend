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
import Confetti from "react-confetti";
import { useWindowSize } from "react-use"
import Image from 'next/image';
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"



// interface NewsArticle {
//   title: string;
//   description: string;
//   source: {
//     name: string;
//   };
//   publishedAt: string;
//   url: string;
//   imageUrl?: string | null;
// }

// interface NewsApiResponse {
//   status: string;
//   articles: NewsArticle[];
// }


function Dashboard() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  // const [news, setNews] = useState<NewsArticle[]>([])
  const [showConfetti, setShowConfetti] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [isNewUser, setIsNewUser] = useState(false)

  const { width, height } = useWindowSize()

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const interests = user?.interest;
        if (!interests || !interests.length) {
          setIsDialogOpen(true)
          return
        }


        // Check if the user is coming from the onboarding/frequency page
        const previousPath = sessionStorage.getItem("previousPath")
        console.log(previousPath, "prev")
        const isNewUser = previousPath === "/onboarding/frequency"
        setIsNewUser(isNewUser)

        if (isNewUser) {
          setShowConfetti(true)
          setTimeout(() => setShowConfetti(false), 5000) // Stop confetti after 5 seconds
        }

        // Clear the previous path from session storage
        sessionStorage.removeItem("previousPath")
        
        // Fetch news from News API
        // const response = await fetch(
        //   'https://newsapi.org/v2/everything?q=ai&from=2025-01-15&to=2025-01-20&sortBy=popularity&apiKey=33e9129ff38a4802b885ba5c80f01051'
        // );
        // const data: NewsApiResponse = await response.json();
        
        // if (data.status === 'ok') {
        //   // Filter out removed articles and get first 6 valid articles
        //   const validArticles = data.articles
        //     .filter(article => 
        //       article.title !== '[Removed]' && 
        //       article.description !== '[Removed]' &&
        //       article.url !== 'https://removed.com' &&
        //       article.source.name !== '[Removed]'
        //     )
        //     .slice(0, 6);
            
        //   setNews(validArticles);
        // } else {
        //   console.error('Failed to fetch news');
        // }

      } catch (error) {
        console.error('Failed to load dashboard:', error)
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [user?.interest])

  const handleLogout = async () => {
    await logout()
    router.push('/auth/login')
  }

  const handleRedirectToInterests = () => {
    setIsDialogOpen(false)
    router.push('/onboarding')
  }

  
  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement feedback submission
    console.log("Feedback submitted:", feedback)
    setFeedback("")
    // Show a thank you message or notification here
  }

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-[#000000]">Loading...</div>
  }

  console.log(user?.notifications)
  console.log(user?.interest)
  const sentNotifications = user?.notifications.filter(item => item.sent)
  const pendingNotifications = user?.notifications.filter(item => !item.sent)
  console.log(typeof sentNotifications)

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
          {showConfetti &&   <Confetti
              width={width}
              height={height}
            />}
          <h1 className="text-2xl font-bold text-white mb-6">
              {isNewUser ? `Welcome, ${user?.name}!` : `Welcome back, ${user?.name}!`}
            </h1>

            
            {isNewUser && (
              <Alert className="mb-6">
                <AlertTitle>Welcome to our AI Product Notification App!</AlertTitle>
                <AlertDescription>
                  We're excited to have you on board. Sit back and relax while we prepare notifications based on your
                  selected interests.
                </AlertDescription>
              </Alert>
            )}
            
            <div className="grid gap-6 md:grid-cols-3 mb-6">
              <QuickStat title="Interest" value={user?.interest?.length || 0} />
              <QuickStat title="Sent Notifications" value={sentNotifications?.length || 0} />
              <QuickStat title="Pending Notifications" value={pendingNotifications?.length || 0} />
            </div>

            <Alert className="mb-6">
              <AlertTitle>Waiting for AI Product Updates</AlertTitle>
              <AlertDescription>
                We're constantly scanning for new AI products that match your interests. You'll receive notifications
                based on your selected frequency.
              </AlertDescription>
            </Alert>

            
            <div className="bg-gray-800 rounded-xl p-6 mb-6">
              <h2 className="text-xl font-semibold text-white mb-4">Help Us Improve</h2>
              <form onSubmit={handleFeedbackSubmit} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="What feature would you like to see next?"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="flex-grow"
                />
                <Button type="submit">Submit</Button>
              </form>
            </div>

            {/* <h2 className="text-xl font-semibold text-white mb-4">Latest AI News</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {news.map((article, index) => (
                <ArticleCard 
                  key={index}
                  title={article.title}
                  excerpt={article.description}
                  source={article.source.name}
                  date={new Date(article.publishedAt).toLocaleDateString()}
                  url={article.url}
                  imageUrl={article.imageUrl}
                />
              ))}
            </div> */}

            <h2 className="text-xl font-semibold text-white mt-6 mb-4">Your Interests</h2>
            <div className="flex flex-wrap gap-2">
              {user?.interest?.map((interest) => (
                <Button key={interest.id} variant="outline" className="bg-gray-800 text-white hover:bg-gray-700">
                  {interest.interest}
                </Button>
              ))}
            </div>

            {/* <h2 className="text-xl font-semibold text-white mt-6 mb-4">Trending Topics</h2>
            <div className="flex flex-wrap gap-2">
              {['GPT-4', 'Quantum Computing', 'Robotics', 'Neural Networks'].map((topic) => (
                <Button key={topic} variant="outline" className="bg-gray-800 text-white hover:bg-gray-700">
                  {topic}
                </Button>
              ))}
            </div> */}
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

// function ArticleCard({ 
//   title, 
//   excerpt, 
//   source, 
//   date,
//   url,
//   imageUrl 
// }: { 
//   title: string, 
//   excerpt: string, 
//   source: string, 
//   date: string,
//   url: string,
//   imageUrl?: string | null
// }) {
//   return (
//     <div className="bg-gray-800 rounded-xl p-4 flex flex-col">
//       {imageUrl && (
//         <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
//           <Image 
//             src={imageUrl || "/placeholder.svg"} 
//             alt={title}
//             className="object-cover w-full h-full"
//             onError={(e) => {
//               e.currentTarget.style.display = 'none'
//             }}
//           />
//         </div>
//       )}
//       <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">{title}</h3>
//       <p className="text-gray-400 mb-4 line-clamp-3 flex-grow">{excerpt}</p>
//       <div className="flex justify-between items-center mt-auto">
//         <span className="text-sm text-gray-500">{source} • {date}</span>
//         <Button 
//           variant="outline" 
//           size="sm" 
//           className=" hover:text-white hover:bg-gray-700"
//           onClick={() => window.open(url, '_blank')}
//         >
//           Read More
//         </Button>
//       </div>
//     </div>
//   )
// }

export default withAuth(Dashboard);