"use client"

import { Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

export function Header({ className, userRole }: { className?: string; userRole: string }) {
  const router = useRouter()

  const handleSignOut = () => {
    // Implement sign out logic here
    router.push("/signin")
  }
const handleSetting = () =>{
  router.push("/settings")
}
  return (
    <header className={`bg-white shadow-md py-4 px-6 flex justify-between items-center ${className}`}>
      <h1 className="text-2xl font-bold">RMC.</h1>
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-gray-600">{userRole}</span>
      
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
        
            <DropdownMenuItem onClick={handleSetting}>Settings</DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

