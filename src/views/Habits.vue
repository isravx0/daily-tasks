<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>{{ $t("tabs.habits") }}</ion-title>
			</ion-toolbar>
		</ion-header>

		<ion-content :fullscreen="true" class="ion-padding">
			<ion-card>
				<ion-card-header>
					<ion-card-title>{{ $t("habits.title") }}</ion-card-title>
					<ion-card-subtitle>{{ $t("habits.subtitle") }}</ion-card-subtitle>
				</ion-card-header>

				<ion-card-content>
					<!-- Add habit -->
					<ion-item>
						<ion-input
							v-model="newHabitTitle"
							:placeholder="$t('habits.placeholder')"
							@keyup.enter="addHabit"
							clear-input
						/>
						<ion-button slot="end" @click="addHabit" :disabled="!newHabitTitle.trim()">
							{{ $t("habits.add") }}
						</ion-button>
					</ion-item>

					<!-- Empty -->
					<ion-text v-if="habits.length === 0" class="ion-padding-top">
						<p>{{ $t("habits.empty") }}</p>
					</ion-text>

					<!-- Habit list -->
					<ion-list v-else>
						<ion-item v-for="h in habits" :key="h.id">
							<ion-checkbox
								slot="start"
								:checked="isDoneToday(h)"
								@ionChange="toggleDoneToday(h.id)"
							/>

							<ion-label>
								<div :style="{ textDecoration: isDoneToday(h) ? 'line-through' : 'none' }">
									{{ h.title }}
								</div>
								<small>
									{{ $t("habits.streak") }}: <b>{{ h.streak }}</b>
								</small>
							</ion-label>

							<ion-button slot="end" fill="clear" color="danger" @click="removeHabit(h.id)">
								{{ $t("habits.delete") }}
							</ion-button>
						</ion-item>
					</ion-list>
				</ion-card-content>
			</ion-card>
		</ion-content>
	</ion-page>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
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
	IonInput,
	IonButton,
	IonList,
	IonCheckbox,
	IonLabel,
	IonText,
} from "@ionic/vue";

const STORAGE_KEY = "daily_habits_v1";

const newHabitTitle = ref("");
const habits = ref([]);
const todayKey = ref(getTodayKey()); // "YYYY-MM-DD"

// Helpers
function getTodayKey() {
	const d = new Date();
	const y = d.getFullYear();
	const m = String(d.getMonth() + 1).padStart(2, "0");
	const day = String(d.getDate()).padStart(2, "0");
	return `${y}-${m}-${day}`;
}

function refreshDayIfNeeded() {
	const now = getTodayKey();
	if (todayKey.value !== now) {
		todayKey.value = now;
	}
}

function isDoneToday(habit) {
	return habit.lastDoneDate === todayKey.value;
}

// Load
onMounted(() => {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		habits.value = raw ? JSON.parse(raw) : [];
	} catch {
		habits.value = [];
	}

	// Optional: refresh day every minute (handles midnight while app is open)
	setInterval(refreshDayIfNeeded, 60_000);
});

// Save
watch(
	habits,
	(val) => localStorage.setItem(STORAGE_KEY, JSON.stringify(val)),
	{ deep: true }
);

function addHabit() {
	const title = newHabitTitle.value.trim();
	if (!title) return;

	habits.value.unshift({
		id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
		title,
		streak: 0,
		lastDoneDate: null, // "YYYY-MM-DD"
		createdAt: new Date().toISOString(),
	});

	newHabitTitle.value = "";
}

function toggleDoneToday(habitId) {
	const h = habits.value.find((x) => x.id === habitId);
	if (!h) return;

	// If already done today -> undo
	if (h.lastDoneDate === todayKey.value) {
		h.lastDoneDate = null;
		// (simple version) don’t decrement streak on undo
		return;
	}

	// If last done was yesterday -> streak++
	// If last done was earlier -> reset streak to 1
	const yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);
	const yKey = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(
		2,
		"0"
	)}-${String(yesterday.getDate()).padStart(2, "0")}`;

	if (h.lastDoneDate === yKey) {
		h.streak += 1;
	} else {
		h.streak = 1;
	}

	h.lastDoneDate = todayKey.value;
}

function removeHabit(habitId) {
	habits.value = habits.value.filter((x) => x.id !== habitId);
}
</script>
