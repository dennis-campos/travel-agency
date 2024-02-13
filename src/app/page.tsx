import { lucia, validateRequest } from '@/auth/lucia';
import { LuciaForm } from '@/components/LuciaForm';
import { Button } from '@/components/ui/Button';
import { getDestinations } from '@/server/destinations/queries';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default async function Home() {
  const destinations = await getDestinations();

  return (
    <main className="flex flex-col w-full my-10">
      <div className="flex flex-wrap justify-center gap-6 w-full">
        {destinations.map((destination) => (
          <div className="relative" key={destination.id}>
            <p className="text-white absolute z-10 font-bold">
              {destination.name}
            </p>
            <p className="text-white absolute top-0 right-0 z-10">
              {destination.country}
            </p>
            <p className="text-white absolute bottom-0 left-0 z-10">
              {destination.popularity}
            </p>

            <div className="absolute rounded-lg inset-0 w-full bg-black bg-opacity-15"></div>
            <Image
              className="rounded-lg"
              src={destination.image as string}
              alt=""
              width={300}
              height={300}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
