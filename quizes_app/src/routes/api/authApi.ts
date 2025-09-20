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
import getExpTimestamp from '../../redis/utils';
import { RedisClientConfig } from '../../redis/RedisClient';
config();
// https://sadewawicak25.medium.com/jwt-authentication-elysia-js-with-redis-3-3290a59bf2bf
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
    async ({ redirect, query, jwt, cookie: { auth }, set }) => {
      const { code } = query;
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);
      console.log('Tokens acquired:', tokens);
      const userData = await getUserInfo(tokens);
      const user = await findOrCreateUser(userData);
      const accessJWTToken = await jwt.sign({
        sub: user.id,
        exp: getExpTimestamp(60 * 60 * 24), // 1 day
        iat: true,
      });
      auth.set({
        value: accessJWTToken,
        httpOnly: true,
        maxAge: 60 * 60 * 24, // 1 day
        sameSite: 'lax',
        path: '/',
        secure: true,
      });

      return redirect('http://localhost:5173');
    }
  )
  .get('/auth/user', async ({ jwt, cookie: { auth }, status }) => {
    try {
      const profile = await jwt.verify(auth.value);
      if (!profile) {
        return status(401, 'Unauthorized');
      }
      if (profile.sub) {
        const response =  await oauth2Client.request({
          url: 'https://www.googleapis.com/oauth2/v3/userinfo',
          headers: {
            Authorization: `Bearer ${profile.sub}`,
          },
        });
        return response.data;
      }

      return profile;
    } catch (error) {
      console.error('JWT verification error:', error);
      return status(401, 'Unauthorized');
    }
  });

export default authApi;
