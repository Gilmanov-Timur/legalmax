<template>
	<div id="sidebar" :class="{'sidebar-opened' : isOpened }">
		<div class="overlay" @click="toggleSidebar" />
		<aside>
			<div class="sidebar-top">
				<div class="row align-items-center justify-content-between mx-2">
					<div class="col-auto px-2">
						<button type="button" class="btn btn-secondary btn-lg btn-sidebar" v-b-modal="'modal-callback'">
							{{ $t('request-call') }}
						</button>
					</div>
					<div class="col-auto px-2">
						<div class="close-sidebar" @click="toggleSidebar">&times;</div>
					</div>
				</div>
			</div>
			<div class="sidebar-middle">
				<div class="mb-4 pb-2">
					<div class="sidebar-phone">
						<a href="tel:+77051394242">+7 705 139-42-42</a>
					</div>
					<div class="sidebar-website">
						<a href="https://legalmax-ip.kz" target="_blank">https://legalmax-ip.kz</a>
					</div>
					<div class="sidebar-email">
						<a href="mailto:kz@legalmaxlaw.com">kz@legalmaxlaw.com</a>
					</div>
				</div>
				<div class="d-flex align-items-center justify-content-between sidebar-social">
					<a href="https://www.facebook.com/LegalmaxLawFirm/" target="_blank" class="social-facebook" />
					<a href="https://t.me/legalmaxlawfirm" target="_blank" class="social-telegram" />
					<a href="https://t.me/legalmaxbot" target="_blank" class="social-bot" />
					<a href="https://www.linkedin.com/company/legalmax-advisers-group/" target="_blank" class="social-linkedin" />
				</div>
			</div>
			<div class="sidebar-bottom">
				<Language />
				<a href="https://legalmax-ip.kz" target="_blank" class="main-site">
					{{ $t('main-site') }}
				</a>
			</div>
		</aside>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				isOpened: false
			}
		},
		created () {
			this.$eventBus.$on('openSidebar', this.toggleSidebar)
		},
		beforeDestroy() {
			this.$eventBus.$off('openSidebar', this.toggleSidebar)
		},
		methods: {
			toggleSidebar () {
				this.isOpened = !this.isOpened
			}
		},
		components: {
			'Language': require('./Language.vue').default
		}
	}
</script>