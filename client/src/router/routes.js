import { createRouter, createWebHistory } from 'vue-router';
import { Role, Route } from '../utils/enums';

import Login from '../pages/Login.vue';
import Materials from '../pages/Materials.vue';
import Employes from '../pages/Employes.vue';
import Accounts from '../pages/Accounts.vue';
import Home from '../pages/Home.vue';
import Employe from '../pages/Employe.vue';
import Account from '../pages/Account.vue';
import Dashboard from '../pages/Dashboard.vue';
import Map from '../pages/Map.vue';
import CreateRapport from '../pages/CreateRapport.vue';
import Analysis from '../pages/Analysis.vue';
import Atelier from '../pages/Atelier.vue';
import MaterielAtelier from '../pages/MaterielAtelier.vue';
import Material from '../pages/Material.vue';
import AtelierExterne from '../pages/MaterielAtelierExterne.vue';
import DemandeReparation from '../pages/DemandeReparation.vue';
import Rapport from '../pages/Rapport.vue';
import Equipe from '../pages/Equipe.vue';

import Project from '../pages/Project.vue';
import Projects from '../pages/Projects.vue';
import Stock from '../pages/Stock.vue';
import DynamicResource from '../pages/DynamicResource.vue';

import EmployesAdmin from '../pages/EmployesAdmin.vue';
import EmployeAdmin from '../pages/EmployeAdmin.vue';
import MaterielsAdmin from '../pages/MaterielsAdmin.vue';
import MaterielAdmin from '../pages/MaterielAdmin.vue';

import CreateProject from '../pages/CreateProject.vue';
import Equipes from '../pages/Equipes.vue';
import Preference from '../pages/Preference.vue';
import Profile from '../pages/Profile.vue';
import Missions from '../pages/Missions.vue';
import Activity from '../pages/Activities.vue';

// const routes = [
//   { path: '/users', component: Users, name: names.users },
//   { path: '/users/:key', component: UserInfo },
//   { path: '/items', component: Items, name: names.items },
//   { path: '/items/:key', component: ItemInfo },
//   { path: '/dashboard', component: Dashboard, name: names.dashboard },
//   { path: '/login', component: Login, name: names.login },
// ];

const routes = [
  {
    path: '/login',
    component: Login,
    meta: { title: "s'authentifier", icon: '/src/assets/lock.png' },
  },
  { path: '/denied' },
  {
    path: '/',
    component: Home,
    meta: {
      requireAuth: true,
      title: 'Tableau de board',
      icon: '/src/assets/ENA_GEO.png',
    },
    children: [
      { path: '', name: Route.Dashboard, component: Dashboard },
      {
        path: '/comptes',
        name: Route.Compte,
        component: Accounts,
        meta: {
          role: Role.Administrateur,
          title: 'les comptes des utilisateurs',
        },
      },
      {
        path: '/compte/:id',
        component: Account,
        meta: { role: Role.Administrateur, title: 'details sur compte' },
      },
      {
        path: '/employes',
        name: Route.Employe,
        component: Employes,
        meta: {
          role: Role.Gestionnaire,
          title: 'les employés',
        },
      },
      {
        path: '/employesList',
        name: Route.EmployesAdmin,
        component: EmployesAdmin,
        meta: {
          role: Role.Administrateur,
          title: 'les employés',
        },
      },
      {
        path: '/employe/:id',
        component: Employe,
      },
      {
        path: '/detailEmploye/:id',
        component: EmployeAdmin,
        meta: { role: Role.Administrateur },
      },
      {
        path: '/missions',
        name: Route.Mission,
        component: Missions,
      },
      {
        path: '/activities',
        name: Route.Activity,
        component: Activity,
      },
      {
        path: '/materiels',
        name: Route.Material,
        component: Materials,
        meta: { role: Role.Gestionnaire, title: 'les matériels' },
      },
      {
        path: '/materielsList',
        name: Route.MaterielsAdmin,
        component: MaterielsAdmin,
        meta: { role: Role.Administrateur },
      },
      {
        path: '/materielDetail/:codeMat',
        name: Route.MaterielAdmin,
        component: MaterielAdmin,
        meta: { role: Role.Administrateur },
      },
      {
        path: '/materiel/:codeMat',
        component: Material,
        meta: { role: Role.Gestionnaire, title: 'details sur le materiel' },
      },
      {
        path: '/atelier',
        name: Route.Atelier,
        component: Atelier,
        meta: { role: Role.Gestionnaire, title: "l'atelier mécanique" },
      },
      {
        path: '/DemandesReparation',
        name: Route.DemandeReparation,
        component: DemandeReparation,
        meta: { role: Role.ChefMission, title: 'les demandes des reparations' },
      },
      {
        path: '/atelier/:codeMat',
        component: MaterielAtelier,
        meta: { role: Role.Gestionnaire, title: 'details sur le materiel' },
      },
      {
        path: '/suiviMateriel/:codeMat',
        component: AtelierExterne,
        meta: { title: 'suivi du  le materiel' },
      },

      {
        path: '/projet/:idProjet/rapport/:idRapport',
        component: Rapport,
      },
      {
        path: '/projet/:idProjet/creerRapport',
        component: CreateRapport,
      },

      {
        path: '/projet/:idProjet',
        component: Project,
      },
      {
        path: '/projet',
        name: Route.Projet,
        component: Projects,
        mata: { role: Role.ChefMision },
      },

      {
        path: '/equipe',
        name: Route.Equipe,
        component: Equipes,
      },
      {
        path: '/equipe/:idEquipe',
        component: Equipe,
      },
      {
        path: '/profile',
        name: Route.Profile,
        component: Profile,
        meta: {
          title: 'Mon profile',
        },
      },
      {
        path: '/preference',
        name: Route.Preference,
        component: Preference,
        meta: {
          title: 'Préférences',
        },
      },
      {
        path: '/analyse',
        name: Route.Analyse,
        component: Analysis,
      },
      {
        path: '/projet/creation',
        name: 'creationProjet',
        component: CreateProject,
      },
      { path: '/carte', name: 'carte', component: Map },
      { path: '/terrain', name: Route.Terrain },
      // {
      //   path: '/ressource',
      //   name: Route.Ressource,
      //   component: DemandeRessource,
      // },
      {
        path: '/ressource/creation',
        name: Route.CreateResource,
        component: DynamicResource,
      },
      {
        path: '/ressource',
        name: Route.Ressource,
      },
      {
        path: '/stock',
        name: Route.Stock,
        component: Stock,
      },
    ],
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  const link = document.querySelector("[rel='icon']");
  link.setAttribute('href', to.meta.icon);
  const authentication = JSON.parse(
    window.localStorage.getItem('authentication')
  );
  if (to.meta.requireAuth) {
    if (!authentication?.isAuthenticated) return next('/login');
    else {
      if (to.meta.role) {
        if (to.meta.role === authentication?.user.role) return next();
        else return next('/denied');
      } else {
        return next();
      }
    }
  } else {
    next();
  }
});

export default router;
