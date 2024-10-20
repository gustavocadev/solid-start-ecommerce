import { cache } from '@solidjs/router';
import { db } from '../db';
import { productTable } from '../../../drizzle/schema';

export const getProducts = cache(async () => {
  const products = await db.select().from(productTable);

  return products;
}, 'getProducts');
