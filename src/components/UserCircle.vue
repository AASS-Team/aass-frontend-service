<template>
	<div
		class="rounded-full text-white bg-yellow-500 w-10 h-10 flex justify-center items-center"
	>
		{{ firstChar }}
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		name: {
			type: String,
			required: true
		}
	},
	computed: {
		firstChar() {
			return this.name
				.split(' ')
				.map(str => str[0])
				.join('')
				.toUpperCase();
		}
	}
});
</script>

<style scoped></style>
