"use client";

import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// add comment

// API Endpoint
const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function Home() {
  const [users, setUsers] = useState([]); // State for the users list
  const [formData, setFormData] = useState({ name: "", email: "", password: "", age: 0, username: "", gender: "" }); // State for form data
  
  

  // Fetch Users
  const fetchUsers = () => {
    console.log({API_URL})
    
    if(!API_URL){
      return
    }


    fetch(API_URL)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        return response.json();
      })
      .then((data) => setUsers(data))
      .catch((error) => {
        console.error("Error fetching users:", error);
        alert("Failed to fetch users. Check console for details.");
      });
  };

  // Handle Input Change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    console.log({name, value})

    setFormData({ ...formData, [name]: value });
  };

  // Add User
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, password, username, age, gender  } = formData;

    console.log({API_URL})
    
    if(!API_URL){
      return
    }

    if (name && email && password && username && age && gender) {
      fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, age, email, username, password, gender }),
      })
        .then((response) => {
          if (!response.ok) throw new Error(`Failed to add user`);
          fetchUsers();
          setFormData({ name: "", email: "", password: "", username: "", age: 0, gender: "" }); // Reset form
        })
        .catch((error) => {
          console.error("Error adding user:", error);
          alert("Failed to add user. Check console for details.");
        });
    } else {
      alert("Please fill out all fields.");
    }
  };

  // Delete User
  const handleDeleteUser = (id: number) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to delete user");
        fetchUsers();
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        alert("Failed to delete user. Check console for details.");
      });
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom color="textPrimary">
          CRUD Application
        </Typography>

        {/* User Form */}
        <form onSubmit={handleAddUser}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            margin="normal"
            required
          />
          <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
            Add User
          </Button>
        </form>

        {/* Users List */}
        <Typography variant="h6" color="textPrimary" sx={{ mt: 4 }}>
          Users List
        </Typography>
        <List>
          {users.map((user: any) => (
            <ListItem key={user.id} divider>
              <ListItemText primary={`${user.name} (${user.email})`} />
              <ListItemSecondaryAction>
                <IconButton edge="end" color="error" onClick={() => handleDeleteUser(user.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}
