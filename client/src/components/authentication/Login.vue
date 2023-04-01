<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(null)
    }
  }
})
</script>

<template>
   <body>
  <div class="container">
    <form action="post">
      <h1 class="authLabel">Authentification</h1>
      <img class="logoImg" src="@/assets/ENAGEO.png" alt="erreur">
      <div class="inputContainer">
      <input class="input" type="text" placeholder=" " required>
      <label for="username" class="placeholder">nom d'utilisateur</label>
    </div>
    <div class="separator"></div>
    <div class="inputContainer">
      <input class="input" type="password" placeholder=" " required>
      <label for="password" class="placeholder">mot de passe</label>
    </div>

      <div class="forget">mot de passe oubliee</div>

      <input class="button-4" type="submit" value="connexion">

      <div class="create">creer un compte</div>

    </form>
  </div>

</body> 

  
</template>

<style scoped>
body {
  margin: 0;
  padding: 0;
  background-color: #ffed00;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  overflow: hidden;
}

.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(255, 255, 255);
  width: 400px;
  height: 450px;
  border-radius: 10px;
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
}

.authLabel {
  margin-bottom: 20px;
  text-align: center;
}

.forget {
  margin: 0px 0px 10px 0px;
  padding: 0;
  top: -10px;
  left: 65px;
  text-decoration: underline;
}

.logoImg {
  width: 100px;
  height: 100px;
  left: 138px;
  margin-bottom: 30px;
}

.separator {
  height: 15px;
}

/* start input style */

.inputContainer {
    height: 50px;
    position: relative;
    width: 100%;
    text-align: center;
  }
  
  
  .input {
    box-sizing: border-box;
    color: #787878;
    font-size: 18px;
    outline: 0;
    padding: 4px 20px 0;
    height: 40px;
  }

  .input:focus {
    border: 1px solid #fbff00;
  }
  
  .placeholder {
    color: #96969b;
    background-color: white;
    font-family: sans-serif;
    left: 70px;
    line-height: 14px;
    pointer-events: none;
    position: absolute;
    transform-origin: 0 50%;
    transition: ease 200ms, color 150ms;
    top: 12px;
  }
  
  .input:focus~.placeholder,
  .input:not(:placeholder-shown)~.placeholder {
    transform: translateY(-18px) translateX(10px);
    color: #ffed00;
    font-size: 14px;
  }
  
  .input:not(:placeholder-shown)~.placeholder {
    color: #ffed00;
  }

/* end input style */


/* Start button style  */

.button-4 {
  appearance: none;
  background-color: #ffed00;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0, rgba(255, 255, 255, 0.25) 0 1px 0 inset;
  box-sizing: border-box;
  color: #24292E;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
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
  width: 250px;
  height: 40px;
  text-align: center;
  font-weight: bold;
  left: 65px;
}

.button-4:hover {
  background-color: #f2f606;
  text-decoration: none;
  transition-duration: 0.1s;
}

.button-4:disabled {
  background-color: #00ed14;
  border-color: rgba(27, 31, 35, 0.15);
  color: #65f300;
  cursor: default;
}

.button-4:active {
  background-color: #00ff11;
  box-shadow: rgb(0, 228, 11) 0 1px 0 inset;
  transition: none 0s;
}

.button-4:focus {
  outline: 1px green;
}

.button-4:before {
  display: none;
}

.button-4:-webkit-details-marker {
  display: none;
}

/* End button style  */

</style>