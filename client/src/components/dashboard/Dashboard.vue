<script setup>
import AdminDashboard from './AdminDashboard.vue';
import GestDashboard from './GestDashboard.vue';
import DirecteurDashboard from './DirecteurDashboard.vue';
import ChefTerrainDashboard from './ChefTerrainDashboard.vue';
import { useAuth } from '../../stores/authentication';
import { Role } from '../../enums';
const auth = useAuth();
</script>

<template>
  <AdminDashboard v-if="auth.user.role === Role.Administrateur" />
  <GestDashboard v-else-if="auth.user.role === Role.Gestionnaire" />
  <DirecteurDashboard v-else-if="auth.user.role === Role.Directeur" />
  <ChefTerrainDashboard v-else-if="auth.user.role === Role.ChefTerrain" />
</template>
