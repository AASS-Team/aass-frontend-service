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
					{{ tool.name }}
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
						:available="tool.available"
						style="position: absolute; left: -1em"
					/>
					{{ mapAvailable(tool.available) }}
				</div>
			</UiLabel>

			<UiLabel
				text="Typ"
				labelFor="type"
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
					{{ tool.type }}
				</div>
			</UiLabel>

			<div class="flex flex-row justify-end mt-5">
				<UiButton
					:disabled="this.loading"
					text="Upraviť nástroj"
					class="primary rounded-full ml-3"
					@click="
						this.$router.push({
							name: 'tool-edit',
							params: { id: tool?.id }
						})
					"
				></UiButton>
				<UiButton
					:disabled="this.loading"
					text="Vymazať nástroj"
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
import MapAvailable from '@/mixins/MapAvailable.mixin';
import UiStatusIcon from '@/components/ui/UiStatusIcon.vue';

export default defineComponent({
	components: {
		UiButton,
		UiLabel,
		UiStatusIcon
	},
	mixins: [MapAvailable],
	data: () => {
		return {
			loading: true
		};
	},
	computed: {
		...mapGetters('ToolStore', ['tool'])
	},
	methods: {
		...mapActions('AppStore', ['setAlert']),
		...mapActions('ToolStore', ['fetchTool', 'deleteTool', 'resetState']),

		confirmDelete() {
			if (confirm('Chcete vymazať tento nástroj?')) {
				this.deleteTool(this.tool.id).then(() => {
					return this.$router.push({
						name: 'tool-list'
					});
				});
			}
		}
	},
	mounted: function () {
		// initial loader
		this.loading = true;
		// fetch data from BE
		this.fetchTool(this.$route.params.id).finally(() => {
			this.loading = false;
		});
	},
	beforeUnmount() {
		this.resetState();
	}
});
</script>
