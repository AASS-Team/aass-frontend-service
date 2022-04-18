<template>
	<div
		class="flex flex-col bg-gray-800 shadow-lg"
		style="transition: width 0.1s ease-in-out"
		:class="isNavigationCollapsed ? 'w-24' : 'w-36 sm:w-48 md:w-56 xl:w-64'"
	>
		<router-link to="/">
			<div class="logo flex justify-center bg-yellow-500 h-16">
				<img
					src="@/assets/img/logo.svg"
					alt="FCHPT STU logo"
					class="h-full"
					:class="
						isNavigationCollapsed
							? 'px-2 w-full py-6'
							: 'w-full py-4'
					"
				/>
			</div>
		</router-link>

		<nav class="flex flex-col flex-1">
			<NavigationGroup
				v-for="group in navigation"
				:key="group.title"
				:group="group"
				:class="!isNavigationCollapsed ? 'mt-10' : ''"
			></NavigationGroup>

			<div class="flex flex-1 items-end">
				<a
					@click.prevent="toggleNavigation"
					href="javascript:void(0)"
					class="text-gray-600 hover:text-gray-500 p-5 w-full text-center"
				>
					<fa-icon
						:icon="[
							'fas',
							isNavigationCollapsed
								? 'chevron-right'
								: 'chevron-left'
						]"
					></fa-icon>
				</a>
			</div>
		</nav>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import NavigationGroup from '@/components/Navigation/NavigationGroup.vue';

export default defineComponent({
	components: {
		NavigationGroup
	},
	computed: {
		...mapGetters('AppStore', ['navigation', 'isNavigationCollapsed'])
	},
	methods: {
		...mapActions('AppStore', ['toggleNavigation'])
	}
});
</script>
