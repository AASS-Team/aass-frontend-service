import {
	createRouter,
	createWebHistory,
	RouteRecordRaw,
	RouterView
} from 'vue-router';
import BaseView from '@/views/BaseView.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: '/samples'
	},
	{
		path: '/',
		component: BaseView,
		children: [
			{
				path: '/samples',
				component: RouterView,
				children: [
					{
						path: '',
						name: 'sample-list',
						meta: {
							title: 'Vzorky'
						},
						component: () =>
							import
								(
								/* webpackChunkName: "SampleList" */ '@/views/Sample/SampleList.vue'
								)
					},
					{
						path: ':id',
						name: 'samples-detail',
						meta: {
							title: 'Detail vzorky'
						},
						component: () =>
							import
								(
								/* webpackChunkName: "SampleDetail" */ '@/views/Sample/SampleDetail.vue'
								)
					},
					{
						path: 'new',
						name: 'sample-new',
						meta: {
							title: 'Nová vzorka'
						},
						component: () =>
							import
								(
								/* webpackChunkName: "SampleCreate" */ '@/views/Sample/SampleCreate.vue'
								)
					},
					{
						path: ':id/edit',
						name: 'sample-edit',
						meta: {
							title: 'Upraviť vzorku'
						},
						component: () =>
							import
								(
								/* webpackChunkName: "SampleEdit" */ '@/views/Sample/SampleEdit.vue'
								)
					},

				]


			},
			{
				path: '/grants',
					component: RouterView,
					children: [
						{
							path: '',
							name: 'grant-list',
							meta: {
								title: 'Granty'
							},
							component: () =>
								import(
									/* webpackChunkName: "GrantList" */ '@/views/Grant/GrantList.vue'
								)
						},
						{
							path: 'new',
							name: 'grant-new',
							meta: {
								title: 'Nový grant'
							},
							component: () =>
								import(
									/* webpackChunkName: "GrantCreate" */ '@/views/Grant/GrantCreate.vue'
								)
						},
						{
							path: ':id',
							name: 'grant-detail',
							meta: {
								title: 'Detail grantu'
							},
							component: () =>
								import(
									/* webpackChunkName: "GrantDetail" */ '@/views/Grant/GrantDetail.vue'
								)
						},
						{
							path: ':id/edit',
							name: 'grant-edit',
							meta: {
								title: 'Upraviť grant'
							},
							component: () =>
								import(
									/* webpackChunkName: "GrantEdit" */ '@/views/Grant/GrantEdit.vue'
								)
						}
					]
			},
			{
				path: '/administration',
				component: RouterView,
				children: [
					{
						path: '',
						meta: {
							title: 'Správa laboratórií'
						},
						component: () =>
							import(
								/* webpackChunkName: "Administration" */ '@/views/Administration/Administration.vue'
							)
					},
					{
						path: 'labs',
						component: RouterView,
						children: [
							{
								path: '',
								name: 'lab-list',
								meta: {
									title: 'Laboratória'
								},
								component: () =>
									import(
										/* webpackChunkName: "LabList" */ '@/views/Administration/Lab/LabList.vue'
									)
							},
							{
								path: 'new',
								name: 'lab-new',
								meta: {
									title: 'Nové laboratórium'
								},
								component: () =>
									import(
										/* webpackChunkName: "LabCreate" */ '@/views/Administration/Lab/LabCreate.vue'
									)
							},
							{
								path: ':id',
								name: 'lab-detail',
								meta: {
									title: 'Detail laboratória'
								},
								component: () =>
									import(
										/* webpackChunkName: "LabDetail" */ '@/views/Administration/Lab/LabDetail.vue'
									)
							},
							{
								path: ':id/edit',
								name: 'lab-edit',
								meta: {
									title: 'Upraviť laboratórium'
								},
								component: () =>
									import(
										/* webpackChunkName: "LabEdit" */ '@/views/Administration/Lab/LabEdit.vue'
									)
							},
						]
					},
					{
						path: 'tools',
						component: RouterView,
						children: [
							{
								path: '',
								name: 'tool-list',
								meta: {
									title: 'Nástroje'
								},
								component: () =>
									import(
										/* webpackChunkName: "ToolList" */ '@/views/Administration/Tool/ToolList.vue'
									)
							},
							{
								path: ':id',
								name: 'tool-detail',
								meta: {
									title: 'Detail nástroja'
								},
								component: () =>
									import(
										/* webpackChunkName: "ToolDetail" */ '@/views/Administration/Tool/ToolDetail.vue'
									)
							},
							{
								path: 'new',
								name: 'tool-new',
								meta: {
									title: 'Nový nástroj'
								},
								component: () =>
									import(
										/* webpackChunkName: "ToolCreate" */ '@/views/Administration/Tool/ToolCreate.vue'
									)
							},
							{
								path: ':id/edit',
								name: 'tool-edit',
								meta: {
									title: 'Upraviť nástroj'
								},
								component: () =>
									import(
										/* webpackChunkName: "ToolEdit" */ '@/views/Administration/Tool/ToolEdit.vue'
									)
							},
						]
					}
				]
			}
		]
	},
	{
		path: '/404',
		name: '404',
		meta: {
			title: 'Stránka nenájdená'
		},
		component: () =>
			import(
				/* webpackChunkName: "PageNotFound" */ '@/views/PageNotFoundView.vue'
			)
	},
	{
		path: '/:pathMatch(.*)*',
		redirect: '/404'
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

router.beforeEach(to => {
	document.title = to.meta.title
		? `${to.meta.title} | ${process.env.VUE_APP_NAME}`
		: process.env.VUE_APP_NAME;
});

export default router;
