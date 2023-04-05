import { createRouter, createWebHistory } from 'vue-router';
import { Role } from '../enums';

//import Users from 'components/users/Users.vue';
//import UserInfo from 'components/users/UserInfo.vue';

//import Items from 'components/items/Items.vue';
//import ItemInfo from 'components/items/ItemInfo.vue';

//import Dashboard from 'components/dashboard/Dashboard.vue';
import Login from 'components/authentication/Login.vue';
import Home from 'app/Home.vue';

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
  { path: '/', component: Home, meta: { requireAuth: true } },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach((to, from, next) => {
  const authentication = JSON.parse(
    window.localStorage.getItem('authentication')
  );
  if (to.meta.requireAuth && !authentication?.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
