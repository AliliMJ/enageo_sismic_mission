<script setup>
import { useAuth } from 'stores/authStore';

const auth = useAuth();
const login = () => {
  auth.login();
  console.log('user has logged in');
};

const logout = () => {
  auth.logout();
  console.log('user has logged out');
};
</script>
<template>
  <h1>Login</h1>
  <button @click="login">Login</button>
  <button @click="logout">Logout</button>
</template>
