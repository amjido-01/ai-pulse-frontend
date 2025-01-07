import * as React from "react"
import Link from "next/link"
import { BrainCircuit } from "lucide-react"
import { usePathname } from "next/navigation"
// import { SearchForm } from "@/components/search-form"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const sidebarLinks = [
  {
    title: "Dashboard",
    url: "/dashboard"
  },
  {
    title: "Interests",
    url: "/interests",
  },
  {
    title: "Notifications",
    url: "/notifications",
  },
  {
    title: "Explore",
    url: "/explore",
  },
  {
    title: "Saved Articles",
    url: "/saved-articles",
  },
  {
    title: "Settings",
    url: "/settings",
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        {/* <SearchForm /> */}
        <Link className="flex items-center justify-center" href="#">
          <BrainCircuit className="h-8 w-8 text-[#50E3C2]" />
          <span className="ml-2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#50E3C2] to-[#4FACFE]">
            AI Pulse
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="mt-10">
        <SidebarMenu>
          {sidebarLinks.map((item) => {
            const isActive = pathname === item.url
            return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={isActive}>
                <Link href={item.url}>{item.title}</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            )
            })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}