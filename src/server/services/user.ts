import { userTable } from '../../../drizzle/schema';
import { db } from '../db';
import { eq } from 'drizzle-orm';

export const getUserById = async (id: number) => {
  try {
    const user = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, id))
      .get();
    if (!user) {
      return null;
    }

    return {
      username: user.username,
      id: user.id,
    };
  } catch (error) {
    return null;
  }
};
