import { integer, text, sqliteTable } from 'drizzle-orm/sqlite-core';

export const userTable = sqliteTable('user', {
  id: integer().primaryKey().unique().notNull(),
  username: text().notNull().default(''),
  password: text().notNull().default(''),
});

export const productTable = sqliteTable('product', {
  id: integer().primaryKey(),
  name: text().notNull(),
  price: integer().notNull(),
  imageSrc: text().notNull(),
  imageAlt: text().notNull(),
});
export type SelectProduct = typeof productTable.$inferSelect;

export const cartTable = sqliteTable('cart', {
  id: integer().primaryKey().unique().notNull(),
  userId: integer().notNull(),
});

export const cartItemTable = sqliteTable('cartItem', {
  id: integer().primaryKey().unique().notNull(),
  cartId: integer().notNull(),
  productId: integer().notNull(),
  quantity: integer().notNull(),
});
