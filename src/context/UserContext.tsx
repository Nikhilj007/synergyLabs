import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  username: string;
  address: {
    street: string;
    city: string;
  };  
  company: {
    name: string;
  };
  website: string;
}

interface UserContextType {
  users: User[];
  loading: boolean;
  error: string | null;
  createUser: (user: User) => Promise<void>;
  updateUser: (id: number, updatedUser: User) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
      } catch (error) {
        setError('Error fetching users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const createUser = async (user: User) => {
    try {
      const response = await axios.post<User>('https://jsonplaceholder.typicode.com/users', user);
      setUsers((prevUsers) => [...prevUsers, response.data]);
    } catch (error) {
      setError('Error creating user');
    }
  };

  const updateUser = async (id: number, updatedUser: User) => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updatedUser);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === id ? { ...user, ...updatedUser } : user))
      );
    } catch (error) {
      setError('Error updating user');
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      setError('Error deleting user');
    }
  };

  return (
    <UserContext.Provider value={{users, loading, error, createUser, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};
