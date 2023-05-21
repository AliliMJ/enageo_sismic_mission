import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuth = defineStore('authentication', {
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),
  persist: true,
  actions: {
    async login(username, password) {
      try {
        const response = await axios.post('http://localhost:3000/login', {
          username,
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
      this.username = '';
      this.password = '';
      this.isAuthenticated = false;
      window.localStorage.removeItem('authentication');
    },
    register() {
      console.log('user registered');
    },
  },
});

// export const useInfo = defineStore('informations', {
//   state: () => ({
//     employe: null,
//     projet: null,
//   }),
//   persist: true,
//   actions: {
//     async login(username, password) {
//       try {
//         const response = await axios.post('http://localhost:3000/login', {
//           username,
//           password,
//         });
        
//         const user = response.data;

//         const employe = (await axios.get("http://localhost:3000/employes/" + user.employeId)).data;
//         const projet = (await axios.get("http://localhost:3000/projets/projetByMission/" + employe.Mission.codeMission)).data;

//         this.$patch({
//           employe,
//           projet,
//         });

//         return Promise.resolve('Successful');
//       } catch (e) {
//         if (e.response?.status === 401)
//           return Promise.reject('Votre email ou mot de passe sont incorrects');
//         if (e.response?.status === 4013)
//           return Promise.reject(`Ce compte n'est pas encore validé`);
//         return Promise.reject('Cannot loggin.');
//       }
//     },
//     logout() {
//       this.employe=null;
//       this.projet=null;
//       window.localStorage.removeItem('informations');
//     },
//   },
// });
