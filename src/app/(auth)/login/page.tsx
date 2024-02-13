import { validateRequest } from '@/auth/lucia';
import { LoginForm } from './_components/LoginForm';
import { redirect } from 'next/navigation';

export default async function Page() {
  const { user } = await validateRequest();

  console.log({ user });

  if (user) {
    return redirect('/login');
  }

  return (
    <div>
      <LoginForm />
    </div>
  );
}
