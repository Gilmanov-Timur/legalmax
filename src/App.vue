<template>
	<div id="app">
		<div id="wrapper">
			<div id="container">
				<div class="container">
					<Header />

					<main id="main">
						<div class="loader" v-if="isLoading">
							<b-spinner variant="primary" />
						</div>
						<div class="row align-items-center justify-content-between mb-2 mb-sm-4 pb-lg-3">
							<div class="col d-none d-lg-block">
								<div class="logo">
									<router-link :to="`/${$i18n.locale}`">
										<img src="./assets/images/logo.png" class="img-fluid" alt="LegalMax"/>
									</router-link>
								</div>
							</div>
							<div class="col col-auto mr-n2 mr-sm-0 mb-3 mb-sm-0">
								<div class="header-phone mb-1 mb-lg-0">
									<a href="tel:+77051394242">+7 705 139-42-42</a>
								</div>
								<div class="header-email d-lg-none">
									<a href="mailto:kz@legalmaxlaw.com">kz@legalmaxlaw.com</a>
								</div>
							</div>
							<div class="col col-auto ml-md-4 mb-3 mb-sm-0">
								<button type="button" class="btn btn-primary btn-lg" v-b-modal="'modal-callback'">
									{{ $t('request-call') }}
								</button>
							</div>
						</div>

						<div id="content">
							<template v-if="searchResult && searchResult.length === 0">
								<NotFound />
							</template>
							<template v-else-if="searchResult && searchResult.length > 0">
								<SearchResult :trademarks="searchResult" @getTrademarkInfo="(id) => getTrademarkInfo(id)" />
							</template>
							<template v-else-if="selectedTradeMark">
								<TradeMark :trademark="selectedTradeMark" />
							</template>
							<template v-else>
								<router-view @searchTrademarks="(params) => searchTradeMarks(params)" />
							</template>

							<div class="row justify-content-between d-flex d-lg-none">
								<div class="col col-auto">
									<button type="button" class="help" v-b-modal="'modal-help'" />
								</div>
							</div>
						</div>
					</main>

					<Footer/>
				</div>
			</div>
		</div>
		<Sidebar />
		<ModalHelp />
		<ModalCallback />
	</div>
</template>

<script>
	export default {
		name: 'App',
		data () {
			return {
				isLoading: false,
				isError: false,
				searchResult: null,
				selectedTradeMark: null
			}
		},
		created() {
			this.$eventBus.$on('openHomePage', () => {
				this.isError = false
				this.searchResult = null
				this.selectedTradeMark = null
			})
		},
		methods: {
			searchTradeMarks () {
				this.isLoading = true
				this.isError = false
				this.axios({
					method: 'post',
					url: 'https://timra.ru/legalmax-static/search.json',
					// data: params
				})
					.then((response) => {
						this.searchResult = response.data.trademarks
					})
					.catch(() => {
						this.isError = true
					})
					.finally(() => {
						this.isLoading = false
					})
			},
			getTrademarkInfo () {
				this.isLoading = true
				this.isError = false
				this.axios({
					method: 'post',
					url: 'https://timra.ru/legalmax-static/trademark.json'
				})
					.then((response) => {
						this.searchResult = null
						this.selectedTradeMark = response.data
					})
					.catch(() => {
						this.isError = true
					})
					.finally(() => {
						this.isLoading = false
					})
			}
		},
		components: {
			'Header': require('./components/Header.vue').default,
			'Footer': require('./components/Footer.vue').default,
			'Sidebar': require('./components/Sidebar.vue').default,
			'SearchResult': require('./components/SearchResult.vue').default,
			'TradeMark': require('./components/TradeMark.vue').default,
			'NotFound': require('./components/NotFound.vue').default,
			'ModalHelp': require('./components/ModalHelp.vue').default,
			'ModalCallback': require('./components/ModalCallback.vue').default
		}
	}
</script>
