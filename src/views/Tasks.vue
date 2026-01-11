<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>{{ $t("tabs.tasks") }}</ion-title>
			</ion-toolbar>
		</ion-header>

		<ion-content :fullscreen="true" class="ion-padding">
			<ion-card>
				<ion-card-header>
					<ion-card-title>{{ $t("label.to_doList") }}</ion-card-title>
					<ion-card-subtitle>{{ $t("label.to_doListSubtitle") }}</ion-card-subtitle>
				</ion-card-header>

				<ion-card-content>
					<!-- Add task -->
					<ion-item>
						<ion-input v-model="newTaskTitle" :placeholder="$t('tasks.placeholder')" @keyup.enter="addTask" clear-input/>
						<ion-button slot="end" @click="addTask" :disabled="!newTaskTitle.trim()">
							{{ $t("tasks.add") }}
						</ion-button>
					</ion-item>

					<!-- Empty state -->
					<ion-text v-if="tasks.length === 0" class="ion-padding-top">
						<p>{{ $t("tasks.empty") }}</p>
					</ion-text>

					<!-- Tasks list -->
					<ion-list v-else>
						<ion-item v-for="task in tasks" :key="task.id">
							<ion-checkbox
								slot="start"
								:checked="task.done"
								@ionChange="toggleTask(task.id)"
							/>
							<ion-label :style="{ textDecoration: task.done ? 'line-through' : 'none' }">
								{{ task.title }}
							</ion-label>

							<ion-button slot="end" fill="clear" color="danger" @click="removeTask(task.id)">
								{{ $t("tasks.delete") }}
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
import { IonPage, IonHeader,  IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonInput, IonButton, IonText, IonList, IonLabel, IonCheckbox } from "@ionic/vue";

const STORAGE_KEY = "daily_tasks_v1";

const newTaskTitle = ref("");
const tasks = ref([]);

// Load from localStorage
onMounted(() => {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		tasks.value = raw ? JSON.parse(raw) : [];
	} catch {
		tasks.value = [];
	}
});

// Save whenever tasks change
watch(
	tasks,
	(val) => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
	},
	{ deep: true }
);

function addTask() {
	const title = newTaskTitle.value.trim();
	if (!title) return;

	tasks.value.unshift({
		id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
		title,
		done: false,
		createdAt: new Date().toISOString(),
	});

	newTaskTitle.value = "";
}

function toggleTask(taskId) {
	const t = tasks.value.find((x) => x.id === taskId);
	if (!t) return;
	t.done = !t.done;
}

function removeTask(taskId) {
	tasks.value = tasks.value.filter((x) => x.id !== taskId);
}
</script>
