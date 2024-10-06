import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
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

export interface UserContextType {
  users: User[];
  loading: boolean;
  error: string | null;
  createUser: (user: Omit<User, 'id'>) => Promise<void>;
  updateUser: (id: number, updatedUser: Partial<User>) => Promise<void>;
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

  const createUser = async (user: Omit<User, 'id'>) => {
    try {
      const response = await axios.post<User>('https://jsonplaceholder.typicode.com/users', user);
      setUsers((prevUsers) => [...prevUsers, response.data]);
    } catch (error) {
      setError('Error creating user');
    }
  };

  const updateUser = async (id: number, updatedUser: Partial<User>) => {
    try {
      const response = await axios.put<User>(`https://jsonplaceholder.typicode.com/users/${id}`, updatedUser);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === id ? { ...user, ...response.data } : user))
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

  const contextValue: UserContextType = {
    users,
    loading,
    error,
    createUser,
    updateUser,
    deleteUser
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using the UserContext
export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};