import { useSession } from 'vinxi/http';
import { eq } from 'drizzle-orm';
import { db } from './db';
import { userTable } from '../../drizzle/schema';
import { getUserById } from '~/server/services/user';
import { action, cache, redirect } from '@solidjs/router';

const sessionSecret =
  process.env.SESSION_SECRET ?? 'areallylongsecretthatyoushouldreplace';

type SessionData = {
  userId?: number;
};

export function getSession() {
  return useSession<SessionData>({
    password: sessionSecret,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
    },
  });
}

export async function login(username: string, password: string) {
  const user = await db
    .select()
    .from(userTable)
    .where(eq(userTable.username, username))
    .get();

  if (!user || password !== user.password) throw new Error('Invalid login');

  return user;
}

export async function register(username: string, password: string) {
  const existingUser = await db
    .select()
    .from(userTable)
    .where(eq(userTable.username, username))
    .get();

  if (existingUser) throw new Error('User already exists');

  return db.insert(userTable).values({ username, password }).returning().get();
}

export function validateUsername(username: unknown) {
  if (typeof username !== 'string' || username.length < 3) {
    return 'Usernames must be at least 3 characters long';
  }
}

export function validatePassword(password: unknown) {
  if (typeof password !== 'string' || password.length < 6) {
    return 'Passwords must be at least 6 characters long';
  }
}

export async function getUserId() {
  const session = await getSession();
  const userId = session.data.userId;

  if (!userId || typeof userId !== 'number') {
    return null;
  }

  return userId;
}

export const getUser = cache(async () => {
  const session = await getSession();
  const userId = session.data.userId;

  if (!userId || typeof userId !== 'number') {
    return {
      username: null,
      id: null,
    };
  }

  const user = await getUserById(userId);
  if (!user) {
    return {
      username: null,
      id: null,
    };
  }

  return {
    id: user.id,
    username: user.username,
  };
}, 'getUser');

export const requireUser = cache(async () => {
  const userId = await getUserId();
  if (!userId) throw redirect('/login');

  try {
    const user = await getUserById(userId);

    if (!user) throw redirect('/login');
    return { id: user.id, username: user.username };
  } catch {
    throw logout();
  }
}, 'requireUser');

export const loginOrRegister = action(async (formData: FormData) => {
  'use server';
  const username = String(formData.get('username'));
  const password = String(formData.get('password'));
  const loginType = String(formData.get('intent'));
  const error = validateUsername(username) || validatePassword(password);
  if (error) return new Error(error);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const user = await (loginType !== 'login'
      ? register(username, password)
      : login(username, password));
    const session = await getSession();
    await session.update((d) => {
      d.userId = user.id;
      return d;
    });
    return redirect('/');
  } catch (err) {
    return err as Error;
  }
}, 'loginOrRegister');

export const logout = action(async () => {
  'use server';
  const session = await getSession();
  await session.update((d) => {
    d.userId = undefined;
    return d;
  });
  throw redirect('/login');
}, 'logout');
