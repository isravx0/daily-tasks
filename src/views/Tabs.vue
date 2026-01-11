<template>
	<ion-page>
			<!-- SIDE MENU -->
			<ion-menu content-id="main" type="overlay">
				<ion-header>
					<ion-toolbar>
						<ion-title>{{ $t("app.title") }}</ion-title>
					</ion-toolbar>
				</ion-header>

				<ion-content>
					<ion-list>
						<ion-menu-toggle auto-hide="true">
							<ion-tab-button tab="dashboard" href="/dashboard">
								<ion-label>{{ $t("tabs.dashboard") }}</ion-label>
							</ion-tab-button>

							<ion-item button router-link="/dashboard/tasks">
								<ion-label>{{ $t("tabs.tasks") }}</ion-label>
							</ion-item>

							<ion-item button router-link="/dashboard/habits">
								<ion-label>{{ $t("tabs.habits") }}</ion-label>
							</ion-item>

							<ion-item button router-link="/dashboard/settings">
								<ion-label>{{ $t("tabs.settings") }}</ion-label>
							</ion-item>
						</ion-menu-toggle>
					</ion-list>
				</ion-content>
			</ion-menu>

			<!-- MAIN CONTENT -->
			<ion-tabs id="main">
				<ion-router-outlet />

				<ion-tab-bar slot="bottom">
					<ion-tab-button tab="dashboard" href="/dashboard">
						<ion-label>{{ $t("tabs.dashboard") }}</ion-label>
					</ion-tab-button>

					<ion-tab-button tab="tasks" href="/dashboard/tasks">
						<ion-label>{{ $t("tabs.tasks") }}</ion-label>
					</ion-tab-button>

					<ion-tab-button tab="habits" href="/dashboard/habits">
						<ion-label>{{ $t("tabs.habits") }}</ion-label>
					</ion-tab-button>

					<ion-tab-button tab="settings" href="/dashboard/settings">
						<ion-label>{{ $t("tabs.settings") }}</ion-label>
					</ion-tab-button>
				</ion-tab-bar>
			</ion-tabs>
	</ion-page>
</template>

<script setup>
import { IonPage, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonMenuToggle, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton } from "@ionic/vue";
</script>
