<template>
	<div class="bg-white rounded-lg">
		<div class="p-4 pl-6">
			<form
				ref="form"
				@submit.prevent="handleSubmit"
			>
				<h1 class="text-2xl">Nová analýza</h1>

				<UiLabel
					text="Vzorka"
					key="vzorka"
					labelFor="sample"
					class="mt-10"
				>
					<span
						v-if="this.loading"
						class="inline-block bg-gray-200 w-1/4 h-full opacity-50"
					>
						&nbsp;
					</span>
					<UiSelect
						v-else
						name="sample"
						:required="true"
						:options="samples"
						@select="onSampleSelect"
						class="w-1/4 text-gray-700"
					></UiSelect>
				</UiLabel>

				<UiLabel
					text="Laborant"
					labelFor="laborant"
				>
					<span
						v-if="this.loading"
						class="inline-block bg-gray-200 w-1/4 h-full opacity-50"
					>
						&nbsp;
					</span>
					<UiSelect
						v-else
						name="laborant"
						:required="true"
						:options="users"
						@select="onUserSelect"
						class="w-1/4 text-gray-700"
					></UiSelect>
				</UiLabel>

				<UiLabel
					text="Laboratórium"
					labelFor="lab"
					key="laboratorium"
				>
					<span
						v-if="this.loading"
						class="inline-block bg-gray-200 w-1/4 h-full opacity-50"
					>
						&nbsp;
					</span>
					<UiSelect
						v-else
						name="lab"
						:options="labs"
						:required="true"
						@select="onLabSelect"
						class="w-1/4 text-gray-700"
					></UiSelect>
				</UiLabel>

				<UiLabel
					text="Náradie"
					labelFor="tools"
					key="náradie"
				>
					<div class="flex-col w-1/4">
						<div
							id="toolsWrapper"
							class="flex-col"
						>
							<span
								v-if="this.loading"
								class="inline-block bg-gray-200 w-1/4 h-full opacity-50"
							>
								&nbsp;
							</span>
							<div
								v-for="(item, index) in analysis.tools"
								:key="item.id"
								class="flex flex-row relative items-center mb-3"
								v-else
							>
								<UiSelect
									class="w-full text-gray-700"
									:options="tools"
									name="tools"
									:selected="item.id"
									@select="e => onToolSelect(index, e)"
									:required="true"
								/>
								<a
									class="absolute text-xl remove-tool-btn cursor-pointer"
									style="right: -1em"
									@click="deleteTool(index)"
									>&times;</a
								>
							</div>
						</div>
						<UiButton
							text="+ Pridať nástroj"
							class="rounded-full secondary"
							@click="addTool()"
						/>
					</div>
				</UiLabel>

				<div class="flex flex-row justify-end mt-5">
					<UiButton
						text="Uložiť"
						:icon="
							saving
								? { type: ['fas', 'spinner'], spin: true }
								: null
						"
						type="submit"
						class="rounded-full w-24 primary"
					></UiButton>
				</div>
			</form>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UiButton from '@/components/ui/UiButton.vue';
import UiLabel from '@/components/ui/UiLabel.vue';
import { mapActions, mapGetters } from 'vuex';
import UiSelect from '@/components/ui/UiSelect.vue';
import { Sample } from '@/store/sample/sample.types';
import { Lab } from '@/store/lab/lab.types';
import { User } from '@/store/user/user.types';
import { Tool } from '@/store/tool/tool.types';

export default defineComponent({
	components: {
		UiSelect,
		UiButton,
		UiLabel
	},
	data() {
		return {
			saving: false,
			loading: true,
			analysis: {
				sample: undefined,
				laborant: undefined,
				lab: undefined,
				status: undefined,
				structure: undefined,
				tools: [{}]
			}
		};
	},
	computed: {
		...mapGetters('LabStore', ['labs']),
		...mapGetters('ToolStore', ['tools']),
		...mapGetters('SampleStore', ['samples']),
		...mapGetters('UserStore', ['users'])
	},
	methods: {
		...mapActions('AnalysisStore', ['saveAnalysis', 'resetState']),
		...mapActions('AppStore', ['setAlert']),
		...mapActions('LabStore', ['fetchLabs']),
		...mapActions('ToolStore', ['fetchTools']),
		...mapActions('SampleStore', ['fetchSamples']),
		...mapActions('UserStore', ['fetchUsers']),

		addTool: function () {
			this.analysis.tools.push({});
		},

		deleteTool: function (index: number) {
			console.log('This.analysis.tools: ', this.analysis.tools);
			console.log(
				'This.analysis.tools: ',
				this.analysis.tools.splice(index, 1)
			);
			this.analysis.tools = this.analysis.tools.splice(index, 1);
		},

		onSampleSelect(id: string) {
			this.analysis.sample = this.samples.find((s: Sample) => s.id == id);
		},

		onLabSelect(id: string) {
			this.analysis.lab = this.labs.find((l: Lab) => l.id == id);
		},

		onUserSelect(id: string) {
			this.analysis.laborant = this.users.find((u: User) => u.id == id);
		},

		onToolSelect(index: number, id: string) {
			this.analysis.tools[index] = this.tools.find(
				(t: Tool) => t.id == id
			);
			console.log('This.analysis.tools: ', this.analysis.tools);
		},

		handleSubmit() {
			this.saving = true;
			if ((this.$refs.form as HTMLFormElement).checkValidity()) {
				return this.saveAnalysis(this.analysis).then(() => {
					this.saving = false;
					return this.$router.push({
						name: 'analysis-list'
					});
				});
			} else {
				this.saving = false;
				(this.$refs.form as HTMLFormElement).reportValidity();
			}
		}
	},
	mounted: function () {
		// initial loader
		this.loading = true;

		// fetch data from BE
		Promise.all([
			this.fetchLabs(),
			this.fetchTools(),
			this.fetchSamples(),
			this.fetchUsers()
		]).then(() => {
			this.loading = false;
		});
	},
	beforeUnmount() {
		this.resetState();
	}
});
</script>
