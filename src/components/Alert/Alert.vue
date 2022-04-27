<template>
	<transition name="fade">
		<div
			v-if="isAlertActive"
			class="flex justify-center w-full fixed mt-8 z-9999"
		>
			<div
				class="bg-white rounded shadow-2xl mx-6 md:mx-0 max-w-sm relative"
			>
				<button
					class="flex justify-center items-center close-icon cursor-pointer"
					@click="dismiss"
				>
					<fa-icon :icon="['fas', 'times']" />
				</button>
				<div
					class="p-4 border-t-4"
					:class="{
						'border-green-500': alert.type === 'success',
						'border-red-600': alert.type === 'error',
						'border-orange-500': alert.type === 'warning',
						'border-blue-500': alert.type === 'info'
					}"
				>
					{{ alert.message }}
				</div>
			</div>
		</div>
	</transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default defineComponent({
	computed: {
		...mapGetters('AppStore', ['alert', 'isAlertActive'])
	},
	watch: {
		isAlertActive(newValue) {
			// If alert was enabled, set timeout and then dismiss after certain amount of time
			if (newValue && this.alert.duration > 0) {
				setTimeout(() => this.dismiss(), this.alert.duration);
			}
		}
	},
	methods: {
		...mapActions('AppStore', ['dismissAlert']),
		dismiss() {
			return this.dismissAlert();
		}
	}
});
</script>

<style scoped>
.close-icon {
	@apply absolute w-4 h-4;
	background-color: rgba(255, 255, 255, 0.6);
	right: -0.9em;
	top: 0.2em;
}
</style>
