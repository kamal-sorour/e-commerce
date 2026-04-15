import {
  formDataType,
  AuthResponse,
  AuthorizeType,
} from '@/types/auth';
import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { fetchApi } from '@/services/api';
import { jwtDecode } from 'jwt-decode';


export const nextAuthConfig: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'yassify credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'Enter your email',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter your password',
        },
      },
      async authorize(credentials: formDataType | undefined): Promise<AuthorizeType | null> {
        try {
          const res = await fetchApi(
            `/api/v1/auth/signin`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(credentials),
            }
          );

          interface DecodedToken {
            id: string;
          }

          const data: AuthResponse = await res.data;
          // console.log('API response:', data.token);
          const decodedToken = jwtDecode<DecodedToken>(data.token);

        

          const finalData: AuthorizeType = {
            id: decodedToken.id,
            name: data.user.name,
            email: data.user.email,
            tokenCredentials: data.token,
            role: data.user.role,
          };

            return finalData;
        } catch (error) {
          console.error('authorize error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.routeToken = user.tokenCredentials;
        token.role = user.role;
      }

      return token;
    },
    session({ session, token }) {

      if (token) {
        session.user.id = token.id;
        session.user.role = token.role; 
      }

      return session;
    },
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 7,
  },
  session: {
    maxAge: 60 * 60 * 24 * 7,
    strategy: 'jwt',
  },
  pages: {
    signIn: '/signin',
  },
};