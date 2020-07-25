<template>
	<div class="app">
		<div class="main-content">
			<nuxt />
		</div>
		<Navbar />
	</div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
    components: {
        Navbar
	}
}
</script>

<style lang="scss">
	* {
		font-family: 'Nunito', 'Roboto', sans-serif;
	}

	html {
		box-sizing: border-box;
		font-size: 16px;
	}

	*, *:before, *:after {
		box-sizing: inherit;
	}

	body, h1, h2, h3, h4, h5, h6, p, ol, ul {
		margin: 0;
		padding: 0;
		font-weight: normal;
	}

	body, h1, h2, h3, h4, h5, h6, p, ol, ul, span, input {
		color: rgba(255, 255, 255, .8)!important;
	}

	ol, ul {
		list-style: none;
	}

	img {
		max-width: 100%;
		height: auto;
	}
    
	.main-content {
		width: 100%;
		height: calc(100vh - 70px);
		background: #333;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}   
</style>