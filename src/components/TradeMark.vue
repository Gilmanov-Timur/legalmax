<template>
	<div>
		<button type="button" class="btn btn-block d-block d-lg-none btn-primary text-nowrap mb-3" v-b-modal="'modal-callback'">
			{{ $t('order-advanced-search') }}
		</button>

		<TopButtons />

		<div class="font-weight-bold">
			{{ trademark.isValid ? $t('valid') : $t('not-valid') }}
		</div>

		<h2>
			{{ $t('trademark') }}
			{{ trademark.number }}
		</h2>

		<div class="trade-mark">
			<VuePerfectScrollbar ref="tradeMarkScroll" class="custom-scrollbar">
				<div class="overflow-hidden w-100">
					<div class="row">
						<div class="col-12 col-md-7 col-lg-6">
							<div class="tm-dates">
								<div class="row align-items-end mx-0 tm-date-row" v-for="term in trademark.dates">
									<div class="col px-0">
										<div class="tm-date">
											<span class="tm-date-title">
												{{ term.title }}
											</span>
										</div>
									</div>
									<div class="col-auto px-0">
										<div class="tm-date-value">
											{{ term.date }}
										</div>
									</div>
								</div>
							</div>

							<div class="p-3">
								<div class="mb-3" v-for="info in trademark.info">
									<div class="font-weight-bold text-primary">
										{{ info.title }}
									</div>
									{{ info.text }}
								</div>
							</div>
						</div>
						<div class="col-12 col-md-5 col-xl-5 offset-lg-1 mb-4 mb-md-0">
							<div class="tm-logo">
								<img :src="trademark.image" :alt="trademark.title" />
							</div>
							<div class="mb-3 font-weight-bold text-primary">
								{{ $t('trademark-classes') }}
							</div>
							<span class="badge badge-lg custom-badge tooltip-badge" v-b-tooltip.hover.top :title="getDescription(classNumber)" v-for="classNumber in trademark.classes" :key="classNumber">
								{{ classNumber }}
							</span>
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
	import mktu from '../assets/json/mktu.json'

	export default {
		data () {
			return {
				groups: mktu
			}
		},
		methods: {
			getDescription(number) {
				const groupItem = this.groups.find(group => group.classes.some(item => item.number === number))
				const classItem = groupItem.classes.find((classification) => classification.number === number)

				return classItem.description
			}
		},
		props: ['trademark'],
		components: {
			VuePerfectScrollbar,
			TopButtons: require('./TopButtons.vue').default,
			BottomButtons: require('./BottomButtons.vue').default
		}
	}
</script>