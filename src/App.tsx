import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import UserList from './components/UserList';
import UserDetail from './components/UserDetails';

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <div>
          <h1>User Management</h1>
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/users/:id" element={<UserDetail />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
