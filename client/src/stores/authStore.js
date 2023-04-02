import { defineStore } from 'pinia';
import axios from 'axios';
import { useMessage } from 'naive-ui';

export const useAuth = defineStore('authentication', {
  state: () => ({
    user: null,
  }),
  actions: {
    async login(email, password) {
      try {
        const response = await axios.post('http://localhost:3000/login', {
          email,
          password,
        });

        window.localStorage.setItem(
          'authentication',
          JSON.stringify({
            email,
            password,
            isAuthenticated: true,
          })
        );
        this.user = { ...response.data };

        return Promise.resolve('Successful');
      } catch ({ response }) {
        if (response.status === 401)
          return Promise.reject('Votre email ou mot de passe sont incorrects');

        return Promise.reject(`Ce compte n'est pas encore validé`);
      }
    },
    logout() {
      this.user = null;
      window.localStorage.removeItem('authentication');
    },
    register() {
      console.log('user registered');
    },
  },
});
