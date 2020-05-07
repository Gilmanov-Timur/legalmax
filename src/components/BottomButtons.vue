<template>
	<div class="row justify-content-center mb-4">
		<div class="col col-5 col-sm-6 col-lg-5 col-xl-4">
			<template v-if="isErrorPage">
				<router-link :to="`/${$i18n.locale}`" class="btn btn-block btn-primary d-block d-md-none text-nowrap">
					{{ $t('to-search') }}
				</router-link>
				<router-link :to="`/${$i18n.locale}`" class="btn btn-block btn-primary d-none d-md-block text-nowrap">
					{{ $t('back-to-search') }}
				</router-link>
			</template>
			<template v-else>
				<button type="button" class="btn btn-block btn-primary d-block d-md-none text-nowrap" @click="onClickBack">
					{{ $t('to-search') }}
				</button>
				<button type="button" class="btn btn-block btn-primary d-none d-md-block text-nowrap" @click="onClickBack">
					{{ $t('back-to-search') }}
				</button>
			</template>
		</div>
		<div class="col col-7 col-sm-6 col-lg-5 col-xl-4">
			<button type="button" class="btn btn-block btn-secondary d-block d-md-none text-nowrap" v-b-modal="'modal-callback'">
				{{ $t('consultation') }}
			</button>
			<button type="button" class="btn btn-block btn-secondary d-none d-md-block text-nowrap" v-b-modal="'modal-callback'">
				{{ $t('get-consultation') }}
			</button>
		</div>
	</div>
</template>

<script>
	export default {
		methods: {
			onClickBack () {
				this.$eventBus.$emit('openHomePage')
			}
		},
		props: ['isErrorPage']
	}
</script>