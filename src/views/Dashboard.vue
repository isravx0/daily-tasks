<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>{{ $t("tabs.dashboard") }}</ion-title>
			</ion-toolbar>
		</ion-header>

		<ion-content :fullscreen="true" class="ion-padding">
			<!-- Welcome -->
			<ion-text>
				<h2>{{ $t("dashboard.welcome") }}</h2>
				<p>{{ $t("dashboard.subtitle") }}</p>
			</ion-text>

			<!-- Cards -->
			<ion-grid>
				<ion-row>
					<ion-col size="12">
						<ion-card button @click="goTo('/dashboard/tasks')">
							<ion-card-header>
								<ion-card-title>{{ $t("tabs.tasks") }}</ion-card-title>
								<ion-card-subtitle>{{ $t("dashboard.tasksSubtitle") }}</ion-card-subtitle>
							</ion-card-header>
						</ion-card>
					</ion-col>

					<ion-col size="12">
						<ion-card button @click="goTo('/dashboard/habits')">
							<ion-card-header>
								<ion-card-title>{{ $t("tabs.habits") }}</ion-card-title>
								<ion-card-subtitle>{{ $t("dashboard.habitsSubtitle") }}</ion-card-subtitle>
							</ion-card-header>
						</ion-card>
					</ion-col>
				</ion-row>
			</ion-grid>
		</ion-content>
	</ion-page>
</template>

<script setup>
import { useRouter } from "vue-router";
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonText, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,} from "@ionic/vue";

const router = useRouter();

function goTo(path) {
	router.push(path);
}
</script>
