import { Utilisateur } from '@prisma/client';
import prisma from '../utils/prisma.ts';

export const getUserByEmail = async (email: string): Promise<Utilisateur> => {
  try {
    const user = await prisma.utilisateur.findUnique({
      where: { email },
    });
    if (user == null) return Promise.reject('User not found');
    return user;
  } catch (e) {
    return Promise.reject(e);
  }
};
