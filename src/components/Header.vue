<template>
	<header id="header" class="row align-items-center justify-content-end">
		<div class="col d-lg-none">
			<div class="logo">
				<img src="../assets/images/logo.png" class="img-fluid" alt="LegalMax" />
			</div>
		</div>
		<div class="col-auto d-lg-none">
			<button type="button" class="menu-toggler" @click="openSidebar" />
		</div>
		<div class="col-auto d-none d-lg-block">
			<Language />
		</div>
	</header>
</template>

<script>
	export default {
		methods: {
			openSidebar () {
				this.$eventBus.$emit('openSidebar')
			}
		},
		components: {
			'Language': require('./Language.vue').default
		}
	}
</script>