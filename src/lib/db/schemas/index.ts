import { relations } from 'drizzle-orm';
import {
  text,
  pgTable,
  uuid,
  date,
  timestamp,
  real,
  primaryKey,
  varchar,
  bigint,
} from 'drizzle-orm/pg-core';
import { z } from 'zod';

export const user = pgTable('users', {
  id: text('id').primaryKey(),
  username: varchar('username', { length: 64 }).unique('username'),
  hashed_password: text('hashed_password').notNull(),
});

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
});

export const userRelations = relations(user, ({ many }) => ({
  bookings: many(booking),
}));

export const destination = pgTable('destinations', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  country: text('country').notNull(),
  description: text('description'),
  popularity: real('popularity'),
  image: text('image'),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).notNull().defaultNow(),
});

export const destinationRelations = relations(destination, ({ many }) => ({
  destinationToBooking: many(destinationToBooking),
}));

export const booking = pgTable('bookings', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: varchar('user_id', { length: 15 })
    .notNull()
    .references(() => user.id, {
      onDelete: 'cascade',
    }),
  destinationId: uuid('destination_id')
    .notNull()
    .references(() => destination.id),
  bookingDate: timestamp('booking_date').defaultNow(),
  travelDate: date('travel_date').notNull(), // NOTE: Review this later
  duration: text('duration').notNull(),
  totalCost: text('total_cost').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).notNull(),
});

export const bookingRelations = relations(booking, ({ one }) => ({
  author: one(user, {
    fields: [booking.userId],
    references: [user.id],
  }),
}));

export const destinationToBooking = pgTable(
  'destination_to_booking',
  {
    destinationId: uuid('destination_id')
      .notNull()
      .references(() => destination.id),
    bookingId: uuid('booking_id')
      .notNull()
      .references(() => booking.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.destinationId, t.bookingId] }),
  })
);

export const destinationToBookingRelations = relations(
  destinationToBooking,
  ({ one }) => ({
    booking: one(booking, {
      fields: [destinationToBooking.bookingId],
      references: [booking.id],
    }),
    destination: one(destination, {
      fields: [destinationToBooking.destinationId],
      references: [destination.id],
    }),
  })
);

export const feedback = pgTable('feedback', {
  id: uuid('id').primaryKey().defaultRandom(),
  rating: real('rating').notNull(),
  comment: text('comment').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).notNull().defaultNow(),
});

export const authSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be between 3 and 31 characters long' })
    .max(31, { message: 'Username must be between 3 and 31 characters long' })
    .refine((val) => {
      return /^[a-zA-Z0-9_]+$/.test(val);
    }),

  password: z.string().min(6).max(255),
});

export type Auth = z.infer<typeof authSchema>;
