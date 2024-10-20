import { db } from '~/server/db';
import { productTable } from './schema';
import { products } from './data';

await db.insert(productTable).values(products);
