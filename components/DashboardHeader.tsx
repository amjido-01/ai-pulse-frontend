'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, User } from 'lucide-react'
import { useAuthStore } from '@/store/use-auth'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DashboardHeader() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()
  const { user, logout } = useAuthStore()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality here
    console.log('Searching for:', searchQuery)
    // You might want to navigate to a search results page
    // router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
  }

  const handleLogout = async () => {
    await logout()
    router.push('/auth/login')
  }

  return (
    <header className="bg-[#000000] border-2 border-red-500 text-white p-4 flex items-center justify-between">
      <Link href="/dashboard" className="text-2xl font-bold text-[#50E3C2]">
        AI Pulse
      </Link>

      <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search AI topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#50E3C2]"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </form>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
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
  )
}

