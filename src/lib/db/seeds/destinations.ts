import { faker } from '@faker-js/faker';
import { destination } from '../schemas';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

export const destinationSeeds = async (db: PostgresJsDatabase) => {
  const data: (typeof destination.$inferInsert)[] = [];

  for (let i = 0; i < 100; i++) {
    data.push({
      name: faker.location.city(),
      country: faker.location.country(),
      description: faker.lorem.paragraph(),
      popularity: faker.number.float({ min: 2, max: 5, precision: 0.1 }),
      image: faker.image.urlPicsumPhotos({ width: 400, height: 400 }),
    });
  }

  console.log('Seeding destinations...✈️');
  await db.insert(destination).values(data);
};
