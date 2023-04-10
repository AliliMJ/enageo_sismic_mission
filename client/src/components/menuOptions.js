import { Route } from '../enums';
import { renderMenuItem } from './menu/render';
export const optionsGestion = [
  {
    label: `Tables`,
    key: 'tables',
    children: [
      { label: 'Matériel', key: Route.Materiel },
      { label: 'Employes', key: Route.Employe },
    ],
  },
];

export const optionsSupervisor = [
  {
    label: `Tables`,
    key: 'tables',
    children: [{ label: 'Missions', key: Route.Mission }],
  },
];
export const optionsChefMission = [
  {
    label: `Tables`,
    key: 'tables',
    children: [{ label: 'Projets', key: Route.Projet }],
  },
];

export const optionsAdmin = [
  {
    label: `Tables`,
    key: 'tables',
    children: [{ label: 'Utilisateurs', key: Route.Utilisateur }],
  },
];
const optionsCompte = [
  {
    type: 'group',
    label: 'Compte',
    key: 'compte',
    children: [
      { label: 'Profile', key: Route.Profile },
      { label: 'Préférences', key: Route.Preference },
      { label: renderMenuItem('Déconnecter', 'logout'), key: 'logout' },
    ],
  },
];

const dashboardOption = [{ label: 'Tableau de bord', key: 'dashboard' }];

export const createMenuOptions = (options) => [
  ...dashboardOption,
  ...options,
  ...optionsCompte,
];
