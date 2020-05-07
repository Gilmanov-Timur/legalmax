<template>
	<div class="text-center">
		<div class="p-4 p-lg-5">
			<img src="../assets/images/not-found.png" class="img-fluid" alt="" />
		</div>
		<div class="h1 mb-5" v-html="$t('not-found-page-title')" />
		<BottomButtons />
	</div>
</template>

<script>
	export default {
		components: {
			BottomButtons: require('./BottomButtons.vue').default
		}
	}
</script>
