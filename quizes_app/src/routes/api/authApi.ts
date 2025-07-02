import { Elysia } from 'elysia';
import { OAuth2Client } from 'google-auth-library';
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  REDIRECT_URL,
} from '$env/static/private';
import { findOrCreateUser, getUserInfo } from '../../server/userServer';

const oauth2Client = new OAuth2Client(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  REDIRECT_URL
);

const authApi = new Elysia()
  .get('/login', ({ redirect }) => {
    const authorizationUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: ['profile', 'email'],
      redirect_uri: 'http://localhost:5173/api/auth/callback/google',
    });
    return redirect(authorizationUrl);
  })
  .get('auth/callback/google', async ({ redirect, query }) => {
    const { code } = query;
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    console.log('Tokens acquired:', tokens);
    const userData = await getUserInfo(tokens)
    const user = await findOrCreateUser(userData)
    console.log('User data:', user);


    return redirect('http://localhost:5173/quiz');
  });

export default authApi;
