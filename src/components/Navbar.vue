<template>
  <ion-menu content-id="main-content" type="overlay">
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ $t("app.title") }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-menu-toggle auto-hide="true">
          <ion-item button router-link="/dashboard/tasks">
            <ion-icon :icon="checkboxOutline" slot="start" />
            <ion-label>{{ $t("tabs.tasks") }}</ion-label>
          </ion-item>

          <ion-item button router-link="/dashboard/habits">
            <ion-icon :icon="calendarOutline" slot="start" />
            <ion-label>{{ $t("tabs.habits") }}</ion-label>
          </ion-item>

          <ion-item button router-link="/dashboard/settings">
            <ion-icon :icon="settingsOutline" slot="start" />
            <ion-label>{{ $t("tabs.settings") }}</ion-label>
          </ion-item>
        </ion-menu-toggle>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>

<script setup>
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonMenuToggle,
} from "@ionic/vue";

import { checkboxOutline, calendarOutline, settingsOutline } from "ionicons/icons";
</script>
