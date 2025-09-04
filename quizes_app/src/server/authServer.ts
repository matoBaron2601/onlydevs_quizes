import { goto } from '$app/navigation';
import { getUserById } from './userServer';

export const login = async () => {
  const response = await fetch('http://localhost:5173/api/login', {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response;
};

export const getAuthUser = async () => {
  const response = await fetch('http://localhost:5173/api/auth/user', {
    method: 'GET',
    credentials: 'include',
  });

  if (response.status === 401) {
    goto('/login');
    return;
  }

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  console.log('User is authenticated');
  return response.json();
};
