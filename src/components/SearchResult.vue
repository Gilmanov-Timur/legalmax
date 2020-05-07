<template>
	<div>
		<button type="button" class="btn btn-block d-block d-lg-none btn-primary text-nowrap mb-3" v-b-modal="'modal-callback'">
			{{ $t('order-advanced-search') }}
		</button>
	
		<TopButtons />

		<div class="search-results-title">
			{{ $t('matches-found') }}
		</div>
	
		<div class="search-results">
			<VuePerfectScrollbar class="custom-scrollbar">
				<div class="overflow-hidden w-100">
					<div class="row tm-list mb-2 mb-lg-0">
						<div class="col-6 col-sm-4 col-lg-3 col-xl-auto tm-col" v-for="trademark in trademarks" :key="trademark.id">
							<div class="tm-item" @click="() => selectTrademark(trademark.id)">
								<div class="tm-item-content">
									<div class="tm-item-image">
										<img :src="trademark.image" :alt="trademark.title" />
									</div>
									<div class="tm-item-title">
										{{ trademark.title }}
									</div>
									<div class="tm-item-subtitle">
										{{ $t('trademark') }}
										{{ trademark.number }}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</VuePerfectScrollbar>
		</div>

		<BottomButtons class="d-flex d-lg-none" />
	</div>
</template>

<script>
	import VuePerfectScrollbar from 'vue-perfect-scrollbar'

	export default {
		methods: {
			selectTrademark (id) {
				this.$emit('getTrademarkInfo', id)
			}
		},
		props: ['trademarks'],
		components: {
			VuePerfectScrollbar,
			TopButtons: require('./TopButtons.vue').default,
			BottomButtons: require('./BottomButtons.vue').default,
		}
	}
</script>