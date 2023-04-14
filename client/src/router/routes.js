import { createRouter, createWebHistory } from 'vue-router';
import { Role, Route } from '../enums';

//import Users from 'components/users/Users.vue';
//import UserInfo from 'components/users/UserInfo.vue';

//import Items from 'components/items/Items.vue';
//import ItemInfo from 'components/items/ItemInfo.vue';

//import Dashboard from 'components/dashboard/Dashboard.vue';
import Login from 'components/authentication/Login.vue';
import Logout from 'components/authentication/Logout.vue';
import Admin from 'app/Admin.vue';
import Gestionnaire from 'app/Gestionnaire.vue';
import Loading from 'app/Loading.vue';
import AdminDashboard from 'components/dashboard/AdminDashboard.vue';
import GestDashboard from 'components/dashboard/GestDashboard.vue';
import MaterialTable from 'components/tables/MaterialTable.vue';
import EmployesTable from 'components/tables/EmployesTable.vue';
import UsersTable from 'components/tables/UsersTable.vue';
<<<<<<< HEAD
import Profile from 'components/common/Profile.vue';
import Preferences from 'components/common/Preferences.vue';
=======
import Profile from 'app/Profile.vue';
>>>>>>> a026253fcc141808aa21ddf398dea0db5fd32bea
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
  { path: '/logout', component: Logout, name: 'logout' },
  {
    path: '/admin',
    name: Route.Admin,
    component: Admin,
    meta: { requireAuth: true, role: Role.Administrateur },
    children: [
      {
        path: '',
        component: AdminDashboard,
        name: 'adminDashboard',
      },
      {
        path: Route.Utilisateur,
        component: UsersTable,
        name: Route.Utilisateur,
      },
      {
        path: Route.Profile,
        component: Profile,
        name: Route.Profile,
      },
      {
        path: Route.Preference,
        component: Preferences,
        name: Route.Preference,
      },
    ],
  },
  {
    path: '/gestionnaire',
    component: Gestionnaire,
    name: Route.Gestionnaire,
    meta: { requireAuth: true, role: Role.Gestionnaire },
    children: [
      {
        path: '',
        component: GestDashboard,
        name: 'gestDashboard',
      },
      {
        path: Route.Material,
        component: MaterialTable,
        name: Route.Material,
      },
      {
        path: Route.Employe,
        component: EmployesTable,
        name: Route.Employe,
      },
    ],
  },
  { path: '/profile', component: Profile, name: 'profile' },

  { path: '/', component: Loading, meta: { requireAuth: true } },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach((to, from, next) => {
  const authentication = JSON.parse(
    window.localStorage.getItem('authentication')
  );

  if (!to.meta.requireAuth) return next();

  if (to.meta.requireAuth && !authentication?.isAuthenticated)
    return next('/login');

  if (to.meta.role && to.meta.role != authentication?.user?.role)
    return next('/denied');

  if (to.path == '/') {
    if (authentication?.user?.role == Role.Administrateur)
      return next('/admin');
    if (authentication?.user?.role == Role.Gestionnaire)
      return next('/gestionnaire');
  }

  return next();
});

export default router;
