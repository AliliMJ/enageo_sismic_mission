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
  Enregistrement: 'ENRG',
  Topographie: 'TOPO',
  Pose: 'POSE',
  Ramasse: 'RAM',
  Layonnage: 'LAY',
});

export const Route = Object.freeze({
  Admin: 'admin',
  Gestionnaire: 'gestionnaire',
  Material: 'materiel',
  Projet: 'projet',
  Compte: 'compte',
  Mission: 'mission',
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
  DemandeReparation: 'demandeReparation' 
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
  'Termine',
]);
export const etatProjetText = Object.freeze([
  'Planification',
  'Production',
  'Terminé',
]);
