import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useUserContext } from '../context/UserContext';

interface Address {
  street: string;
  city: string;
}

interface Company {
  name: string;
}

export interface User {
  id?: number;
  name: string;
  email: string;
  phone: string;
  username: string;
  address: Address;
  company: Company;
  website: string;
}

interface UserFormProps {
  user?: User;
}

const UserForm: React.FC<UserFormProps> = ({ user }) => {
  const { createUser, updateUser } = useUserContext();
  const generateUsername = (name: string | undefined): string => {
    if (name) {
      const firstPart = name.split(' ')[0] || '';
      return `USER-${firstPart}`;
    }
    return 'USER-';
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      username: user?.username || generateUsername(user?.name),
      address: {
        street: user?.address?.street || '',
        city: user?.address?.city || '',
      },
      company: {
        name: user?.company?.name || '',
      },
      website: user?.website || '',
    },
  });

  

  const onSubmit: SubmitHandler<User> = async (data) => {
    if (user && user.id) {
      await updateUser(user.id, data);
    } else {
      await createUser(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col justify-center items-center p-10">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          {...register('name', {
            required: 'Name is required',
            minLength: { value: 3, message: 'Minimum length is 3' },
          })}
          placeholder="Name"
          className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
            errors.name ? 'border-red-500' : ''
          }`}
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
      </div>

      {/* ... (other form fields remain the same) ... */}

      <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-2 rounded hover:bg-indigo-700">
        {user ? 'Update User' : 'Create User'}
      </button>
    </form>
  );
};

export default UserForm;