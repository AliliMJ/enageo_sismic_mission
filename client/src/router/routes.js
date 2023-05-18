import { createRouter, createWebHistory } from 'vue-router';
import { Role, Route } from '../enums';

//import Users from 'components/users/Users.vue';
//import UserInfo from 'components/users/UserInfo.vue';

//import Items from 'components/items/Items.vue';
//import ItemInfo from 'components/items/ItemInfo.vue';

//import Dashboard from 'components/dashboard/Dashboard.vue';
import Login from 'components/authentication/Login.vue';
import MaterialTable from 'components/tables/MaterialTable.vue';
import EmployesTable from 'components/tables/EmployesTable.vue';
import AccountTable from 'components/tables/AccountTable.vue';
import Home from 'app/Home.vue';
import Employe from 'components/pages/Employe.vue';
import Account from 'components/pages/Account.vue';
import Dashboard from 'components/dashboard/Dashboard.vue';
import Map from 'app/Map.vue';
import CreateRapport from 'components/pages/CreateRapport.vue';
import PivotTable from 'components/analysis/PivotTable.vue';
import AtelierTable from 'components/tables/AtelierTable.vue';
import MaterielAtelier from 'components/pages/MaterielAtelier.vue';
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
    meta: { title: "s'authentifier", icon: 'src/assets/lock.png' },
  },
  { path: '/denied' },
  {
    path: '/',
    component: Home,
    meta: {
      requireAuth: true,
      title: 'Tableau de board',
      icon: 'src/assets/ENA_GEO.png',
    },
    children: [
      { path: '', name: Route.Dashboard, component: Dashboard },
      {
        path: '/comptes',
        name: Route.Compte,
        component: AccountTable,
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
        path: '/employe',
        name: Route.Employe,
        component: EmployesTable,
        meta: {
          role: Role.Gestionnaire,
          title: 'les employés',
        },
      },
      {
        path: '/employe/:id',
        component: Employe,
        meta: { role: Role.Gestionnaire },
      },
      {
        path: '/materiel',
        name: Route.Material,
        component: MaterialTable,
        meta: { role: Role.Gestionnaire, title: 'les matériels' },
      },
      {
        path: '/atelier',
        name: Route.Atelier,
        component: AtelierTable,
        meta: { role: Role.Gestionnaire, title: "l'atelier mécanique" },
      },
      {
        path: '/atelier/:codeMat',
        component: MaterielAtelier,
        meta: { role: Role.Gestionnaire, title: 'details sur le materiel' },
      },
      {
        path: '/projet',
        name: Route.Projet,
        component: () => import('components/tables/ProjectTable.vue'),
        mata: { role: Role.ChefMision },
      },
      {
        path: '/projet/:idProjet',
        component: () => import('components/pages/Projet.vue'),
      },
      {
        path: 'projet/:idProjet/creerRapport',
        component: CreateRapport,
      },
      {
        path: '/equipe',
        name: Route.Equipe,
        component: () => import('components/tables/EquipesTable.vue'),
      },
      {
        path: '/profile',
        name: Route.Profile,
        component: () => import('app/Profile.vue'),
        meta: {
          title: 'Mon profile',
        },
      },
      {
        path: '/preference',
        name: Route.Preference,
        component: () => import('app/Preference.vue'),
        meta: {
          title: 'Préférences',
        },
      },
      {
        path: '/analyse',
        name: Route.Analyse,
        component: PivotTable,
      },
      {
        path: '/projet/creation',
        name: 'creationProjet',
        component: () => import('components/pages/CreateProject.vue'),
      },
      { path: '/carte', name: 'carte', component: Map },
      { path: '/terrain', name: Route.Terrain },
      {
        path: 'projet/ressource',
        name: 'demandeRessource',
        component: () => import('components/pages/DemandeRessource.vue'),
      },
    ],
  },
  // { path: '/logout', component: Logout, name: 'logout' },
  // {
  //   path: '/admin',
  //   name: Route.Admin,
  //   component: Admin,
  //   meta: { requireAuth: true, role: Role.Administrateur },
  //   children: [
  //     {
  //       path: '',
  //       component: AdminDashboard,
  //       name: 'adminDashboard',
  //     },
  //     {
  //       path: Route.Utilisateur,
  //       component: UsersTable,
  //       name: Route.Utilisateur,
  //     },
  //     {
  //       path: Route.Profile,
  //       component: Profile,
  //       name: Route.Profile,
  //     },
  //     {
  //       path: Route.Preference,
  //       component: AdminPreferences,
  //       name: Route.Preference,
  //     },
  //     { path: 'Profile', component: Profile, name: Route.profile },
  //   ],
  // },
  // {
  //   path: '/gestionnaire',
  //   component: Gestionnaire,
  //   name: Route.Gestionnaire,
  //   meta: { requireAuth: true, role: Role.Gestionnaire },
  //   children: [
  //     {
  //       path: '',
  //       component: GestDashboard,
  //       name: 'gestDashboard',
  //     },
  //     {
  //       path: Route.Material,
  //       component: MaterialTable,
  //       name: Route.Material,
  //     },
  //     {
  //       path: Route.Employe,
  //       component: EmployesTable,
  //       name: Route.Employe,
  //     },
  //     { path: 'Profile', component: Profile, name: Route.profile },
  //   ],
  // },

  // { path: '/', component: Loading, meta: { requireAuth: true } },
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

// router.beforeEach((to, from, next) => {
//   const authentication = JSON.parse(
//     window.localStorage.getItem('authentication')
//   );

//   if (!to.meta.requireAuth) {
//     if (to.path == '/login' && authentication?.isAuthenticated)
//       return next('/');
//     return next();
//   }

//   if (to.meta.requireAuth && !authentication?.isAuthenticated)
//     return next('/login');

//   if (to.meta.role && to.meta.role != authentication?.user?.role)
//     return next('/denied');

//   if (to.path == '/') {
//     if (authentication?.user?.role == Role.Administrateur)
//       return next('/admin');
//     if (authentication?.user?.role == Role.Gestionnaire)
//       return next('/gestionnaire');
//   }

//   return next();
// });

export default router;
