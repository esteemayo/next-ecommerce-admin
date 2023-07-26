import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const adminEmails = ['eadebayo15@gmail.com'];

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getIsAdmin() {
  try {
    const session = await getSession();

    if (!adminEmails.includes(session?.user?.email)) {
      throw new Error('Not admin');
    }

    return session;
  } catch (err) {
    return null;
  }
}
