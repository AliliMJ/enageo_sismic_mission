import { Route } from '../enums';
import { renderMenuItem } from './menu/render';

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

export const optionsCompte = [
  {
    type: 'group',
    label: 'Compte',
    key: 'compte',
    children: [
      { label: renderMenuItem('Profile', Route.Profile) , key: Route.Profile },
      { label: renderMenuItem('Préférences', Route.Preference) , key: Route.Preference },
      { label: renderMenuItem('Déconnecter', 'logout'), key: 'logout' }, 
    ],
  },
];
