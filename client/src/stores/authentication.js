import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuth = defineStore('authentication', {
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),
  persist: true,
  actions: {
    async login(email, password) {
      try {
        const response = await axios.post('http://localhost:3000/login', {
          email,
          password,
        });

        const user = response.data;

        //const user = { role: Role.Administrateur };
        this.$patch({
          user,
          isAuthenticated: true,
        });

        return Promise.resolve('Successful');
      } catch (e) {
        if (e.response?.status === 401)
          return Promise.reject('Votre email ou mot de passe sont incorrects');
        if (e.response?.status === 4013)
          return Promise.reject(`Ce compte n'est pas encore validé`);
        return Promise.reject('Cannot loggin.');
      }
    },
    logout() {
      this.user = null;
      this.email = '';
      this.password = '';
      this.isAuthenticated = false;
      //window.localStorage.removeItem('authentication');
    },
    register() {
      console.log('user registered');
    },
  },
});
