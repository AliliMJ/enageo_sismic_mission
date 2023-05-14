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
      {
        nom: 'directeur',
        description: "Responsable de suivi des mission sismiques",
      },
      {
        nom: 'administrateur',
        description: "Responsable de system",
      },
      {
        nom: 'gestionnaire',
        description: "Responsable de l'execution de la mission sur terrain",
      },
      {
        nom: 'ouvrier',
        description: "ouvrier qui occupe un poste",
      },
      {
        nom: 'agent de sécurité',
        description: "agent pour assurer la sécurité dans le camp",
      },
      {
        nom: 'medcin',
        description: "consiste à diagnostiquer, traiter et prévenir les maladies et les blessures des patients",
      },
    ],
  });

  // await prisma.etatEmploye.createMany({
  //   data: [{ libEtat: 'En mission' }, { libEtat: 'En congé' } , { libEtat: 'en maladie' } , { libEtat: 'en sanctionné' }],
  // });

  await prisma.wilaya.createMany({ data: [
    { numWilaya: 1, nom: 'Adrar' },
    { numWilaya: 2, nom: 'Chlef' },
    { numWilaya: 3, nom: 'Laghouat' },
    { numWilaya: 4, nom: 'Oum El Bouaghi' },
    { numWilaya: 5, nom: 'batna' },
    { numWilaya: 6, nom: 'Béjaïa' },
    { numWilaya: 7, nom: 'Biskra' },
    { numWilaya: 8, nom: 'Béchar' },
    { numWilaya: 9, nom: 'Blida' },
    { numWilaya: 10, nom: 'Bouira' },
    { numWilaya: 11, nom: 'Tamanrasset' },
    { numWilaya: 12, nom: 'Tébessa' },
    { numWilaya: 13, nom: 'Telemcen' },
    { numWilaya: 14, nom: 'Tiaret' },
    { numWilaya: 15, nom: 'Tizi Ouzou' },
    { numWilaya: 16, nom: 'Alger' },
    { numWilaya: 17, nom: 'Djelfa' },
    { numWilaya: 18, nom: 'Jijel' },
    { numWilaya: 19, nom: 'Sétif' },
    { numWilaya: 20, nom: 'Saïda' },
    { numWilaya: 21, nom: 'skikda' },
    { numWilaya: 22, nom: 'Sidi Bel Abbès' },
    { numWilaya: 23, nom: 'Annaba' },
    { numWilaya: 24, nom: 'Guelma' },
    { numWilaya: 25, nom: 'Constantine' },
    { numWilaya: 26, nom: 'Médéa' },
    { numWilaya: 27, nom: 'Mostaganem' },
    { numWilaya: 28, nom: 'M\'Sila' },
    { numWilaya: 29, nom: 'Mascara' },
    { numWilaya: 30, nom: 'Ouargla' },
    { numWilaya: 31, nom: 'Oran' },
    { numWilaya: 32, nom: 'El Bayadh' },
    { numWilaya: 33, nom: 'Ilizi' },
    { numWilaya: 34, nom: 'Bordj Bou Arreridj' },
    { numWilaya: 35, nom: 'Boumerdès' },
    { numWilaya: 36, nom: 'El Tarf' },
    { numWilaya: 37, nom: 'Tindouf' },
    { numWilaya: 38, nom: 'Tissemsilt' },
    { numWilaya: 39, nom: 'El Oued' },
    { numWilaya: 40, nom: 'Khenchela' },
    { numWilaya: 41, nom: 'Souk Ahras' },
    { numWilaya: 42, nom: 'Tipaza' },
    { numWilaya: 43, nom: 'Mila' },
    { numWilaya: 44, nom: 'Aïn Defla' },
    { numWilaya: 45, nom: 'Naâma' },
    { numWilaya: 46, nom: 'Aïn Témouchent' },
    { numWilaya: 47, nom: 'Ghardaïa' },
    { numWilaya: 48, nom: 'Relizane' },
    { numWilaya: 49, nom: 'Timimoun' },
    { numWilaya: 50, nom: 'Bordj Badji Mokhtar' },
    { numWilaya: 51, nom: 'Ouled Djellal' },
    { numWilaya: 52, nom: 'Béni Abbès' },
    { numWilaya: 53, nom: 'In Salah' },
    { numWilaya: 54, nom: 'In Guezzam' },
    { numWilaya: 55, nom: 'Touggourt' },
    { numWilaya: 56, nom: 'Djanet' },
    { numWilaya: 57, nom: 'El M\'Ghair' },
    { numWilaya: 58, nom: 'El Meniaa' }, 
  ] });

  await prisma.activite.createMany({
    data: [
      {
        codeActivite: 'ENR',
        nomAct: 'Enregistrement',
        description: "Activité d'enregistrement des reflexions sismique",
      },
      { codeActivite: 'TOPO',
        nomAct: 'Topographie',
        description: "Activité pour étudie la forme et les caractéristiques de la surface de la Terre"
      },
      { codeActivite: 'LAY',
        nomAct: 'Layonnage',
        description:'pour faciliter le deplacement des materiels'
      },
      { codeActivite: 'POSE',
        nomAct: 'Pose',
        description:'la pose des geophones sur terre'
      },
      { codeActivite: 'RAM',
        nomAct: 'Ramasse',
        description:'le ramasse des geophones sur terre'
      },
      { codeActivite: 'VIB',
        nomAct: 'Vibration',
        description:'la creation des ondes sismiques par les camions vibrateurs'
    },
    
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
        fonctionId: 4,
        etat: 'mission',
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
        fonctionId: 5,
        etat: 'mission',
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
        etat: 'mission',
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
        etat: 'mission',
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
        fonctionId: 3,
        etat: 'mission',
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
        fonctionId: 3,
        etat: 'mission',
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
        etat: 'mission',
        dateRejoint: new Date(),
        dateNaissance: new Date(),
        sexe: Sexe.Homme,
        numIdentite: '00007',
        numTel: '00007',
        email: 'monemail7.employe.com',
        lieuNaissance: 1,
        adresse: 'adr',
      },
      {
        nom: 'ABOURI',
        prenom: 'Abdelkrim',
        fonctionId: 3,
        etat: 'travail',
        dateRejoint: new Date(),
        dateNaissance: new Date(1999,9,8),
        sexe: Sexe.Homme,
        numIdentite: '0008',
        numTel: '0541383260',
        email: 'kmioalg03@gmail.com',
        lieuNaissance: 43,
        adresse: 'hai ben zerga doum n148 bordj el kiffen alger',
      },
      {
        nom: 'Dwight',
        prenom: 'C Lacy',
        fonctionId: 6,
        etat: 'mission',
        dateRejoint: new Date(),
        dateNaissance: new Date(1980,2,1),
        sexe: Sexe.Homme,
        numIdentite: '0009',
        numTel: '0565465454',
        email: 'dasdl@gmail.com',
        lieuNaissance: 16,
        adresse: 'hai ben zerga doum n148 bordj el kiffen alger',
      },
      {
        nom: 'Thomas',
        prenom: 'Tannenbaum',
        fonctionId: 3,
        etat: 'mission',
        dateRejoint: new Date(),
        dateNaissance: new Date(1990,3,1),
        sexe: Sexe.Homme,
        numIdentite: '0010',
        numTel: '056465454',
        email: 'dassssl@gmail.com',
        lieuNaissance: 16,
        adresse: 'hai ben zerga doum n148 bordj el kiffen alger',
      }, 
        {
          nom: "Lewis",
          prenom: "Maddox",
          fonctionId: 5,
          etat: "maladie",
          dateRejoint: new Date(2005,2,1),
          dateNaissance: new Date(1989,2,1),
          sexe: Sexe.Homme,
          numIdentite: '7680403',
          numTel: "+2139404383677",
          email: "lewismaddox@nutralab.com",
          lieuNaissance: 12,
          adresse: "387 Quay Street, Williams, New Jersey, 6698",
        },
        {
          nom: "Katrina",
          prenom: "Schneider",
          fonctionId: 1,
          etat: "maladie",
          dateRejoint: new Date(2010,2,1),
          dateNaissance: new Date(1990,2,1),
          sexe: Sexe.Homme,
          numIdentite: '611094882',
          numTel: "+2138425543667",
          email: "katrinaschneider@nutralab.com",
          lieuNaissance: 41,
          adresse: "764 Stillwell Place, Katonah, Iowa, 9563"
        },
    ],
  });

  await prisma.materiel.createMany({
    data: [
      {
        codeMat: 'M1',
        designation: 'D1',
        status: 2,
        matricule: '0000',
        idProjet : 1,
        idTypeMat: 1,
      },
      {
        codeMat: 'M2',
        designation: 'D2',
        status: 2,
        matricule: '0000',
        idProjet : 1,
        idTypeMat: 2,
      },
      {
        codeMat: 'M3',
        designation: 'D1',
        status: 2,
        matricule: '0000',
        idProjet : 1,
        idTypeMat: 3,
      },
      {
        codeMat: 'M4',
        designation: 'D1',
        status: 2,
        matricule: '0000',
        idProjet : 1,
        idTypeMat: 1,
      },
      {
        codeMat: 'M5',
        designation: 'D1',
        status: 2,
        matricule: '0000',
        idProjet : 1,
        idTypeMat: 1,
      },
      {
        codeMat: 'M6',
        designation: 'D3',
        status: 2,
        matricule: '0000',
        idProjet : 1,
        idTypeMat: 1,
      },
      {
        codeMat: 'M7',
        designation: 'D3',
        status: 2,
        matricule: '0000',
        idProjet : 1,
        idTypeMat: 2,
      },
      {
        codeMat: 'M8',
        designation: 'D1',
        status: 2,
        matricule: '0000',
        idProjet : 1,
        idTypeMat: 3,
      },
    ],
  });

  await prisma.projet.create({
    data : {
      nom : 'projet1',
      description : 'description du projet 1',
      budget : 15000000,
      codeMission : 'EGS210'
    }
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

  await prisma.compte.create({
    data: {
      username: 'dir1',
      hashPassword: await bcrypt.hash('123', 10),
      employeId: 6,
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
