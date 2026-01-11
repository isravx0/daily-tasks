<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>{{ $t("tabs.settings") }}</ion-title>
			</ion-toolbar>
		</ion-header>

		<ion-content :fullscreen="true" class="ion-padding">
			<ion-card>
				<ion-card-header>
					<ion-card-title>{{ $t("settings.languageTitle") }}</ion-card-title>
					<ion-card-subtitle>{{ $t("settings.languageSubtitle") }}</ion-card-subtitle>
				</ion-card-header>

				<ion-card-content>
					<ion-item>
						<ion-label>{{ $t("settings.language") }}</ion-label>
						<ion-select :value="locale" interface="popover" @ionChange="onLanguageChange">
							<ion-select-option value="en">English</ion-select-option>
							<ion-select-option value="nl">Nederlands</ion-select-option>
							<ion-select-option value="ar">العربية</ion-select-option>
						</ion-select>
					</ion-item>
				</ion-card-content>
			</ion-card>
		</ion-content>
	</ion-page>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonCard,
	IonCardHeader,
	IonCardTitle,
	IonCardSubtitle,
	IonCardContent,
	IonItem,
	IonLabel,
	IonSelect,
	IonSelectOption,
} from "@ionic/vue";

const LANG_KEY = "daily_tasks_lang";

const { locale } = useI18n();

// make it easier to bind in template
const localeValue = computed(() => locale.value);

function onLanguageChange(ev) {
	const newLang = ev.detail.value;
	locale.value = newLang;
	localStorage.setItem(LANG_KEY, newLang);
}
</script>
