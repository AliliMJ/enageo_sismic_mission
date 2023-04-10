import { createRouter, createWebHistory } from 'vue-router';
import { Role, Route } from '../enums';

//import Users from 'components/users/Users.vue';
//import UserInfo from 'components/users/UserInfo.vue';

//import Items from 'components/items/Items.vue';
//import ItemInfo from 'components/items/ItemInfo.vue';

//import Dashboard from 'components/dashboard/Dashboard.vue';
import Login from 'components/authentication/Login.vue';
import Admin from 'app/Admin.vue';
import Gestionnaire from 'app/Gestionnaire.vue';
import Loading from 'app/Loading.vue';
import AdminDashboard from 'components/dashboard/AdminDashboard.vue';
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
  {
    path: '/admin',
    name: Route.Admin,
    component: Admin,
    meta: { requireAuth: true, role: 'admin' },
    children: [
      {
        path: '',
        component: AdminDashboard,
      },
    ],
  },
  {
    path: '/gestionnaire',
    component: Gestionnaire,
    name: Route.Gestionnaire,
    meta: { requireAuth: true, role: 'gestionnaire' },
    children: [
      {
        path: '',
        component: AdminDashboard,
      },
    ],
  },
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

  if (from.path == '/login') {
    if (authentication?.user?.role == 'admin') return next('/admin');
    if (authentication?.user?.role == 'gestionnaire')
      return next('/gestionnaire');
  }

  return next();
});

export default router;
