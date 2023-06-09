export const Role = Object.freeze({
  Administrateur: 'ADMINISTRATEUR',
  ChefMision: 'CHEF_MISSION',
  ChefTerrain: 'CHEF_TERRAIN',
  Gestionnaire: 'GESTIONNAIRE',
  Directeur: 'DIRECTEUR',
});

export const Fonctions = Object.freeze({
  ChefMision: 1,
  ChefTerrain: 2,
  Directeur: 3,
  Administrateur: 4,
  Gestionnaire: 5,
  Ouvrier: 6,
  Agent: 7,
  Medcin: 8,
});

export const Activites = Object.freeze({
  Enregistrement: 'ENR',
  Topographie: 'TOPO',
  Pose: 'POSE',
  Ramasse: 'RAM',
  Layonnage: 'LAY',
});

export const ActiviteUnit = Object.freeze({
  Enregistrement: 'Points vibrés',
  Topographie: 'Piquets',
  Pose: 'Grappe',
  Ramasse: 'Grappe',
});

export const Route = Object.freeze({
  Admin: 'admin',
  Gestionnaire: 'gestionnaire',
  Material: 'materiel',
  Projet: 'projet',
  Compte: 'compte',
  Mission: 'mission',
  Activity: 'activity',
  Profile: 'profile',
  Preference: 'preference',
  Employe: 'employe',
  Dashboard: 'dashboard',
  Terrain: 'terrain',
  Equipe: 'equipe',
  Rapport: 'rapport',
  Atelier: 'atelier',
  Carte: 'carte',
  Analyse: 'analyse',
  Ressource: 'ressource',
  DemandeReparation: 'demandeReparation',
  EmployesAdmin: 'EmployesAdmin',
  MaterielsAdmin: 'MaterielsAdmin',
  MaterielAdmin: 'MaterielAdmin',
  CreateResource: 'createResource',
  Stock: 'stock',
});

export const groupeSanguin = Object.freeze({
  AP: 'A+',
  AN: 'A-',
  BP: 'B+',
  BN: 'B-',
  ABP: 'AB+',
  ABN: 'AB-',
  OP: 'O+',
  ON: 'O-',
});

export const etatEmployeEnum = Object.freeze({
  Mission: 'mission',
  Conge: 'conge',
  Maladie: 'maladie',
  Travail: 'travail',
});

export const etatProjet = Object.freeze([
  'PLANIFICATION',
  'EN_PRODUCTION',
  'TERMINE',
]);
export const etatProjetText = Object.freeze([
  'Planification',
  'Production',
  'Terminé',
]);

export const Mesure = Object.freeze({
  Volume: 'V',
  Longeur: 'L',
  Surface: 'S',
  Poids: 'P',
  Quantite: 'Q',
});
export const MissionType = Object.freeze(['Mission2D', 'Mission3D']);
