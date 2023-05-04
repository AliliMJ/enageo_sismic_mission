import { Role, Sexe, TypeMission } from '@prisma/client';
import prisma from '../src/utils/prisma';
import bcrypt from 'bcrypt';

async function main() {
  await prisma.fonction.createMany({
    data: [
      {
        nom: 'Chef mission',
        description: 'Responsable de suivre et dériger une mission',
      },
      {
        nom: 'Chef terrain',
        description: "Responsable de l'execution de la mission sur terrain",
      },
    ],
  });

  await prisma.etatEmploye.createMany({
    data: [{ libEtat: 'En mission' }, { libEtat: 'En congé' } , { libEtat: 'en maladie' } , { libEtat: 'en sanctionné' }],
  });

  await prisma.wilaya.createMany({ data: [{ numWilaya: 1, nom: 'Adrar' }] });

  await prisma.activite.createMany({
    data: [
      {
        codeActivite: 'ENR',
        nomAct: 'Enregistrement',
        description: "Activité d'enregistrement des reflexions sismique",
      },
      { codeActivite: 'TOPO', nomAct: 'Topographie' },
      { codeActivite: 'LAY', nomAct: 'Layonnage' },
      { codeActivite: 'POSE', nomAct: 'Pose' },
      { codeActivite: 'RAM', nomAct: 'Ramasse' },
      { codeActivite: 'VIB', nomAct: 'Vibration' },
    
    ],
  });

  await prisma.typeMateriel.createMany({
    data: [
      { libelle: 'Camion' },
      { libelle: 'Véhicule' },
      { libelle: 'Bulldozer' },
      { libelle: 'Vibrreur' },
    ],
  });

  await prisma.mission.createMany({
    data: [
      {
        codeMission: 'EGS60',
        methodologie: TypeMission.MISSION3D,
        description: '',
      },
      {
        codeMission: 'EGS120',
        methodologie: TypeMission.MISSION3D,
        description: '',
      },
      {
        codeMission: 'EGS150',
        methodologie: TypeMission.MISSION3D,
        description: '',
      },
      {
        codeMission: 'EGS170',
        methodologie: TypeMission.MISSION2D,
        description: '',
      },
      {
        codeMission: 'EGS180',
        methodologie: TypeMission.MISSION3D,
        description: '',
      },
      {
        codeMission: 'EGS190',
        methodologie: TypeMission.MISSION3D,
        description: '',
      },
      {
        codeMission: 'EGS210',
        methodologie: TypeMission.MISSION3D,
        description: '',
      },
      {
        codeMission: 'EGS220',
        methodologie: TypeMission.MISSION3D,
        description: '',
      },
      {
        codeMission: 'EGS250',
        methodologie: TypeMission.MISSION2D,
        description: '',
      },
      {
        codeMission: 'EGS270',
        methodologie: TypeMission.MISSION3D,
        description: '',
      },
    ],
  });

  await prisma.employe.createMany({
    data: [
      {
        nom: 'Zoya',
        prenom: 'Walker',
        fonctionId: 1,
        etatEmployeId: 1,
        dateRejoint: new Date(),
        dateNaissance: new Date(),
        sexe: Sexe.Homme,
        numIdentite: '0001',
        numTel: '0001',
        email: 'monemail1.employe.com',
        lieuNaissance: 1,
        adresse: 'adr',
      },
      {
        nom: 'Faye',
        prenom: 'Morgan',
        fonctionId: 2,
        etatEmployeId: 1,
        dateRejoint: new Date(),
        dateNaissance: new Date(),
        sexe: Sexe.Homme,
        numIdentite: '0002',
        numTel: '0002',
        email: 'monemail2.employe.com',
        lieuNaissance: 1,
        adresse: 'adr',
        codeMission: 'EGS210',
      },
      {
        nom: 'Harris',
        prenom: 'Ballard',
        fonctionId: 1,
        etatEmployeId: 1,
        dateRejoint: new Date(),
        dateNaissance: new Date(),
        sexe: Sexe.Homme,
        numIdentite: '0003',
        numTel: '0003',
        email: 'monemail3.employe.com',
        lieuNaissance: 1,
        adresse: 'adr',
        codeMission: 'EGS210',
      },
      {
        nom: 'Hasan',
        prenom: 'Craig',
        fonctionId: 2,
        etatEmployeId: 1,
        dateRejoint: new Date(),
        dateNaissance: new Date(),
        sexe: Sexe.Homme,
        numIdentite: '0004',
        numTel: '0004',
        email: 'monemail4.employe.com',
        lieuNaissance: 1,
        adresse: 'adr',
        codeMission: 'EGS210',
      },
      {
        nom: 'ALILI',
        prenom: 'Mohamed',
        fonctionId: 1,
        etatEmployeId: 1,
        dateRejoint: new Date(),
        dateNaissance: new Date(),
        sexe: Sexe.Homme,
        numIdentite: '0005',
        numTel: '0005',
        email: 'monemail5.employe.com',
        lieuNaissance: 1,
        adresse: 'adr',
      },
      {
        nom: 'Kyran',
        prenom: 'Noble',
        fonctionId: 1,
        etatEmployeId: 1,
        dateRejoint: new Date(),
        dateNaissance: new Date(),
        sexe: Sexe.Homme,
        numIdentite: '0006',
        numTel: '0006',
        email: 'monemail6.employe.com',
        lieuNaissance: 1,
        adresse: 'adr',
      },
      {
        nom: 'Dewey',
        prenom: 'Conley',
        fonctionId: 1,
        etatEmployeId: 1,
        dateRejoint: new Date(),
        dateNaissance: new Date(),
        sexe: Sexe.Homme,
        numIdentite: '00007',
        numTel: '00007',
        email: 'monemail7.employe.com',
        lieuNaissance: 1,
        adresse: 'adr',
      },
    ],
  });

  await prisma.materiel.createMany({
    data: [
      {
        codeMat: 'M1',
        designation: 'D1',
        enPanne: false,
        matricule: '0000',
        idTypeMat: 1,
      },
      {
        codeMat: 'M2',
        designation: 'D2',
        enPanne: false,
        matricule: '0000',
        idTypeMat: 2,
      },
      {
        codeMat: 'M3',
        designation: 'D1',
        enPanne: false,
        matricule: '0000',
        idTypeMat: 3,
      },
      {
        codeMat: 'M4',
        designation: 'D1',
        enPanne: false,
        matricule: '0000',
        idTypeMat: 1,
      },
      {
        codeMat: 'M5',
        designation: 'D1',
        enPanne: false,
        matricule: '0000',
        idTypeMat: 1,
      },
      {
        codeMat: 'M6',
        designation: 'D3',
        enPanne: false,
        matricule: '0000',
        idTypeMat: 1,
      },
      {
        codeMat: 'M7',
        designation: 'D3',
        enPanne: false,
        matricule: '0000',
        idTypeMat: 2,
      },
      {
        codeMat: 'M8',
        designation: 'D1',
        enPanne: false,
        matricule: '0000',
        idTypeMat: 3,
      },
    ],
  });

  await prisma.compte.create({
    data: {
      username: 'admin',
      hashPassword: await bcrypt.hash('123', 10),
      employeId: 1,
      role: Role.ADMINISTRATEUR,
      dateCreationCompte: new Date(),
    },
  });

  await prisma.compte.create({
    data: {
      username: 'gest',
      hashPassword: await bcrypt.hash('123', 10),
      employeId: 2,
      role: Role.GESTIONNAIRE,
      dateCreationCompte: new Date(),
    },
  });

  await prisma.compte.create({
    data: {
      username: 'chefm',
      hashPassword: await bcrypt.hash('123', 10),
      employeId: 3,
      role: Role.CHEF_MISSION,
      dateCreationCompte: new Date(),
    },
  });

  await prisma.compte.create({
    data: {
      username: 'cheft',
      hashPassword: await bcrypt.hash('123', 10),
      employeId: 4,
      role: Role.CHEF_TERRAIN,
      dateCreationCompte: new Date(),
    },
  });

  await prisma.compte.create({
    data: {
      username: 'dir',
      hashPassword: await bcrypt.hash('123', 10),
      employeId: 5,
      role: Role.DIRECTEUR,
      dateCreationCompte: new Date(),
    },
  });

  await prisma.equipe.createMany({
    data: [
      { codeActivite: 'ENR', codeMission: 'EGS60', nom: 'Labo 60' },
      { codeActivite: 'TOPO', codeMission: 'EGS60', nom: 'Topo 60' },
      { codeActivite: 'LAY', codeMission: 'EGS60', nom: 'Layonnage 60' },
      { codeActivite: 'POSE', codeMission: 'EGS60', nom: 'Pose 60' },
      { codeActivite: 'RAM', codeMission: 'EGS60', nom: 'Ramasse 60' },

      { codeActivite: 'ENR', codeMission: 'EGS120', nom: 'Labo 120' },
      { codeActivite: 'TOPO', codeMission: 'EGS120', nom: 'Topo 120' },
      { codeActivite: 'LAY', codeMission: 'EGS120', nom: 'Layonnage 120' },
      { codeActivite: 'POSE', codeMission: 'EGS120', nom: 'Pose 120' },
      { codeActivite: 'RAM', codeMission: 'EGS120', nom: 'Ramasse 120' },

      { codeActivite: 'ENR', codeMission: 'EGS150', nom: 'Labo 150' },
      { codeActivite: 'TOPO', codeMission: 'EGS150', nom: 'Topo 150' },
      { codeActivite: 'LAY', codeMission: 'EGS150', nom: 'Layonnage 150' },
      { codeActivite: 'POSE', codeMission: 'EGS150', nom: 'Pose 150' },
      { codeActivite: 'RAM', codeMission: 'EGS150', nom: 'Ramasse 150' },

      { codeActivite: 'ENR', codeMission: 'EGS170', nom: 'Labo 170' },
      { codeActivite: 'TOPO', codeMission: 'EGS170', nom: 'Topo 170' },
      { codeActivite: 'LAY', codeMission: 'EGS170', nom: 'Layonnage 170' },
      { codeActivite: 'POSE', codeMission: 'EGS170', nom: 'Pose 170' },
      { codeActivite: 'RAM', codeMission: 'EGS170', nom: 'Ramasse 170' },

      { codeActivite: 'ENR', codeMission: 'EGS180', nom: 'Labo 180' },
      { codeActivite: 'TOPO', codeMission: 'EGS180', nom: 'Topo 180' },
      { codeActivite: 'LAY', codeMission: 'EGS180', nom: 'Layonnage 180' },
      { codeActivite: 'POSE', codeMission: 'EGS180', nom: 'Pose 180' },
      { codeActivite: 'RAM', codeMission: 'EGS180', nom: 'Ramasse 180' },

      { codeActivite: 'ENR', codeMission: 'EGS210', nom: 'Labo 210' },
      { codeActivite: 'TOPO', codeMission: 'EGS210', nom: 'Topo 210' },
      { codeActivite: 'LAY', codeMission: 'EGS210', nom: 'Layonnage 210' },
      { codeActivite: 'POSE', codeMission: 'EGS210', nom: 'Pose 210' },
      { codeActivite: 'RAM', codeMission: 'EGS210', nom: 'Ramasse 210' },

      { codeActivite: 'ENR', codeMission: 'EGS220', nom: 'Labo 220' },
      { codeActivite: 'TOPO', codeMission: 'EGS220', nom: 'Topo 220' },
      { codeActivite: 'LAY', codeMission: 'EGS220', nom: 'Layonnage 220' },
      { codeActivite: 'POSE', codeMission: 'EGS220', nom: 'Pose 220' },
      { codeActivite: 'RAM', codeMission: 'EGS220', nom: 'Ramasse 220' },

      { codeActivite: 'ENR', codeMission: 'EGS250', nom: 'Labo 250' },
      { codeActivite: 'TOPO', codeMission: 'EGS250', nom: 'Topo 250' },
      { codeActivite: 'LAY', codeMission: 'EGS250', nom: 'Layonnage 250' },
      { codeActivite: 'POSE', codeMission: 'EGS250', nom: 'Pose 250' },
      { codeActivite: 'RAM', codeMission: 'EGS250', nom: 'Ramasse 250' },

      { codeActivite: 'ENR', codeMission: 'EGS270', nom: 'Labo 270' },
      { codeActivite: 'TOPO', codeMission: 'EGS270', nom: 'Topo 270' },
      { codeActivite: 'LAY', codeMission: 'EGS270', nom: 'Layonnage 270' },
      { codeActivite: 'POSE', codeMission: 'EGS270', nom: 'Pose 270' },
      { codeActivite: 'RAM', codeMission: 'EGS270', nom: 'Ramasse 270' },
    ],
  });

  await prisma.objectif.createMany({
    data: [{ nomObj: 'VP', description: 'Points vibrés' }],
  });
  await prisma.client.createMany({
    data: [
      {
        nom: 'Sonatrach',
        numFax: '0000',
        adresse: 'adr',
        email: 'monemail.client.com',
      },
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
