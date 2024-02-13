'use server';

import { db } from '@/lib/db';
import { user } from '@/lib/db/schemas';
import { eq } from 'drizzle-orm';
import { User } from './types';

export async function getUser({ username }: Pick<User, 'username'>) {
  const userInfo = await db
    .select()
    .from(user)
    .where(eq(user.username, username));

  return userInfo;
}
