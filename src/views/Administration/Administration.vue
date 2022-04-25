<template>
	<h1 class="text-2xl mb-3">Správa laboratórií</h1>

	<div class="flex flex-row">
		<router-link
			to="/"
			class="mb-5 mr-5"
		>
			<div
				class="flex flex-col bg-white h-64 w-64 pt-12 items-center group"
			>
				<fa-icon
					:icon="['fas', 'eye-dropper']"
					size="2x"
					class="text-gray-600 group-hover:text-yellow-500"
				></fa-icon>
				<p class="text-xl mt-8">Nástroje</p>
				<p class="text-gray-600 mt-2 px-5 text-center">
					Pridávajte, upravujte dostupné nástroje
				</p>
			</div>
		</router-link>

		<router-link :to="{ name: 'lab-list' }">
			<div
				class="flex flex-col bg-white h-64 w-64 pt-12 items-center group"
			>
				<fa-icon
					:icon="['fas', 'warehouse']"
					size="2x"
					class="text-gray-600 group-hover:text-yellow-500"
				></fa-icon>
				<p class="text-xl mt-8">Laboratóriá</p>
				<p class="text-gray-600 mt-2 px-5 text-center">
					Spravujte názvy a adresy laboratórií
				</p>
			</div>
		</router-link>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>
