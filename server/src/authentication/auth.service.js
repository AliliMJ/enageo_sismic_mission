export const getUserByEmail = async (email) => {
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

export const verifyUserCredentials = async (email, password) => {
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

export const verifyUserAccess = async (email, password, role) => {
  try {
    const user = await verifyUserCredentials(email, password);
    if (user.role === role) return true;
    else return false;
  } catch {
    return Promise.reject('Access not allowed');
  }
};

export const registerUser = async (data) => {
  const { email, hashPassword, nom, prenom, dateAdhesion, dateNaissance } =
    data;

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
