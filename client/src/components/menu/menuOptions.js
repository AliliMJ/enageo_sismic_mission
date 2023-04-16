import { Route } from '../../enums';
import { renderIcon, renderMenuItem } from '../../utils/render';

import {
  SettingsOutline as Settings,
  PersonOutline as Person,
} from '@vicons/ionicons5';

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
    type: 'divider',
    key: 'divider',
  },
  {
    type: 'group',
    label: 'Compte',
    key: 'compte',
    children: [
      {
        label: renderMenuItem('Profile', 'profile'),
        key: Route.Profile,
        icon: renderIcon(Person),
      },
      {
        label: renderMenuItem('Préférences', Route.Preference),
        key: Route.Preference,
        icon: renderIcon(Settings),
      },
    ],
  },
];
