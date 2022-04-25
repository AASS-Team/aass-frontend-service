<template>
	<div class="h-screen bg-white flex">
		<Navigation />
		<div class="flex flex-col flex-1 h-screen max-h-full overflow-y-auto">
			<Header />
			<div
				class="flex flex-col flex-1 bg-gray-300 p-8 overflow-y-auto"
				style="max-height: calc(100vh - 65px)"
			>
				<router-view />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navigation from '@/components/Navigation/Navigation.vue';
import Header from '@/components/Header/Header.vue';

export default defineComponent({
	components: {
		Navigation,
		Header
	}
});
</script>
