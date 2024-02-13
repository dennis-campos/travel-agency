'use server';

import { lucia } from '@/auth/lucia';
import { db } from '@/lib/db';
import { authSchema, user } from '@/lib/db/schemas';
import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ZodError } from 'zod';

type ActionResult = {
  message?: string;
  error: string | null;
};

export const login = async (
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> => {
  // https://github.com/vercel/next.js/issues/60756
  const argon = new (await import('oslo/password')).Argon2id();
  const username = formData.get('username');
  const password = formData.get('password');

  try {
    const body = authSchema.parse({
      username,
      password,
    });

    const existingUser = await db
      .select()
      .from(user)
      .where(eq(user.username, body.username));

    if (!existingUser) {
      return {
        error: 'Incorrect username or password',
      };
    }

    const validPassword = argon.verify(
      existingUser[0].hashed_password,
      body.password
    );

    if (!validPassword) {
      return {
        error: 'Incorrect username or password',
      };
    }

    const session = await lucia.createSession(existingUser[0].id, {});
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

    return {
      error: 'An error occurred',
    };
  }

  return redirect('/');
};
