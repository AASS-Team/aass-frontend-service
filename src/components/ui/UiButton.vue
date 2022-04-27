<template>
	<div
		class="flex justify-center items-center px-3 py-1 focus:outline-none"
		:class="{ disabled: disabled }"
	>
		<fa-icon
			v-if="icon"
			:icon="icon.type"
			:spin="icon.spin"
			:class="{ 'mr-2': !!text }"
		></fa-icon>

		<button
			style="text-align: center"
			:type="type"
			@click="$emit('click')"
			:disabled="this.disabled"
		>
			{{ text }}
		</button>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
	props: {
		text: {
			type: String,
			required: true
		},
		type: {
			type: String as PropType<UiButtonType>,
			default: 'button'
		},
		icon: {
			type: Object as PropType<UiButtonIcon>
		},
		disabled: {
			type: Boolean
		}
	}
});

type UiButtonType = 'button' | 'submit';
interface UiButtonIcon {
	icon: string | string[];
	spin: boolean;
}
</script>

<style
	scoped
	lang="scss"
>
div {
	@apply px-3 py-1 cursor-pointer;

	&:focus button,
	button:focus {
		@apply outline-none;
	}

	button {
		text-align: center;
	}

	&.primary {
		@apply bg-yellow-500 text-white hover:bg-yellow-400;
	}

	&.secondary {
		@apply border border-gray-600 text-gray-600 hover:bg-gray-200;
	}

	&.danger {
		@apply border border-red-500 text-red-500 hover:bg-red-500 hover:text-white;
	}

	&.disabled {
		@apply bg-gray-300 text-white hover:bg-gray-300 cursor-not-allowed border-0;

		button {
			@apply cursor-not-allowed;
		}
	}
}
</style>
