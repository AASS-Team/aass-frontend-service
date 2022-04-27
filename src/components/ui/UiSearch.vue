<template>
	<div
		class="bg-white flex flex-row-reverse items-center px-1 h-10"
		@click="handleClick"
		:class="{
			'w-10 justify-center': !extended && extendable,
			'w-48': extended && extendable,
			'rounded-full cursor-pointer': extendable
		}"
		style="transition: width 0.1s ease-in-out"
	>
		<fa-icon
			:icon="['fas', 'search']"
			class="text-gray-500"
			:class="{ 'px-1': extended }"
			onclick="document.querySelector('#searchForm').submit()"
		></fa-icon>
		<input
			v-show="extended"
			ref="input"
			type="search"
			class="focus:outline-none w-full py-1 pl-2"
			:class="{ 'rounded-full': extendable }"
			placeholder="Vyhľadať..."
			@input="valueChange($event)"
			@blur="handleBlur"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	data() {
		return {
			timeout: undefined as number | undefined,
			extended: false as boolean
		};
	},
	props: {
		extendable: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		valueChange(event: Event) {
			if (this.timeout) {
				clearTimeout(this.timeout);
			}
			this.timeout = setTimeout(() => {
				this.timeout = undefined;
				this.$emit(
					'valueChange',
					(event.target as HTMLInputElement).value
				);
			}, 250);
		},

		handleClick() {
			if (this.extendable && !this.extended) {
				this.extended = true;
			}
			this.$nextTick(() => {
				(this.$refs.input as HTMLInputElement).focus();
			});
		},

		handleBlur() {
			if (!(this.$refs.input as HTMLInputElement).value.trim()) {
				this.extended = false;
			}
		}
	}
});
</script>

<style
	scoped
	lang="scss"
>
input::-webkit-search-cancel-button {
	-webkit-appearance: none;
}

div[extendable],
div[extendable] input {
	@apply rounded-full;
}
</style>
