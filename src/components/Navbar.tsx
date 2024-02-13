'use client';
import { User } from 'lucia';
import { Button, buttonVariants } from './ui/Button';
import { logout } from '@/server/users/mutations';
import { Link } from 'react-aria-components';
import { usePathname } from 'next/navigation';

type NavbarProps = {
  user: User | null;
};

const exlcludedPaths = ['/login', '/register'];

export function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();

  if (exlcludedPaths.includes(pathname)) {
    return <></>;
  }

  return (
    <header className="flex justify-between items-center py-4">
      <Link href="/">Travel Agency</Link>

      {user ? (
        <Button type="submit" onPress={() => logout()}>
          log out
        </Button>
      ) : (
        <Link className={buttonVariants()} href="/login">
          Log in
        </Link>
      )}
    </header>
  );
}
