import colors from 'vuetify/es5/util/colors'

export default {
	/*
	** Nuxt rendering mode
	** See https://nuxtjs.org/api/configuration-mode
	*/
	mode: 'spa',
	/*
	** Nuxt target
	** See https://nuxtjs.org/api/configuration-target
	*/
	target: 'server',
	/*
	** Headers of the page
	** See https://nuxtjs.org/api/configuration-head
	*/
	head: {
		titleTemplate: '%s - ' + process.env.npm_package_name,
		title: process.env.npm_package_name || '',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,700;1,400&display=swap' }
		],
		script: [
			{ src: 'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js', integrity: 'sha256-/H4YS+7aYb9kJ5OKhFYPUjSJdrtV6AeyJOtTkw6X72o=', crossorigin: 'anonymous' }
		]
	},
	/*
	** Global CSS
	*/
	css: [
	],
	/*
	** Plugins to load before mounting the App
	** https://nuxtjs.org/guide/plugins
	*/
	plugins: [
		'@/plugins/google-maps'
	],
	/*
	** Auto import components
	** See https://nuxtjs.org/api/configuration-components
	*/
	components: true,
	/*
	** Nuxt.js dev-modules
	*/
	buildModules: [
		'@nuxtjs/vuetify',
	],
	/*
	** Nuxt.js modules
	*/
	modules: [
		// Doc: https://axios.nuxtjs.org/usage
		'@nuxtjs/axios',
		'@nuxtjs/pwa',
		'@nuxtjs/dotenv'
	],
	/*
	** Axios module configuration
	** See https://axios.nuxtjs.org/options
	*/
	axios: {},
	/*
	** vuetify module configuration
	** https://github.com/nuxt-community/vuetify-module
	*/
	vuetify: {
		customVariables: ['~/assets/variables.scss'],
		theme: {
		dark: true,
		themes: {
			dark: {
			primary: colors.blue.darken2,
			accent: colors.grey.darken3,
			secondary: colors.amber.darken3,
			info: colors.teal.lighten1,
			warning: colors.amber.base,
			error: colors.deepOrange.accent4,
			success: colors.green.accent3
			}
		}
		}
	},
	/*
	** Build configuration
	** See https://nuxtjs.org/api/configuration-build/
	*/
	build: {
	},
	env: {
		VUE_APP_GOOGLE_MAPS_API_KEY: process.env.VUE_APP_GOOGLE_MAPS_API_KEY
	},
}
