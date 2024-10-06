import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';
import './UserList.css'; 

const UserList: React.FC = () => {
  const { users, loading, error, deleteUser } = useContext(UserContext);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user: any
         , index: any) => (
          <tr key={user.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>
              <Link to={`/users/${user.id}`}>Edit</Link>
              <button onClick={() => deleteUser(user.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserList;
