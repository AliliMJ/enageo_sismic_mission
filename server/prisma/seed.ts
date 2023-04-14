import { TypeMission } from '@prisma/client';
import prisma from '../src/utils/prisma';

async function main() {
  await prisma.fonction.createMany({
    data: [{ nom: 'Chef mission' }, { nom: 'Chef terrain' }],
  });

  await prisma.etatEmploye.createMany({
    data: [{ nom: 'En mission' }, { nom: 'Congé' }],
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
        email: 'gest',
        nom: 'ALILI',
        prenom: 'Mohamed',
        fonctionId: 1,
        etatEmployeId: 1,
        dateAdhesion: new Date(),
        dateNaissance: new Date(),
      },
      {
        email: 'admin',
        nom: 'ALILI',
        prenom: 'Amine',
        fonctionId: 2,
        etatEmployeId: 1,
        dateAdhesion: new Date(),
        dateNaissance: new Date(),
      },
      {
        email: 'chefM',
        nom: 'ALILI',
        prenom: 'Mohamed',
        fonctionId: 1,
        etatEmployeId: 1,
        dateAdhesion: new Date(),
        dateNaissance: new Date(),
      },
      {
        email: 'chefT',
        nom: 'ALILI',
        prenom: 'Mohamed',
        fonctionId: 2,
        etatEmployeId: 1,
        dateAdhesion: new Date(),
        dateNaissance: new Date(),
      },
      {
        email: 'superviseur',
        nom: 'ALILI',
        prenom: 'Mohamed',
        fonctionId: 1,
        etatEmployeId: 1,
        dateAdhesion: new Date(),
        dateNaissance: new Date(),
      },
      {
        email: 'e1',
        nom: 'ALILI',
        prenom: 'Mohamed',
        fonctionId: 1,
        etatEmployeId: 1,
        dateAdhesion: new Date(),
        dateNaissance: new Date(),
      },
      {
        email: 'e2',
        nom: 'ALILI',
        prenom: 'Mohamed',
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
