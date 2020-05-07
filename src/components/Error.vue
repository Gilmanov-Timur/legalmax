<template>
	<div class="text-center">
		<div class="p-4 mb-n3 p-lg-5 mb-lg-n4">
			<img src="../assets/images/error.png" class="img-fluid" alt="" />
		</div>
		<div class="h1 mb-4" v-html="$t('error-page-title')" />
		<BottomButtons :isErrorPage="true" />
	</div>
</template>

<script>
	export default {
		components: {
			BottomButtons: require('./BottomButtons.vue').default
		}
	}
</script>
