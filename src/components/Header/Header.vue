<template>
	<div
		class="flex h-16 justify-between shadow border-b border-gray-400 items-center"
		style="box-sizing: content-box"
	>
		<p class="pl-8 text-xl">Centrálne laboratóriá</p>
		<div class="flex justify-end h-full">
			<router-link
				class="flex px-5 items-center hover:cursor-pointer hover:bg-gray-100"
				to="/change-password"
			>
				<!-- TODO auth -->
				<!-- <user-circle :name="user.login"/>-->
				<span class="pl-3 text-gray-900">Jožko Gregor</span>
			</router-link>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>
