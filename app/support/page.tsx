"use client"

import { useState, useEffect } from "react"
import { Search, Eye, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

interface Ticket {
  id: number
  customer: string
  subject: string
  date: string
  status: string
  assignedTo: string
}

const fetchSupportTickets = async (): Promise<Ticket[]> => {
  return [
    {
      id: 1,
      customer: "John Doe",
      subject: "Project Delay",
      date: "2023-06-15",
      status: "Open",
      assignedTo: "Support Agent 1",
    },
    {
      id: 2,
      customer: "Jane Smith",
      subject: "Invoice Question",
      date: "2023-06-14",
      status: "In Progress",
      assignedTo: "Support Agent 2",
    },
  ]
}

const updateTicketStatus = async (id: number, status: string): Promise<boolean> => {
  console.log(`Updating ticket ${id} status to ${status}`)
  return true
}

const addTicketResponse = async (id: number, response: string): Promise<boolean> => {
  console.log(`Adding response to ticket ${id}: ${response}`)
  return true
}

export default function SupportPage() {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [sortBy, setSortBy] = useState<string>("date")
  const [tickets, setTickets] = useState<Ticket[]>([])
  const { toast } = useToast()
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)

  useEffect(() => {
    const loadTickets = async () => {
      const fetchedTickets = await fetchSupportTickets()
      setTickets(fetchedTickets)
    }
    loadTickets()
  }, [])

  const filteredTickets = tickets
    .filter(ticket =>
      ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => sortBy === "date" ? new Date(b.date).getTime() - new Date(a.date).getTime() : a.customer.localeCompare(b.customer))

  const handleView = (ticket: Ticket) => setSelectedTicket(ticket)

  const handleStatusChange = async (id: number, status: string) => {
    if (await updateTicketStatus(id, status)) {
      setTickets(tickets.map(ticket => ticket.id === id ? { ...ticket, status } : ticket))
      toast({ title: "Status Updated", description: `Ticket status updated to ${status}.` })
    } else {
      toast({ title: "Error", description: "Failed to update ticket status.", variant: "destructive" })
    }
  }

  const handleAddResponse = async (id: number, response: string) => {
    if (await addTicketResponse(id, response)) {
      toast({ title: "Response Added", description: "Your response has been added." })
    } else {
      toast({ title: "Error", description: "Failed to add response.", variant: "destructive" })
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Support Tickets</h1>
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search tickets..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-8" />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Sort by Date</SelectItem>
            <SelectItem value="customer">Sort by Customer</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTickets.map(ticket => (
            <TableRow key={ticket.id}>
              <TableCell>{ticket.customer}</TableCell>
              <TableCell>{ticket.subject}</TableCell>
              <TableCell>{ticket.date}</TableCell>
              <TableCell>{ticket.status}</TableCell>
              <TableCell>{ticket.assignedTo}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleView(ticket)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
