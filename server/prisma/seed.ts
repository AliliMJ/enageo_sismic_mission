import { Role, Sexe, TypeMission } from '@prisma/client';
import prisma from '../src/utils/prisma';
import bcrypt from 'bcrypt';
import fs from 'fs';

async function main() {
  const jsonData = fs.readFileSync('prisma/a.json', 'utf-8');
  const employes = JSON.parse(jsonData).map((e: any) => ({
    ...e,
    dateRejoint: new Date(e.dateRejoint),
    dateNaissance: new Date(e.dateNaissance),
  }));

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
        description: 'Responsable de suivi des mission sismiques',
      },
      {
        nom: 'administrateur',
        description: 'Responsable de system',
      },
      {
        nom: 'gestionnaire',
        description: "Responsable de l'execution de la mission sur terrain",
      },
      {
        nom: 'ouvrier',
        description: 'ouvrier qui occupe un poste',
      },
      {
        nom: 'agent de sécurité',
        description: 'agent pour assurer la sécurité dans le camp',
      },
      {
        nom: 'medcin',
        description:
          'consiste à diagnostiquer, traiter et prévenir les maladies et les blessures des patients',
      },
    ],
  });

  // await prisma.etatEmploye.createMany({
  //   data: [{ libEtat: 'En mission' }, { libEtat: 'En congé' } , { libEtat: 'en maladie' } , { libEtat: 'en sanctionné' }],
  // });

  await prisma.wilaya.createMany({
    data: [
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
      { numWilaya: 28, nom: "M'Sila" },
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
      { numWilaya: 57, nom: "El M'Ghair" },
      { numWilaya: 58, nom: 'El Meniaa' },
    ],
  });

  await prisma.activite.createMany({
    data: [
      {
        codeActivite: 'ENR',
        nomAct: 'Enregistrement',
        description: "Activité d'enregistrement des reflexions sismique",
      },
      {
        codeActivite: 'TOPO',
        nomAct: 'Topographie',
        description:
          'Activité pour étudie la forme et les caractéristiques de la surface de la Terre',
      },
      {
        codeActivite: 'LAY',
        nomAct: 'Layonnage',
        description: 'pour faciliter le deplacement des materiels',
      },
      {
        codeActivite: 'POSE',
        nomAct: 'Pose',
        description: 'la pose des geophones sur terre',
      },
      {
        codeActivite: 'RAM',
        nomAct: 'Ramasse',
        description: 'le ramasse des geophones sur terre',
      },
      {
        codeActivite: 'VIB',
        nomAct: 'Vibration',
        description:
          'la creation des ondes sismiques par les camions vibrateurs',
      },
    ],
  });

  await prisma.typeMateriel.createMany({
    data: [
      { libelle: 'Camions de transport' },
      { libelle: 'Véhicules tout-terrain (4x4)' },
      { libelle: 'Véhicules utilitaires légers ' },
      { libelle: 'Excavatrice' },
      { libelle: 'Niveleuse' },
      { libelle: 'Bulldozer' },
      { libelle: 'Vibreurs' },
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
    data: employes,
  });

  await prisma.materiel.createMany({
    data: [
      {
        codeMat: '0001',
        marque: 'sercel',
        modele: 'NOMAD 90 NEO',
        dateService: new Date(2016, 2, 1),
        designation: 'vibro sercel 90',
        status: 2,
        matricule: '00001 816 30',
        codeMission: 'EGS210',
        idTypeMat: 1,
      },
      {
        codeMat: '0002',
        marque: 'sercel',
        modele: 'NOMAD 90 NEO',
        dateService: new Date(2013, 2, 1),
        designation: 'vibro sercel 90',
        status: 2,
        matricule: '00002 813 30',
        codeMission: 'EGS210',
        idTypeMat: 1,
      },
      {
        codeMat: '0003',
        marque: 'sercel',
        modele: 'NOMAD 65 NEO',
        dateService: new Date(2011, 2, 1),
        designation: 'vibro sercel 90',
        status: 2,
        matricule: '00003 811 30',
        codeMission: 'EGS210',
        idTypeMat: 1,
      },
      {
        codeMat: '0004',
        marque: 'sercel',
        modele: 'NOMAD 65 NEO',
        dateService: new Date(2010, 2, 1),
        designation: 'vibro sercel 90',
        status: 2,
        matricule: '00004 810 30',
        codeMission: 'EGS210',
        idTypeMat: 1,
      },
      {
        codeMat: '0005',
        marque: 'sercel',
        modele: 'NOMAD 90 NEO',
        dateService: new Date(2019, 2, 1),
        designation: 'vibro sercel 90',
        status: 2,
        matricule: '00005 819 30',
        codeMission: 'EGS210',
        idTypeMat: 1,
      },

      {
        codeMat: '00067',
        marque: 'DMT',
        modele: 'B 11',
        dateService: new Date(2004, 2, 1),
        designation: 'vibro DMT B11',
        status: 2,
        matricule: '000067 804 30',
        codeMission: 'EGS210',
        idTypeMat: 1,
      },

      {
        codeMat: '00066',
        marque: 'DMT',
        modele: 'B 11',
        dateService: new Date(2015, 2, 1),
        designation: 'vibro DMT B11',
        status: 2,
        matricule: '000066 815 30',
        codeMission: 'EGS210',
        idTypeMat: 1,
      },    
      {
        codeMat: '0006',
        marque: 'ASTRA',
        modele: 'HD9 RIGID',
        dateService: new Date(2010, 2, 1),
        designation: 'labo astra HD9',
        status: 2,
        matricule: '00006 712 30',
        codeMission: 'EGS210',
        idTypeMat: 1,
      },
      {
        codeMat: '0007',
        marque: 'ASTRA',
        modele: 'HD9 RIGID',
        dateService: new Date(2013, 2, 1),
        designation: 'labo astra HD9',
        status: 2,
        matricule: '00007 713 30',
        codeMission: 'EGS210',
        idTypeMat: 1,
      },
      {
        codeMat: '0008',
        marque: 'ASTRA',
        modele: 'HD9 RIGID',
        dateService: new Date(2016, 2, 1),
        designation: 'labo astra HD9',
        status: 2,
        matricule: '00008 716 30',
        codeMission: 'EGS210',
        idTypeMat: 1,
      },
      {
        codeMat: '0009',
        marque: 'ASTRA',
        modele: 'HD9 RIGID',
        dateService: new Date(2015, 2, 1),
        designation: 'labo astra HD9',
        status: 2,
        matricule: '00009 715 30',
        codeMission: 'EGS210',
        idTypeMat: 1,
      },
      {
        codeMat: '0010',
        marque: 'CNHTC',
        modele: 'Howo 6x4 Dump Truck',
        dateService: new Date(2017, 2, 1),
        designation: 'labo astra HD9',
        status: 2,
        matricule: '00010 717 30',
        codeMission: 'EGS210',
        idTypeMat: 1,
      },

      {
        codeMat: '0011',
        marque: 'CNHTC',
        modele: 'Howo 6x4 Dump Truck',
        dateService: new Date(2017, 2, 1),
        designation: 'labo astra HD9',
        status: 2,
        matricule: '00011 717 30',
        codeMission: 'EGS210',
        idTypeMat: 1,
      },

      // -----------------------------------------------------------------------

      {
        codeMat: '00013',
        marque: 'sercel',
        modele: 'NOMAD 90 NEO',
        dateService: new Date(2015, 2, 1),
        designation: 'vibro sercel 90',
        status: 2,
        matricule: '000013 815 30',
        codeMission: 'EGS120',
        idTypeMat: 1,
      },
      {
        codeMat: '00014',
        marque: 'sercel',
        modele: 'NOMAD 90 NEO',
        dateService: new Date(2015, 2, 1),
        designation: 'vibro sercel 90',
        status: 2,
        matricule: '000014 815 30',
        codeMission: 'EGS120',
        idTypeMat: 1,
      },
      {
        codeMat: '00015',
        marque: 'sercel',
        modele: 'NOMAD 65 NEO',
        dateService: new Date(2013, 2, 1),
        designation: 'vibro sercel 90',
        status: 2,
        matricule: '000015 813 30',
        codeMission: 'EGS120',
        idTypeMat: 1,
      },
      {
        codeMat: '00016',
        marque: 'sercel',
        modele: 'NOMAD 65 NEO',
        dateService: new Date(2015, 2, 1),
        designation: 'vibro sercel 90',
        status: 2,
        matricule: '000016 815 30',
        codeMission: 'EGS120',
        idTypeMat: 1,
      },
      {
        codeMat: '00017',
        marque: 'sercel',
        modele: 'NOMAD 90 NEO',
        dateService: new Date(2015, 2, 1),
        designation: 'vibro sercel 90',
        status: 2,
        matricule: '000017 815 30',
        codeMission: 'EGS120',
        idTypeMat: 1,
      },

      {
        codeMat: '00018',
        marque: 'DMT',
        modele: 'B 11',
        dateService: new Date(2014, 2, 1),
        designation: 'vibro DMT B11',
        status: 2,
        matricule: '000018 814 30',
        codeMission: 'EGS120',
        idTypeMat: 1,
      },

      {
        codeMat: '00019',
        marque: 'DMT',
        modele: 'B 11',
        dateService: new Date(2023, 2, 1),
        designation: 'vibro DMT B11',
        status: 2,
        matricule: '000019 823 30',
        codeMission: 'EGS120',
        idTypeMat: 1,
      },    
      {
        codeMat: '00020',
        marque: 'ASTRA',
        modele: 'HD9 RIGID',
        dateService: new Date(2023, 2, 1),
        designation: 'labo astra HD9',
        status: 2,
        matricule: '000020 723 30',
        codeMission: 'EGS120',
        idTypeMat: 1,
      },
      {
        codeMat: '00021',
        marque: 'ASTRA',
        modele: 'HD9 RIGID',
        dateService: new Date(2022, 2, 1),
        designation: 'labo astra HD9',
        status: 2,
        matricule: '000021 722 30',
        codeMission: 'EGS120',
        idTypeMat: 1,
      },
      {
        codeMat: '00022',
        marque: 'ASTRA',
        modele: 'HD9 RIGID',
        dateService: new Date(2022, 2, 1),
        designation: 'labo astra HD9',
        status: 2,
        matricule: '000022 722 30',
        codeMission: 'EGS120',
        idTypeMat: 1,
      },
      {
        codeMat: '00023',
        marque: 'ASTRA',
        modele: 'HD9 RIGID',
        dateService: new Date(2021, 2, 1),
        designation: 'labo astra HD9',
        status: 2,
        matricule: '000023 721 30',
        codeMission: 'EGS120',
        idTypeMat: 1,
      },
      {
        codeMat: '00024',
        marque: 'CNHTC',
        modele: 'Howo 6x4 Dump Truck',
        dateService: new Date(2001, 2, 1),
        designation: 'labo astra HD9',
        status: 2,
        matricule: '00024 701 30',
        codeMission: 'EGS120',
        idTypeMat: 1,
      },

      {
        codeMat: '0025',
        marque: 'CNHTC',
        modele: 'Howo 6x4 Dump Truck',
        dateService: new Date(2015, 2, 1),
        designation: 'labo astra HD9',
        status: 2,
        matricule: '00025 715 30',
        codeMission: 'EGS120',
        idTypeMat: 1,
      },

      // ------------------------------------------------------------

      {
        codeMat: '00026',
        marque: 'sercel',
        modele: 'NOMAD 90 NEO',
        dateService: new Date(2020, 2, 1),
        designation: 'vibro sercel 90',
        status: 2,
        matricule: '000026 820 30',
        codeMission: 'EGS60',
        idTypeMat: 1,
      },
      {
        codeMat: '00027',
        marque: 'sercel',
        modele: 'NOMAD 90 NEO',
        dateService: new Date(2019, 2, 1),
        designation: 'vibro sercel 90',
        status: 2,
        matricule: '000027 819 30',
        codeMission: 'EGS60',
        idTypeMat: 1,
      },
      {
        codeMat: '00028',
        marque: 'sercel',
        modele: 'NOMAD 65 NEO',
        dateService: new Date(2018, 2, 1),
        designation: 'vibro sercel 90',
        status: 2,
        matricule: '000028 818 30',
        codeMission: 'EGS60',
        idTypeMat: 1,
      },
      {
        codeMat: '00029',
        marque: 'sercel',
        modele: 'NOMAD 65 NEO',
        dateService: new Date(2005, 2, 1),
        designation: 'vibro sercel 90',
        status: 2,
        matricule: '000029 805 30',
        codeMission: 'EGS60',
        idTypeMat: 1,
      },
      {
        codeMat: '00030',
        marque: 'sercel',
        modele: 'NOMAD 90 NEO',
        dateService: new Date(2010, 2, 1),
        designation: 'vibro sercel 90',
        status: 2,
        matricule: '000030 810 30',
        codeMission: 'EGS60',
        idTypeMat: 1,
      },

      {
        codeMat: '00031',
        marque: 'DMT',
        modele: 'B 11',
        dateService: new Date(2014, 2, 1),
        designation: 'vibro DMT B11',
        status: 2,
        matricule: '000031 814 30',
        codeMission: 'EGS60',
        idTypeMat: 1,
      },

      {
        codeMat: '00032',
        marque: 'DMT',
        modele: 'B 11',
        dateService: new Date(2013, 2, 1),
        designation: 'vibro DMT B11',
        status: 2,
        matricule: '000032 813 30',
        codeMission: 'EGS60',
        idTypeMat: 1,
      },

      /* --------------------------------- */
      
      {
        codeMat: '00033',
        marque: 'ASTRA',
        modele: 'HD9 RIGID',
        dateService: new Date(2011, 2, 1),
        designation: 'labo astra HD9',
        status: 2,
        matricule: '000033 711 30',
        codeMission: 'EGS60',
        idTypeMat: 1,
      },
      {
        codeMat: '00034',
        marque: 'ASTRA',
        modele: 'HD9 RIGID',
        dateService: new Date(2008, 2, 1),
        designation: 'labo astra HD9',
        status: 2,
        matricule: '00034 708 30',
        codeMission: 'EGS60',
        idTypeMat: 1,
      },
      {
        codeMat: '00035',
        marque: 'ASTRA',
        modele: 'HD9 RIGID',
        dateService: new Date(2008, 2, 1),
        designation: 'labo astra HD9',
        status: 2,
        matricule: '000035 708 30',
        codeMission: 'EGS60',
        idTypeMat: 1,
      },
      {
        codeMat: '00036',
        marque: 'ASTRA',
        modele: 'HD9 RIGID',
        dateService: new Date(2016, 2, 1),
        designation: 'labo astra HD9',
        status: 2,
        matricule: '000036 716 30',
        codeMission: 'EGS60',
        idTypeMat: 1,
      },

      /* ------------------------------- */

      {
        codeMat: '00037',
        marque: 'CNHTC',
        modele: 'Howo 6x4 Dump Truck',
        dateService: new Date(2013, 2, 1),
        designation: 'labo astra HD9',
        status: 2,
        matricule: '00037 713 30',
        codeMission: 'EGS60',
        idTypeMat: 1,
      },

      {
        codeMat: '0038',
        marque: 'CNHTC',
        modele: 'Howo 6x4 Dump Truck',
        dateService: new Date(2010, 2, 1),
        designation: 'labo astra HD9',
        status: 2,
        matricule: '00038 710 30',
        codeMission: 'EGS60',
        idTypeMat: 1,
      },

      //--------------------------------------------------------------------------

      {
        codeMat: '00039',
        marque: 'sercel',
        modele: 'NOMAD 90 NEO',
        dateService: new Date(2016, 2, 1),
        designation: 'vibro sercel 90',
        status: 2,
        matricule: '000039 816 30',
        codeMission: 'EGS170',
        idTypeMat: 1,
      },
      {
        codeMat: '00040',
        marque: 'sercel',
        modele: 'NOMAD 90 NEO',
        dateService: new Date(2010, 2, 1),
        designation: 'vibro sercel 90',
        status: 2,
        matricule: '000040 815 30',
        codeMission: 'EGS170',
        idTypeMat: 1,
      },
      {
        codeMat: '00041',
        marque: 'sercel',
        modele: 'NOMAD 65 NEO',
        dateService: new Date(2010, 2, 1),
        designation: 'vibro sercel 90',
        status: 2,
        matricule: '00041 815 30',
        codeMission: 'EGS170',
        idTypeMat: 1,
      },
      {
        codeMat: '00042',
        marque: 'sercel',
        modele: 'NOMAD 65 NEO',
        dateService: new Date(2012, 2, 1),
        designation: 'vibro sercel 90',
        status: 2,
        matricule: '000042 812 30',
        codeMission: 'EGS170',
        idTypeMat: 1,
      },
      {
        codeMat: '00043',
        marque: 'sercel',
        modele: 'NOMAD 90 NEO',
        dateService: new Date(2010, 2, 1),
        designation: 'vibro sercel 90',
        status: 2,
        matricule: '000043 810 30',
        codeMission: 'EGS170',
        idTypeMat: 1,
      },

      {
        codeMat: '00044',
        marque: 'DMT',
        modele: 'B 11',
        dateService: new Date(2020, 2, 1),
        designation: 'vibro DMT B11',
        status: 2,
        matricule: '000044 820 30',
        codeMission: 'EGS170',
        idTypeMat: 1,
      },

      {
        codeMat: '00045',
        marque: 'DMT',
        modele: 'B 11',
        dateService: new Date(2021, 2, 1),
        designation: 'vibro DMT B11',
        status: 2,
        matricule: '000045 821 30',
        codeMission: 'EGS170',
        idTypeMat: 1,
      },
      
      {
        codeMat: '00046',
        marque: 'ASTRA',
        modele: 'HD9 RIGID',
        dateService: new Date(2017, 2, 1),
        designation: 'labo astra HD9',
        status: 2,
        matricule: '000046 717 30',
        codeMission: 'EGS170',
        idTypeMat: 1,
      },
      {
        codeMat: '00047',
        marque: 'ASTRA',
        modele: 'HD9 RIGID',
        dateService: new Date(2018, 2, 1),
        designation: 'labo astra HD9',
        status: 2,
        matricule: '00047 718 30',
        codeMission: 'EGS170',
        idTypeMat: 1,
      },
      {
        codeMat: '00048',
        marque: 'ASTRA',
        modele: 'HD9 RIGID',
        dateService: new Date(2018, 2, 1),
        designation: 'labo astra HD9',
        status: 2,
        matricule: '000048 718 30',
        codeMission: 'EGS170',
        idTypeMat: 1,
      },
      {
        codeMat: '00049',
        marque: 'ASTRA',
        modele: 'HD9 RIGID',
        dateService: new Date(2019, 2, 1),
        designation: 'labo astra HD9',
        status: 2,
        matricule: '000049 719 30',
        codeMission: 'EGS170',
        idTypeMat: 1,
      },

      {
        codeMat: '00050',
        marque: 'CNHTC',
        modele: 'Howo 6x4 Dump Truck',
        dateService: new Date(2013, 2, 1),
        designation: 'labo astra HD9',
        status: 2,
        matricule: '00050 713 30',
        codeMission: 'EGS170',
        idTypeMat: 1,
      },

      {
        codeMat: '0051',
        marque: 'CNHTC',
        modele: 'Howo 6x4 Dump Truck',
        dateService: new Date(2014, 2, 1),
        designation: 'labo astra HD9',
        status: 2,
        matricule: '00051 714 30',
        codeMission: 'EGS170',
        idTypeMat: 1,
      },

      //--------------------------------------------------------------------------------------

      {
        codeMat: '00052',
        marque: 'sercel',
        modele: 'NOMAD 90 NEO',
        dateService: new Date(2016, 2, 1),
        designation: 'vibro sercel 90',
        status: 2,
        matricule: '000052 816 30',
        codeMission: 'EGS150',
        idTypeMat: 1,
      },
      {
        codeMat: '00053',
        marque: 'sercel',
        modele: 'NOMAD 90 NEO',
        dateService: new Date(2010, 2, 1),
        designation: 'vibro sercel 90',
        status: 2,
        matricule: '000053 815 30',
        codeMission: 'EGS150',
        idTypeMat: 1,
      },
      {
        codeMat: '00054',
        marque: 'sercel',
        modele: 'NOMAD 65 NEO',
        dateService: new Date(2010, 2, 1),
        designation: 'vibro sercel 90',
        status: 2,
        matricule: '00054 815 30',
        codeMission: 'EGS150',
        idTypeMat: 1,
      },
      {
        codeMat: '00055',
        marque: 'sercel',
        modele: 'NOMAD 65 NEO',
        dateService: new Date(2012, 2, 1),
        designation: 'vibro sercel 90',
        status: 2,
        matricule: '000055 812 30',
        codeMission: 'EGS150',
        idTypeMat: 1,
      },
      {
        codeMat: '00056',
        marque: 'sercel',
        modele: 'NOMAD 90 NEO',
        dateService: new Date(2010, 2, 1),
        designation: 'vibro sercel 90',
        status: 2,
        matricule: '000056 810 30',
        codeMission: 'EGS150',
        idTypeMat: 1,
      },

      {
        codeMat: '00057',
        marque: 'DMT',
        modele: 'B 11',
        dateService: new Date(2020, 2, 1),
        designation: 'vibro DMT B11',
        status: 2,
        matricule: '000057 820 30',
        codeMission: 'EGS150',
        idTypeMat: 1,
      },

      {
        codeMat: '00058',
        marque: 'DMT',
        modele: 'B 11',
        dateService: new Date(2021, 2, 1),
        designation: 'vibro DMT B11',
        status: 2,
        matricule: '000058 821 30',
        codeMission: 'EGS150',
        idTypeMat: 1,
      },

      /* --------------------------------- */
      
      {
        codeMat: '00059',
        marque: 'ASTRA',
        modele: 'HD9 RIGID',
        dateService: new Date(2017, 2, 1),
        designation: 'labo astra HD9',
        status: 2,
        matricule: '000059 717 30',
        codeMission: 'EGS150',
        idTypeMat: 1,
      },
      {
        codeMat: '00060',
        marque: 'ASTRA',
        modele: 'HD9 RIGID',
        dateService: new Date(2018, 2, 1),
        designation: 'labo astra HD9',
        status: 2,
        matricule: '00060 718 30',
        codeMission: 'EGS150',
        idTypeMat: 1,
      },
      {
        codeMat: '00061',
        marque: 'ASTRA',
        modele: 'HD9 RIGID',
        dateService: new Date(2018, 2, 1),
        designation: 'labo astra HD9',
        status: 2,
        matricule: '000061 718 30',
        codeMission: 'EGS150',
        idTypeMat: 1,
      },
      {
        codeMat: '00062',
        marque: 'ASTRA',
        modele: 'HD9 RIGID',
        dateService: new Date(2019, 2, 1),
        designation: 'labo astra HD9',
        status: 2,
        matricule: '000062 719 30',
        codeMission: 'EGS150',
        idTypeMat: 1,
      },

      /* ------------------------------- */

      {
        codeMat: '00063',
        marque: 'CNHTC',
        modele: 'Howo 6x4 Dump Truck',
        dateService: new Date(2013, 2, 1),
        designation: 'labo astra HD9',
        status: 2,
        matricule: '00063 713 30',
        codeMission: 'EGS150',
        idTypeMat: 1,
      },

      {
        codeMat: '0064',
        marque: 'CNHTC',
        modele: 'Howo 6x4 Dump Truck',
        dateService: new Date(2014, 2, 1),
        designation: 'labo astra HD9',
        status: 2,
        matricule: '00064 714 30',
        codeMission: 'EGS150',
        idTypeMat: 1,
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
