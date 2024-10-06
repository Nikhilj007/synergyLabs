import React, { useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { UserContext } from '../context/UserContext';

// Define the User type for better type safety
interface Address {
  street: string;
  city: string;
}

interface Company {
  name: string;
}

interface User {
  id?: number; // Optional for new user
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
  const { createUser, updateUser } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      username: user ? user.username : 'USER-' + (user?.name.split(' ')[0] || ''),
      address: {
        street: user?.address.street || '',
        city: user?.address.city || '',
      },
      company: {
        name: user?.company.name || '',
      },
      website: user?.website || '',
    },
  });

  const onSubmit: SubmitHandler<User> = async (data) => {
    const userData = { ...data, id: user ? user.id : Date.now() };
    if (user) {
      await updateUser(user.id, userData);
    } else {
      await createUser(userData);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col justify-center items-center p-10">
      <div>
        <label className="block  text-sm font-medium text-gray-700">Name</label>
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

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' },
          })}
          placeholder="Email"
          type="email"
          className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
            errors.email ? 'border-red-500' : ''
          }`}
        />
        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          {...register('phone', { required: 'Phone is required' })}
          placeholder="Phone"
          className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
            errors.phone ? 'border-red-500' : ''
          }`}
        />
        {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Username</label>
        <input
          {...register('username')}
          placeholder="Username"
          readOnly
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Street</label>
        <input
          {...register('address.street', { required: 'Street is required' })}
          placeholder="Street"
          className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
            errors.address?.street ? 'border-red-500' : ''
          }`}
        />
        {errors.address?.street && (
          <p className="text-red-500 text-xs">{errors.address.street.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">City</label>
        <input
          {...register('address.city', { required: 'City is required' })}
          placeholder="City"
          className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
            errors.address?.city ? 'border-red-500' : ''
          }`}
        />
        {errors.address?.city && <p className="text-red-500 text-xs">{errors.address.city.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Company Name</label>
        <input
          {...register('company.name', { minLength: { value: 3, message: 'Minimum length is 3' } })}
          placeholder="Company Name"
          className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
            errors.company?.name ? 'border-red-500' : ''
          }`}
        />
        {errors.company?.name && <p className="text-red-500 text-xs">{errors.company.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Website</label>
        <input
          {...register('website', { pattern: { value: /^(ftp|http|https):\/\/[^ "]+$/, message: 'Invalid URL' } })}
          placeholder="Website"
          className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
            errors.website ? 'border-red-500' : ''
          }`}
        />
        {errors.website && <p className="text-red-500 text-xs">{errors.website.message}</p>}
      </div>

      <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-2 rounded hover:bg-indigo-700">
        {user ? 'Update User' : 'Create User'}
      </button>
    </form>
  );
};

export default UserForm;
