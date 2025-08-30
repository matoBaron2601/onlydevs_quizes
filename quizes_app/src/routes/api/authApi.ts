import { Elysia } from 'elysia';
import { OAuth2Client } from 'google-auth-library';
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  REDIRECT_URL,
} from '$env/static/private';
import { findOrCreateUser, getUserInfo } from '../../server/userServer';
import { jwt } from '@elysiajs/jwt'; // For JWT
import { config } from 'dotenv';
config();

export const oauth2Client = new OAuth2Client(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  REDIRECT_URL
);

const authApi = new Elysia()
  .use(
    jwt({
      name: 'jwt',
      secret: 'YourSuperSecretKey', // Replace with your own secret
      exp: '7d', // JWT expiration set to 7 days
    })
  )
  .get('/login', ({ redirect }) => {
    const authorizationUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: ['profile', 'email'],
      redirect_uri: 'http://localhost:5173/api/auth/callback/google',
    });
    const res = redirect(authorizationUrl);
    return res;
  })

  .get(
    'auth/callback/google',
    async ({ redirect, query, jwt, cookie: { auth } }) => {
      const { code } = query;
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);
      console.log('Tokens acquired:', tokens);
      const userData = await getUserInfo(tokens);
      const user = await findOrCreateUser(userData);
      const value = await jwt.sign({ userId: user.id, email: user.email });
      auth.set({
        value,
        httpOnly: true,
        maxAge: 7 * 86400,
        path: '/',
      });
      return redirect('http://localhost:5173');
    }
  )
  .get('/auth/user', async ({ jwt, cookie: { auth }, status }) => {
    try {
      const profile = await jwt.verify(auth.value);
      return profile
    } catch (error) {
      console.error('JWT verification error:', error);
      return status(401, 'Unauthorized'); // Return 401 if JWT is invalid
    }
  });

export default authApi;
