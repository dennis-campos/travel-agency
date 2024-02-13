import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
import { destinationSeeds } from '../seeds/destinations';
import { bookingSeeds } from './bookings';
dotenv.config({ path: './.env.local' });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL env var is not set');
}

const main = async () => {
  const client = postgres(process.env.DATABASE_URL!);
  const db = drizzle(client);

  console.log('Database seeding started ...🚀');

  await destinationSeeds(db);
  await bookingSeeds(db);
};

main()
  .then(() => {
    console.log('Database seeding completed successfully.......🚀');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error occured during database seeding ❌', error);
    process.exit(1);
  });
