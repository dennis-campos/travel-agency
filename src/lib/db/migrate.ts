import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!, { max: 1 });
const db = drizzle(sql);

const runMigration = async () => {
  await migrate(db, { migrationsFolder: './src/lib/db/migrations' });
  await sql.end();
};

runMigration()
  .then(() => console.log('Migration complete'))
  .catch(() => {
    console.log('Migration failed');
    process.exit(1);
  });
