"use client"

import { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const fetchUsers = async (): Promise<User[]> => {
  return [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Support" },
  ];
};

const createUser = async (user: Omit<User, "id">): Promise<User> => {
  return { ...user, id: Math.floor(Math.random() * 1000) };
};

const updateUser = async (user: User): Promise<boolean> => {
  return true;
};

const deleteUser = async (id: number): Promise<boolean> => {
  return true;
};

export default function SettingsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadUsers = async () => {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    };
    loadUsers();
  }, []);

  const handleAdd = () => {
    setCurrentUser(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (user: User) => {
    setCurrentUser(user);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    const success = await deleteUser(id);
    if (success) {
      setUsers(users.filter((user) => user.id !== id));
      toast({ title: "User Deleted", description: "The user has been successfully deleted." });
    } else {
      toast({ title: "Error", description: "Failed to delete user.", variant: "destructive" });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      role: formData.get("role") as string,
    };

    if (currentUser) {
      const success = await updateUser({ ...userData, id: currentUser.id });
      if (success) {
        setUsers(users.map((user) => (user.id === currentUser.id ? { ...user, ...userData } : user)));
        toast({ title: "User Updated", description: "The user has been successfully updated." });
      }
    } else {
      const newUser = await createUser(userData);
      setUsers([...users, newUser]);
      toast({ title: "User Added", description: "The new user has been successfully added." });
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">User Management</h1>
        <Button onClick={handleAdd}><Plus className="mr-2 h-4 w-4" /> Add User</Button>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <Input placeholder="Search users..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]"><SelectValue placeholder="Sort by" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Sort by Name</SelectItem>
            <SelectItem value="role">Sort by Role</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" onClick={() => handleEdit(user)}><Edit className="h-4 w-4" /></Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(user.id)}><Trash2 className="h-4 w-4" /></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{currentUser ? "Edit User" : "Add New User"}</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit}>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" defaultValue={currentUser?.name} required />
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" defaultValue={currentUser?.email} required />
            <Label htmlFor="role">Role</Label>
            <Input id="role" name="role" defaultValue={currentUser?.role} required />
            <Button type="submit">Save</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}