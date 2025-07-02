import type { Credentials } from 'google-auth-library';
import { db } from '../db/client';
import { user } from '../db/schema';
import { eq } from 'drizzle-orm';
import type { User } from '../types/userTypes';

interface UserInfo {
  sub: string;
  name?: string;
  picture?: string;
  email?: string;
}
export const getUserInfo = async (tokens: Credentials): Promise<User> => {
  const userInfoResponse = await fetch(
    'https://openidconnect.googleapis.com/v1/userinfo',
    {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    }
  );
  const userInfo: UserInfo = await userInfoResponse.json();
  const userData = {
    id: userInfo.sub,
    name: userInfo.name || '',
    email: userInfo.email || '',
    profilePicture: userInfo.picture || '',
  };
  return userData;
};

export const getUserById = async (userId: string): Promise<User> => {
  const [existingUser] = await db
    .select()
    .from(user)
    .where(eq(user.id, userId));
  return existingUser;
};
export const createUser = async (userData: User): Promise<User> => {
  const [createdUser] = await db.insert(user).values(userData).returning();
  console.log('User created:', createdUser);
  return createdUser;
};

export const findOrCreateUser = async (userData: User): Promise<User> => {
  const existingUser = await getUserById(userData.id);
  if (existingUser) {
    return existingUser;
  }
  return createUser(userData);
};
