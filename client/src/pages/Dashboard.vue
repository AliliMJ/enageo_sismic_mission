<script setup>
import AdminDashboard from '../views/admin/AdminDashboard.vue';
import GestDashboard from '../views/gestionnaire/GestDashboard.vue';
import DirecteurDashboard from '../views/directeur/DirecteurDashboard.vue';
import ChefTerrainDashboard from '../views/chefterrain/ChefTerrainDashboard.vue';
import { useAuth } from '../stores/authentication';
import { Role } from '../utils/enums';
const auth = useAuth();
</script>

<template>
  <AdminDashboard v-if="auth.user.role === Role.Administrateur" />
  <GestDashboard v-else-if="auth.user.role === Role.Gestionnaire" />
  <DirecteurDashboard v-else-if="auth.user.role === Role.Directeur" />
  <ChefTerrainDashboard v-else-if="auth.user.role === Role.ChefTerrain" />
</template>
