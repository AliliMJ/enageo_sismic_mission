import express from 'express';
import bcrypt from 'bcrypt';
import { Fonction, Role, PrismaClient, StatusEmploye } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

async function getUserByEmail(email) {
  try {
    const user = await prisma.utilisateur.findUnique({
      where: { email },
    });
    if (user == null) return Promise.reject('User not found');
    return user;
  } catch (e) {
    return Promise.reject(e);
  }
}

async function verifyUserCredentials(email, password) {
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
}
async function verifyUserAccess(email, password, role) {
  try {
    const user = await verifyUserCredentials(email, password);
    if (user.role === role) return true;
    else return false;
  } catch {
    return Promise.reject('Access not allowed');
  }
}

async function registerUser(data) {
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
}
//const users = [];

// app.get('/', async (req, res) => {
//   console.log(users);
//   res.send('ok');
// });
app.post('/register', async (req, res) => {
  try {
    //reading the request body
    const {
      clientEmail,
      clientPassword,
      nom,
      prenom,
      dateAdhesion,
      dateNaissance,
    } = req.body;

    //generating the hash password
    const hashPassword = await bcrypt.hash(clientPassword, 10);

    const data = {
      email: clientEmail,
      hashPassword,
      nom,
      prenom,
      dateAdhesion,
      dateNaissance,
    };

    const user = await registerUser(data);
    console.log(user);

    res.status(201).send(user);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

app.post('/login', async (req, res) => {
  const { clientEmail, clientPassword } = req.body;

  try {
    const user = await verifyUserCredentials(clientEmail, clientPassword);
    res.status(201).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.post('/direction', async (req, res) => {
  const { email, password } = req.body;
  try {
    const isAllowed = await verifyUserAccess(email, password, Role.DIRECTEUR);
    if (isAllowed) {
      res.status(200).send('User is allowed');
    } else {
      res.status(500).send('User not allowed');
    }
  } catch (e) {
    res.status(500).send(e);
  }
});
app.listen(3000, () => console.log('listening at port 3000...'));
