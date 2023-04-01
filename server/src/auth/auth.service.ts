import bcrypt from 'bcrypt';
import { Fonction, StatusEmploye, Utilisateur } from '@prisma/client';
import prisma from '../utils/prisma.ts';

type UserRegistration = {
  email: string;
  password: string;
  nom: string;
  prenom: string;
  dateAdhesion: Date;
  dateNaissance: Date;
};

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

export const verifyUserCredentials = async (
  email: string,
  password: string
): Promise<Utilisateur> => {
  try {
    const user = await getUserByEmail(email);

    if (await bcrypt.compare(password, user.hashPassword)) {
      return user;
    } else {
      return Promise.reject('Invalid credentials');
    }
  } catch (e) {
    return Promise.reject(e);
  }
};

export const registerUser = async (userRegistration: UserRegistration) => {
  const { email, password, nom, prenom, dateAdhesion, dateNaissance } =
    userRegistration;
  const hashPassword = await bcrypt.hash(password, 10);

  return prisma.utilisateur.create({
    data: {
      email,
      hashPassword,
      employe: {
        create: {
          date_adhesion: dateAdhesion,
          fonction: Fonction.INGENIEUR,
          status: StatusEmploye.EN_SERVICE,
          profile: {
            create: {
              dateNaissance,
              nom,
              prenom,
            },
          },
        },
      },
    },
  });
};
