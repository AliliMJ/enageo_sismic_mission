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
import UsersTable from 'components/tables/UsersTable.vue';
import Home from 'app/Home.vue';
import Employe from 'components/pages/Employe.vue';
import User from 'components/pages/User.vue';
import Dashboard from 'components/dashboard/Dashboard.vue';

// const routes = [
//   { path: '/users', component: Users, name: names.users },
//   { path: '/users/:key', component: UserInfo },
//   { path: '/items', component: Items, name: names.items },
//   { path: '/items/:key', component: ItemInfo },
//   { path: '/dashboard', component: Dashboard, name: names.dashboard },
//   { path: '/login', component: Login, name: names.login },
// ];

const routes = [
  { path: '/login', component: Login },
  { path: '/denied' },
  {
    path: '/',
    component: Home,
    meta: { requireAuth: true },
    children: [
      { path: '', name: Route.Dashboard, component: Dashboard },
      {
        path: '/utilisateur',
        name: Route.Utilisateur,
        component: UsersTable,
        meta: { role: Role.Administrateur },
      },
      {
        path: '/utilisateur/:id',
        component: User,
        meta: { role: Role.Administrateur },
      },
      {
        path: '/employe',
        name: Route.Employe,
        component: EmployesTable,
        meta: { role: Role.Gestionnaire },
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
        meta: { role: Role.Gestionnaire },
      },
      {
        path: '/projet',
        name: Route.Projet,
        component: () => import('components/tables/ProjectTable.vue'),
        mata: { role: Role.ChefMision },
      },
      {
        path: '/profile',
        name: Route.Profile,
        component: () => import('app/Profile.vue'),
      },
      {
        path: '/preference',
        name: Route.Preference,
        component: () => import('app/Preference.vue'),
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
