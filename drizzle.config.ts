import type { Config } from 'drizzle-kit';
import { loadEnvConfig } from '@next/env';
import { cwd } from 'node:process';

loadEnvConfig(cwd());

export default {
  schema: './src/lib/db/schemas',
  out: './src/lib/db/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
} satisfies Config;
