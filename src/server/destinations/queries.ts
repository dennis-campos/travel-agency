'use server';

import { db } from '@/lib/db';

export const getDestinations = async () => {
  const destinations = await db.query.destination.findMany({
    limit: 10,
  });

  return destinations;
};
