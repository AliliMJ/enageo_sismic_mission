import { Route } from '../enums';
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
    children: [{ label: 'Missions', key: Route.Materiel }],
  },
];
export const optionsChefMission = [
  {
    label: `Tables`,
    key: 'tables',
    children: [{ label: 'Projets', key: Route.Materiel }],
  },
];

export const optionsAdmin = [
  {
    label: `Tables`,
    key: 'tables',
    children: [{ label: 'Utilisateurs', key: Route.Materiel }],
  },
];
const optionsCompte = [
  {
    type: 'group',
    label: 'Compte',
    key: 'compte',
    children: [
      { label: 'Profile', key: 'profile' },
      { label: 'Préférences', key: 'preferences' },
      { label: 'Déconnecter', key: 'logout' },
    ],
  },
];

const dashboardOption = [{ label: 'Tableau de bord', key: Route.Dashboard }];

export const createMenuOptions = (options) => [
  ...dashboardOption,
  ...options,
  ...optionsCompte,
];
