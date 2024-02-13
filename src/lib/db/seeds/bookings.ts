import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { booking, destination, user } from '../schemas';
import { faker } from '@faker-js/faker';
import crypto from 'crypto';
import { generateRandomString } from '@/lib/utils';

//TODO: What's the goal of the travel date and booking date?
// Booking date is the day they booked the trip
// Travel date should be from when they leave to when they come back
// - should this be a range? Should I have a start and end date in the DB?

export const bookingSeeds = async (db: PostgresJsDatabase) => {
  const data: (typeof booking.$inferInsert)[] = [];

  for (let i = 0; i < 100; i++) {
    const createOrUpsertUser = await db
      .insert(user)
      .values({
        id: generateRandomString(15),
        username: faker.internet.userName(),
        hashed_password: '',
      })
      .returning();
    const includeDestinations = await db
      .insert(destination)
      .values({
        name: faker.location.city(),
        country: faker.location.country(),
        description: faker.lorem.paragraph(),
        popularity: faker.number.float({ min: 2, max: 5, precision: 0.1 }),
        image: faker.image.urlPicsumPhotos({ width: 400, height: 400 }),
      })
      .onConflictDoNothing()
      .returning();

    const days = faker.number.int({ min: 1, max: 30 });
    const costs = faker.finance.amount({
      min: 65,
      max: 1000,
      dec: 2,
      symbol: '$',
    });

    data.push({
      userId: createOrUpsertUser[0].id,
      duration: `${days === 1 ? days + ' day' : days + ' days'}`,
      travelDate: faker.date.future().toISOString(),
      totalCost: costs,
      bookingDate: faker.date.between({
        from: '2020-01-01T00:00:00.000Z',
        to: '2030-01-01T00:00:00.000Z',
      }),
      destinationId: includeDestinations[0].id,
      updatedAt: new Date(),
    });
  }

  console.log('Seeding bookings...🚀');
  await db.insert(booking).values(data);
};
