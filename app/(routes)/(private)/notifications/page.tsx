"use client";

import React, { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Bell, CheckCircle, AlertCircle, Trash2 } from 'lucide-react';
import { useAuthStore } from '@/store/use-auth'
import api from "@/app/api/axiosConfig"
import withAuth from '@/components/withAuth'
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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

interface Notification {
  id: string
  productName: string
  message: string
  createdAt: string
  sent: Boolean

}

const NotificationCard: React.FC<{ notification: Notification; onDelete: (id: string) => void }> = ({ notification, onDelete }) => (
  <Card className="mb-4 bg-gray-800 text-white">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-[#50E3C2]">
        {notification.productName}
      </CardTitle>
      <Badge className={`${notification.sent && "text-green-500 bg-gray-300"} border-transparent bg-primary shadow hover:bg-primary/80`}>
        {notification.sent ? "Sent" : "Unsend"}
      </Badge>
    </CardHeader>
    <CardContent>
      <p className="text-xs text-gray-400">{new Date(notification.createdAt).toLocaleString()}</p>
      <p className="mt-2 text-gray-300">{notification.message}</p>
      <div className="mt-4 flex justify-between items-center">
        {notification.sent === true && <CheckCircle className="h-4 w-4 text-green-500" />}
        {notification.sent === false && <AlertCircle className="h-4 w-4 text-yellow-500" />}
        <Button variant="ghost" size="sm" onClick={() => onDelete(notification.id)}>
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </div>
    </CardContent>
  </Card>
)

const NotificationsPage = () => {
  const [userNotifications, setUserNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { logout } = useAuthStore()
  const router = useRouter();

  useEffect(() => {
    const fetchUserNotifications = async () => {
      try {
        const response = await api.get('http://localhost:8080/api/v1/notifications')
        setUserNotifications(response.data.notifications)
        console.log(response.data.notifications, "fron noti")
      } catch (error) {
        console.error('Failed to fetch notifications:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserNotifications()
  }, [])

  const deleteNotification = async (id: string) => {
    try {
      await api.delete(`http://localhost:8080/api/v1/notifications/${id}`)
      setUserNotifications(userNotifications.filter(n => n.id !== id))
    } catch (error) {
      console.error('Failed to delete notification:', error)
    }
  }

  const handleLogout = async () => {
    await logout()
    router.push('/auth/login')
  }

  if (isLoading) {
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
            <h1 className="text-2xl font-bold text-center text-[#50E3C2] mb-6">Notifications</h1>
            {userNotifications.length ? <div className="grid gap-4 md:grid-cols-2">
              {userNotifications.map(notification => (
                <NotificationCard key={notification.id} notification={notification} onDelete={deleteNotification} />
              ))}
            </div> : <div><h1 className='text-2xl font-bold text-center text-white mb-6'>No notification for you yet</h1></div>}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default withAuth(NotificationsPage)