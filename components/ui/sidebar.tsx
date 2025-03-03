"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, Wrench, MessageSquare, LifeBuoy, Settings, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/services", label: "Services", icon: Wrench },
  { href: "/inquiries", label: "Inquiries", icon: MessageSquare },
  { href: "/support", label: "Support", icon: LifeBuoy },
  { href: "/settings", label: "Settings", icon: Settings },
]

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isExpanded, setIsExpanded] = React.useState(true)

  return <SidebarContext.Provider value={{ isExpanded, setIsExpanded }}>{children}</SidebarContext.Provider>
}

const SidebarContext = React.createContext<
  | {
      isExpanded: boolean
      setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>
    }
  | undefined
>(undefined)

export function Sidebar() {
  const pathname = usePathname()
  const context = React.useContext(SidebarContext)

  if (!context) {
    throw new Error("Sidebar must be used within a SidebarProvider")
  }

  const { isExpanded, setIsExpanded } = context

  return (
    <aside
      className={cn("bg-gray-800 text-white transition-all duration-300 ease-in-out", isExpanded ? "w-64" : "w-20")}
    >
      <div className="flex flex-col h-full">
        <div className="p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mb-6 w-full flex justify-end"
          >
            {isExpanded ? <ChevronLeft /> : <ChevronRight />}
          </Button>
          <nav>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700",
                      pathname === item.href && "bg-gray-700",
                      !isExpanded && "justify-center",
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {isExpanded && <span>{item.label}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  )
}

export const SidebarContent = () => null
export const SidebarFooter = () => null
export const SidebarGroup = () => null
export const SidebarGroupAction = () => null
export const SidebarGroupContent = () => null
export const SidebarGroupLabel = () => null
export const SidebarHeader = () => null
export const SidebarInput = () => null
export const SidebarInset = () => null
export const SidebarMenu = () => null
export const SidebarMenuAction = () => null
export const SidebarMenuBadge = () => null
export const SidebarMenuButton = () => null
export const SidebarMenuItem = () => null
export const SidebarMenuSkeleton = () => null
export const SidebarMenuSub = () => null
export const SidebarMenuSubButton = () => null
export const SidebarMenuSubItem = () => null
export const SidebarRail = () => null
export const SidebarSeparator = () => null
export const SidebarTrigger = () => null

