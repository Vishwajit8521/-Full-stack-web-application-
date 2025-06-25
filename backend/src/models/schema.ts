import { pgTable, serial, text, timestamp, boolean, varchar } from 'drizzle-orm/pg-core';

// Users table (for reference only - actual user management is handled by Clerk)
export const users = pgTable('users', {
  id: varchar('id').primaryKey(),  // Clerk user ID
  email: varchar('email').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Tasks table
export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id').notNull().references(() => users.id),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  completed: boolean('completed').default(false).notNull(),
  category: varchar('category', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});