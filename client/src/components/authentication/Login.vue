<script setup>
import { ref } from "vue";
import { useMessage } from 'naive-ui'
import { useRouter } from "vue-router";
import { useAuth } from "stores/authentication.js";

const auth = useAuth();
const message = useMessage()
const email = ref("");
const password = ref("");
const router = useRouter();


const login = async (e) => {
  e.preventDefault();
  try {
    await auth.login(email.value, password.value);
    return router.push("/");
  } catch (m) {
    console.log("not welcome");
    message.error(m)
  }
};

</script>

<script>
export default {
  methods: {
    beforeEnter(el){
      el.style.opacity=0;
    },
    enter(el) {
      el.style.transition = 'opacity 200ms ease-in-out';
      getComputedStyle(el);

      setTimeout(() => {
        el.style.opacity=1;
      });
    }
  },
}


</script>

<template>
  <div class="main">
    <transition appear :css="false" @before-enter="beforeEnter" @enter="enter">
      <div class="container">
        <h1 class="authLabel">Authentification</h1>
        <img class="logoImg" src="@/assets/ENAGEOTEXT.png" alt="erreur" />
        <form>
          <div class="inputContainer">
            <input
              class="input"
              v-model="email"
              type="text"
              placeholder=" "
              required
            />
            <label for="username" class="placeholder">email</label>
          </div>
          <div class="inputContainer">
            <input
              class="input"
              type="password"
              v-model="password"
              placeholder=" "
              required
            />
            <label for="password" class="placeholder">mot de passe</label>
          </div>
          <button @click="login" class="button-4">Connexion</button>
        </form>
      </div>
    </transition>
    <div class="footer-container">
      <h5 class="copyright">&#169; 2023</h5>
      <a target="_blank" class="website" href="https://www.enageo.com/"
        >enageo.com</a
      >
    </div>
  </div>
</template>

<style scoped>
.main {
  min-height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  background-color: #ffed00;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  overflow: hidden;
}

.website {
  text-decoration: none;
}

a,
a:visited,
a:hover,
a:active {
  color: black;
}

.copyright {
  text-decoration: none;
  font-weight: normal;
  font-weight: normal;
}

.footer-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 160px;
  position: absolute;
  bottom: 0%;
  left: 50%;
  transform: translate(-50%, 0%);
  height: 25px;
}
.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(255, 255, 255);
  width: 500px;
  height: 400px;
  border-radius: 10px;
  padding: 15px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  text-align: center;
}

.authLabel {
  margin-bottom: 30px;
  text-align: center;
}

.logoImg {
  width: 370px;
  height: 70px;
  margin-bottom: 10px;
  text-align: center;
  position: relative;
}

/* start input style */

.inputContainer {
  position: relative;
  text-align: center;
  margin: 20px 0px 10px 0px;
}

.input {
  box-sizing: border-box;
  color: #787878;
  font-size: 15px;
  outline: 0;
  padding: 0px 20px 0;
  height: 40px;
  width: 65%;

  /* border: 0.3px solid #202020; */
}

.input:focus {
  border: 1px solid #35bc00;
}

.placeholder {
  color: #96969b;
  background-color: white;
  font-family: sans-serif;
  left: 100px;
  line-height: 14px;
  pointer-events: none;
  position: absolute;
  transform-origin: 0 50%;
  transition: ease 200ms, color 150ms;
  top: 13px;
}

.input:focus ~ .placeholder,
.input:not(:placeholder-shown) ~ .placeholder {
  transform: translateY(-20px) translateX(10px);
  color: #35bc00;
  font-size: 14px;
}

.input:not(:placeholder-shown) ~ .placeholder {
  color: #35bc00;
}

/* end input style */

/* Start button style  */

.button-4 {
  appearance: none;
  background-color: #ffed00;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0,
    rgba(255, 255, 255, 0.25) 0 1px 0 inset;
  box-sizing: border-box;
  color: #24292e;
  cursor: pointer;
  display: inline-block;
  /* font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"; */
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  list-style: none;
  padding: 6px 16px;
  position: relative;
  transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
  word-wrap: break-word;
  width: 325px;
  height: 40px;
  font-weight: bold;
  margin-top: 30px;
}

.button-4:hover {
  background-color: #f2f606;
  text-decoration: none;
  transition-duration: 0.1s;
}

.button-4:disabled {
  background-color: #e6ea02;
  border-color: rgba(27, 31, 35, 0.15);
  color: #e6ea02;
  cursor: default;
}

.button-4:active {
  background-color: #e6ea02;
  box-shadow: rgb(209, 228, 0) 0 1px 0 inset;
  transition: none 0s;
}

.button-4:focus {
  outline: 1px rgb(220, 232, 0);
}

.button-4:before {
  display: none;
}

.button-4:-webkit-details-marker {
  display: none;
}

/* End button style  */

/* overlay animation start */
.container1-enter-from {
  opacity: 0;
}

.container1-enter-to {
  opacity: 1;
}

.container1-enter-active {
  transition: all 3s ease;
}

.container1-leave-from {
  opacity: 1;
}

.container1-leave-to {
  opacity: 0;
}

.container1-leave-active {
  transition: all 3s ease;
}

/* overlay animation end */
</style>
