import { defineStore } from 'pinia';

export const useAuth = defineStore('authentication', {
  state: () => ({
    user: {},
  }),
  actions: {
    login() {
      this.user.id = '04c729b544a9f30';
      this.user.email = 'user0.dev@moc.com';
      this.user.name = 'John Doe';
      this.user.isAuthenticated = true;

      window.localStorage.setItem('user', JSON.stringify(this.user));
    },
    logout() {
      this.user.id = '';
      this.user.email = '';
      this.user.name = '';
      this.user.isAuthenticated = false;
      window.localStorage.removeItem('user');
    },
    register() {
      console.log('user registered');
    },
  },
});
