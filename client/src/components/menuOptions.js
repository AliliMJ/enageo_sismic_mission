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
<<<<<<< HEAD
      { label: renderMenuItem('Profile', Route.Profile) , key: Route.Profile },
      { label: renderMenuItem('Préférences', Route.Preference) , key: Route.Preference },
      { label: renderMenuItem('Déconnecter', 'logout'), key: 'logout' }, 
=======
      { label: renderMenuItem('Profile', 'profile'), key: Route.Profile },
      { label: 'Préférences', key: Route.Preference },
      { label: renderMenuItem('Déconnecter', 'logout'), key: 'logout' },
>>>>>>> a026253fcc141808aa21ddf398dea0db5fd32bea
    ],
  },
];
