import { drizzle } from 'drizzle-orm/postgres-js';
import { sql } from 'drizzle-orm';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
dotenv.config({ path: './.env.local' });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL env var is not set');
}

export const truncateDb = async () => {
  const client = postgres(process.env.DATABASE_URL!);
  const db = drizzle(client);

  const query = sql<string>`SELECT table_name
  FROM information_schema.tables
  WHERE table_schema = 'public'
    AND table_type = 'BASE TABLE';
`;

  const tables = await db.execute(query);

  for (let table of tables) {
    const query = sql.raw(`TRUNCATE TABLE ${table.table_name} CASCADE;`);
    await db.execute(query);
  }
};

truncateDb()
  .then(() => {
    console.log('Database truncated successfully.......🚀');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error occured during database truncation ❌', error);
    process.exit(1);
  });
