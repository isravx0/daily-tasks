<template>
  <ion-page>
    <ion-header class="app-header"><ion-toolbar><ion-buttons slot="start"><ion-menu-button /></ion-buttons><ion-title>Settings</ion-title></ion-toolbar></ion-header>
    <ion-content :fullscreen="true" class="ion-padding settings-content">
      <section class="settings-intro"><p class="eyebrow">MAKE IT YOURS</p><h1>Your little space</h1><p>Choose a wallpaper that makes opening the app feel nice.</p></section>

      <section class="studio-card">
        <div class="studio-heading"><span class="studio-icon">✿</span><div><h2>Background Studio</h2><p>Pick a built-in wallpaper or use a photo from your device.</p></div></div>
        <div class="wallpaper-grid">
          <button v-for="wallpaper in wallpapers" :key="wallpaper.id" class="wallpaper-option" :class="{ selected: selectedBackground === wallpaper.value }" :style="wallpaper.style" @click="setBackground(wallpaper.value)">
            <span>{{ wallpaper.name }}</span><ion-icon v-if="selectedBackground === wallpaper.value" :icon="checkmarkCircle" />
          </button>
        </div>
        <label class="upload-wallpaper">
          <ion-icon :icon="imageOutline" />
          <span><strong>Use my own photo</strong><small>JPG, PNG, or WebP</small></span>
          <input type="file" accept="image/png,image/jpeg,image/webp" @change="uploadBackground" />
          <ion-icon class="upload-arrow" :icon="cloudUploadOutline" />
        </label>
        <ion-button v-if="isCustom" fill="clear" color="medium" size="small" @click="setBackground(DEFAULT_BACKGROUND)">Reset to default</ion-button>
      </section>

      <ion-card class="language-card"><ion-card-header><ion-card-title>Language</ion-card-title><ion-card-subtitle>Choose how the app speaks to you.</ion-card-subtitle></ion-card-header><ion-card-content><ion-item><ion-label>App language</ion-label><ion-select :value="locale" interface="popover" @ionChange="onLanguageChange"><ion-select-option value="en">English</ion-select-option><ion-select-option value="nl">Nederlands</ion-select-option><ion-select-option value="ar">العربية</ion-select-option></ion-select></ion-item></ion-card-content></ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonLabel, IonSelect, IonSelectOption, IonButton, IonIcon } from '@ionic/vue';
import { checkmarkCircle, cloudUploadOutline, imageOutline } from 'ionicons/icons';
import blossomWallpaper from '../assets/images/background.png';
import lavenderWallpaper from '../assets/images/backgrounds/background-image3.jpg';
import cozyWallpaper from '../assets/images/backgrounds/Cute backround.jpg';

const LANG_KEY = 'daily_tasks_lang';
const BACKGROUND_KEY = 'daily_tasks_background';
const DEFAULT_BACKGROUND = `url(${blossomWallpaper})`;
const { locale } = useI18n();
const selectedBackground = ref(DEFAULT_BACKGROUND);
const isCustom = computed(() => selectedBackground.value.startsWith('url(data:'));
const wallpapers = [
  { id: 'blossom', name: 'Blossom', value: DEFAULT_BACKGROUND, style: { backgroundImage: DEFAULT_BACKGROUND } },
  { id: 'lavender', name: 'Lavender', value: `url(${lavenderWallpaper})`, style: { backgroundImage: `url(${lavenderWallpaper})` } },
  { id: 'cozy', name: 'Cozy', value: `url(${cozyWallpaper})`, style: { backgroundImage: `url(${cozyWallpaper})` } },
  { id: 'cream', name: 'Cream', value: 'linear-gradient(135deg, #fff7e9, #fbe9ef)', style: { background: 'linear-gradient(135deg, #fff7e9, #fbe9ef)' } },
];

onMounted(() => setBackground(localStorage.getItem(BACKGROUND_KEY) || DEFAULT_BACKGROUND, false));
function applyBackground(value) { document.documentElement.style.setProperty('--app-wallpaper', value); }
function setBackground(value, persist = true) { selectedBackground.value = value; applyBackground(value); if (persist) localStorage.setItem(BACKGROUND_KEY, value); }
function uploadBackground(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  if (file.size > 3 * 1024 * 1024) { alert('Please choose an image smaller than 3 MB.'); event.target.value = ''; return; }
  const reader = new FileReader();
  reader.onload = () => setBackground(`url(${reader.result})`);
  reader.readAsDataURL(file);
}
function onLanguageChange(event) { locale.value = event.detail.value; localStorage.setItem(LANG_KEY, locale.value); }
</script>
