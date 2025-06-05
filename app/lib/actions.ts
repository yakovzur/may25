'use server';

import { signIn } from '@/app/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';
import clientPromise from './mongodb';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
    return undefined; // success, no error message
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function registerUser(
  prevState: string | undefined,
  formData: FormData,
) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return 'All fields are required';
  }

  const client = await clientPromise;
  const db = client.db();

  const existing = await db.collection('users').findOne({ email });
  if (existing) {
    return 'Email already registered';
  }

  const hashed = await bcrypt.hash(password, 10);
  await db.collection('users').insertOne({ email, password: hashed });

  return undefined; // success
}

