import { Role, TypeMission } from '@prisma/client';
import prisma from '../src/utils/prisma';
import bcrypt from 'bcrypt';

async function main() {
  await prisma.fonction.createMany({
    data: [{ nom: 'Chef mission' }, { nom: 'Chef terrain' }],
  });

  await prisma.etatEmploye.createMany({
    data: [{ nom: 'En mission' }, { nom: 'Congé' }],
  });

  await prisma.etatProjet.createMany({
    data: [
      { nom: 'Planifié' },
      { nom: 'En production' },
      { nom: 'Clôturé' },
      { nom: 'Annulé' },
    ],
  });

  await prisma.wilaya.createMany({ data: [{ numero: 1, nom: 'Adrar' }] });

  await prisma.activite.createMany({
    data: [
      { nom: 'Enregistrement' },
      { nom: 'Topographie' },
      { nom: 'Layonnage' },
      { nom: 'Pose' },
      { nom: 'Ramasse' },
    ],
  });

  await prisma.panne.createMany({
    data: [{ nom: 'A' }, { nom: 'B' }, { nom: 'C' }],
  });

  await prisma.typeMateriel.createMany({
    data: [{ nom: 'Camion' }, { nom: 'Véhicule' }, { nom: 'Bulldozer' }],
  });

  await prisma.mission.createMany({
    data: [
      { code: 'EGS100', type: TypeMission.MISSION2D },
      { code: 'EGS120', type: TypeMission.MISSION2D },
      { code: 'EGS200', type: TypeMission.MISSION3D },
      { code: 'EGS220', type: TypeMission.MISSION3D },
    ],
  });

  await prisma.employe.createMany({
    data: [
      {
        email: 'admin',
        nom: 'Zoya',
        prenom: 'Walker',
        fonctionId: 1,
        etatEmployeId: 1,
        dateAdhesion: new Date(),
        dateNaissance: new Date(),
      },
      {
        email: 'gest',
        nom: 'Faye',
        prenom: 'Morgan',
        fonctionId: 2,
        etatEmployeId: 1,
        dateAdhesion: new Date(),
        dateNaissance: new Date(),
      },
      {
        email: 'chefm',
        nom: 'Harris',
        prenom: 'Ballard',
        fonctionId: 1,
        etatEmployeId: 1,
        dateAdhesion: new Date(),
        dateNaissance: new Date(),
      },
      {
        email: 'cheft',
        nom: 'Hasan',
        prenom: 'Craig',
        fonctionId: 2,
        etatEmployeId: 1,
        dateAdhesion: new Date(),
        dateNaissance: new Date(),
      },
      {
        email: 'dir',
        nom: 'ALILI',
        prenom: 'Mohamed',
        fonctionId: 1,
        etatEmployeId: 1,
        dateAdhesion: new Date(),
        dateNaissance: new Date(),
      },
      {
        email: 'e1',
        nom: 'Kyran',
        prenom: 'Noble',
        fonctionId: 1,
        etatEmployeId: 1,
        dateAdhesion: new Date(),
        dateNaissance: new Date(),
      },
      {
        email: 'e2',
        nom: 'Dewey',
        prenom: 'Conley',
        fonctionId: 1,
        etatEmployeId: 1,
        dateAdhesion: new Date(),
        dateNaissance: new Date(),
      },
    ],
  });

  await prisma.materiel.createMany({
    data: [
      { code: 'M1', designation: 'D1', enPanne: false },
      { code: 'M2', designation: 'D2', enPanne: false },
      { code: 'M3', designation: 'D1', enPanne: false },
      { code: 'M4', designation: 'D1', enPanne: false },
      { code: 'M5', designation: 'D1', enPanne: false },
      { code: 'M6', designation: 'D3', enPanne: false },
      { code: 'M7', designation: 'D3', enPanne: false },
      { code: 'M8', designation: 'D1', enPanne: false },
    ],
  });

  await prisma.utilisateur.create({
    data: {
      email: 'admin',
      hashPassword: await bcrypt.hash('123', 10),
      employeId: 1,
      role: Role.ADMINISTRATEUR,
    },
  });

  await prisma.utilisateur.create({
    data: {
      email: 'gest',
      hashPassword: await bcrypt.hash('123', 10),
      employeId: 2,
      role: Role.GESTIONNAIRE,
    },
  });

  await prisma.utilisateur.create({
    data: {
      email: 'chefm',
      hashPassword: await bcrypt.hash('123', 10),
      employeId: 3,
      role: Role.CHEF_MISSION,
    },
  });

  await prisma.utilisateur.create({
    data: {
      email: 'cheft',
      hashPassword: await bcrypt.hash('123', 10),
      employeId: 4,
      role: Role.CHEF_TERRAIN,
    },
  });

  await prisma.utilisateur.create({
    data: {
      email: 'dir',
      hashPassword: await bcrypt.hash('123', 10),
      employeId: 5,
      role: Role.DIRECTEUR,
    },
  });

  await prisma.equipe.createMany({
    data: [
      { activiteId: 1, missionId: 'EGS100' },
      { activiteId: 2, missionId: 'EGS100' },
      { activiteId: 3, missionId: 'EGS100' },
      { activiteId: 3, missionId: 'EGS100' },
      { activiteId: 4, missionId: 'EGS100' },
      { activiteId: 5, missionId: 'EGS100' },
      { activiteId: 1, missionId: 'EGS120' },
      { activiteId: 2, missionId: 'EGS120' },
      { activiteId: 3, missionId: 'EGS120' },
      { activiteId: 3, missionId: 'EGS120' },
      { activiteId: 4, missionId: 'EGS120' },
      { activiteId: 5, missionId: 'EGS120' },
      { activiteId: 1, missionId: 'EGS200' },
      { activiteId: 2, missionId: 'EGS200' },
      { activiteId: 3, missionId: 'EGS200' },
      { activiteId: 3, missionId: 'EGS200' },
      { activiteId: 4, missionId: 'EGS200' },
      { activiteId: 5, missionId: 'EGS200' },
      { activiteId: 1, missionId: 'EGS220' },
      { activiteId: 2, missionId: 'EGS220' },
      { activiteId: 3, missionId: 'EGS220' },
      { activiteId: 3, missionId: 'EGS220' },
      { activiteId: 4, missionId: 'EGS220' },
      { activiteId: 5, missionId: 'EGS220' },
    ],
  });

  await prisma.objectif.createMany({ data: [{ nom: 'VP' }] });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
