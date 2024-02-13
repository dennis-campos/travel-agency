import { RegisterForm } from './_components/RegisterForm';
import { redirect } from 'next/navigation';

export default async function Page() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <RegisterForm />
    </div>
  );
}
