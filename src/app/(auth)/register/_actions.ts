'use server';

import { lucia } from '@/auth/lucia';
import { db } from '@/lib/db';
import { authSchema, user } from '@/lib/db/schemas';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { generateId } from 'lucia';
import { ZodError } from 'zod';

type ActionResult = {
  message?: string;
  error: string | null;
};

export const register = async (
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> => {
  // https://github.com/vercel/next.js/issues/60756
  const argon = new (await import('oslo/password')).Argon2id();

  try {
    const body = authSchema.parse({
      username: formData.get('username'),
      password: formData.get('password'),
    });

    const hashedPassword = await argon.hash(body.password);
    const userId = generateId(15);

    await db.insert(user).values({
      id: userId,
      username: body.username,
      hashed_password: hashedPassword,
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (e) {
    if (e instanceof ZodError) {
      const errorMessages = e.errors.map((error) => error.message).join(', ');

      return {
        error: errorMessages,
      };
    }
  }

  return redirect('/');
};
