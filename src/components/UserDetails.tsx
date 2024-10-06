import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import UserForm from './UserForm';

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userContext = useContext(UserContext);

  if (!userContext) {
    return <p>User context not found</p>;
  }

  const { users } = userContext;
  const user = users.find((user) => user.id === parseInt(id || '', 10));

  return (
    <div>
      {user ? <UserForm user={user} /> : <p>User not found</p>}
    </div>
  );
};

export default UserDetail;