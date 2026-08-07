<template>
	<ion-app>
		<ion-router-outlet />
	</ion-app>
</template>

<script setup>
import { onMounted } from 'vue';
import { IonApp, IonRouterOutlet } from '@ionic/vue';

onMounted(() => {
  const savedBackground = localStorage.getItem('daily_tasks_background');
  if (savedBackground) document.documentElement.style.setProperty('--app-wallpaper', savedBackground);
});
</script>
