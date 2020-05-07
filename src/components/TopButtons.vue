<template>
	<div class="d-none d-lg-flex row justify-content-between mb-4">
		<div class="col col-auto pb-2">
			<button type="button" class="btn btn-primary d-block d-md-none text-nowrap" @click="onClickBack">
				{{ $t('to-search') }}
			</button>
			<button type="button" class="btn btn-primary d-none d-md-block text-nowrap" @click="onClickBack">
				{{ $t('back-to-search') }}
			</button>
		</div>
		<div class="col col-auto pb-2">
			<div class="row justify-content-center">
				<div class="col col-5 col-sm-6 col-lg-auto">
					<button type="button" class="btn btn-block btn-primary text-nowrap" v-b-modal="'modal-callback'">
						{{ $t('order-advanced-search') }}
					</button>
				</div>
				<div class="col col-7 col-sm-6 col-lg-auto">
					<button type="button" class="btn btn-secondary d-block d-md-none text-nowrap" v-b-modal="'modal-callback'">
						{{ $t('consultation') }}
					</button>
					<button type="button" class="btn btn-secondary d-none d-md-block text-nowrap" v-b-modal="'modal-callback'">
						{{ $t('get-consultation') }}
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		methods: {
			onClickBack () {
				this.$eventBus.$emit('openHomePage')
			}
		}
	}
</script>