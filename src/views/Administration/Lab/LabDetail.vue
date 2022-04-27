<template>
	<div class="bg-white rounded-lg">
		<div class="p-4 pl-6">
			<h1 class="text-2xl mb-10">
				<span
					v-if="this.loading"
					class="inline-block bg-gray-200 w-3/4 h-full"
				>
					&nbsp;
				</span>
				<template v-else>
					{{ lab.name }}
				</template>
			</h1>

			<UiLabel
				text="stav"
				labelFor="status"
			>
				<span
					v-if="this.loading"
					class="inline-block bg-gray-200 w-1/4 h-full opacity-75"
				>
					&nbsp;
				</span>
				<div
					v-else
					class="relative flex items-center"
				>
					<UiStatusIcon
						:available="lab.available"
						style="position: absolute; left: -1em"
					/>
					{{ mapAvailable(lab.available) }}
				</div>
			</UiLabel>

			<UiLabel
				text="Adresa"
				labelFor="adress"
			>
				<span
					v-if="this.loading"
					class="inline-block bg-gray-200 w-1/4 h-full opacity-50"
				>
					&nbsp;
				</span>
				<div
					v-else
					class="relative flex items-center"
				>
					{{ lab.address }}
				</div>
			</UiLabel>

			<div class="flex flex-row justify-end mt-5">
				<UiButton
					:disabled="this.loading"
					text="Upraviť"
					class="primary rounded-full ml-3"
					@click="
						this.$router.push({
							name: 'lab-edit',
							params: { id: lab?.id }
						})
					"
				></UiButton>
				<UiButton
					:disabled="this.loading"
					text="Vymazať"
					class="danger rounded-full ml-3"
					@click="confirmDelete"
				></UiButton>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import UiButton from '@/components/ui/UiButton.vue';
import UiLabel from '@/components/ui/UiLabel.vue';
import LabMixin from '@/mixins/Lab.mixin';
import UiStatusIcon from '@/components/ui/UiStatusIcon.vue';

export default defineComponent({
	components: {
		UiButton,
		UiLabel,
		UiStatusIcon
	},
	mixins: [LabMixin],
	data: () => {
		return {
			loading: true
		};
	},
	computed: {
		...mapGetters('LabStore', ['lab'])
	},
	methods: {
		...mapActions('AppStore', ['setAlert']),
		...mapActions('LabStore', ['fetchLab', 'deleteLab', 'resetState']),

		confirmDelete() {
			if (confirm('Chcete vymazať toto laboratórium?')) {
				this.deleteLab(this.lab.id).then(() => {
					return this.$router.push({
						name: 'lab-list'
					});
				});
			}
		}
	},
	mounted: function () {
		// initial loader
		this.loading = true;
		// fetch data from BE
		return this.fetchLab(this.$route.params.id).finally(() => {
			this.loading = false;
		});
	},
	beforeUnmount() {
		this.resetState();
	}
});
</script>
