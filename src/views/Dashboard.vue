<template>
  <ion-page>
    <ion-header class="app-header">
      <ion-toolbar>
        <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
        <ion-title>Little wins</ion-title>
        <ion-buttons slot="end"><ion-button fill="clear" aria-label="Open settings" @click="goTo('/dashboard/settings')"><ion-icon :icon="colorPaletteOutline" /></ion-button></ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding dashboard-content">
      <section class="greeting">
        <p class="eyebrow">{{ today }}</p>
        <h1>Make today feel good.</h1>
        <p>One small task, one caring habit, and you’re already moving forward.</p>
      </section>

      <section class="focus-card" @click="goTo('/dashboard/tasks')">
        <div class="focus-icon">✦</div>
        <div>
          <span class="focus-kicker">YOUR FOCUS</span>
          <h2>What is your one thing?</h2>
          <p>Write it down, then give it your full attention.</p>
        </div>
        <ion-icon class="arrow" :icon="arrowForwardOutline" />
      </section>

      <div class="section-heading"><h2>Keep your rhythm</h2><span>Today</span></div>
      <ion-grid class="quick-grid">
        <ion-row>
          <ion-col size="6">
            <button class="quick-card blush" @click="goTo('/dashboard/tasks')">
              <span class="quick-icon">✓</span><span class="quick-title">Tasks</span><small>Plan your day</small>
            </button>
          </ion-col>
          <ion-col size="6">
            <button class="quick-card lavender" @click="goTo('/dashboard/habits')">
              <span class="quick-icon">☀</span><span class="quick-title">Habits</span><small>Grow gently</small>
            </button>
          </ion-col>
        </ion-row>
      </ion-grid>

      <section class="encouragement">
        <span>🌷</span>
        <div><strong>A soft reminder</strong><p>Progress counts, even when it is quiet.</p></div>
      </section>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonMenuButton, IonIcon, IonGrid, IonRow, IonCol } from '@ionic/vue';
import { arrowForwardOutline, colorPaletteOutline } from 'ionicons/icons';

const router = useRouter();
const today = computed(() => new Intl.DateTimeFormat(undefined, { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date()));
const goTo = (path) => router.push(path);
</script>
