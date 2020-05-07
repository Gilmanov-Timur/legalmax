<template>
	<footer id="footer">
		<div class="d-block d-lg-none footer-links">
			<div class="row justify-content-between">
				<div class="col col-auto">
					<a href="https://legalmax-ip.kz" target="_blank">{{ $t('main-site') }}</a>
				</div>
				<div class="col col-auto">
					<a href="#" @click.prevent="openSidebar">{{ $t('contacts') }}</a>
				</div>
			</div>
		</div>
		<div class="d-none d-lg-block">
			<div class="row align-items-center justify-content-between">
				<div class="col">
					<div class="footer-phone">
						<a href="tel:+77051394242">+7 705 139-42-42</a>
					</div>
					<div class="footer-website">
						<a href="https://legalmax-ip.kz" target="_blank">https://legalmax-ip.kz</a>
					</div>
					<div class="footer-email">
						<a href="mailto:kz@legalmaxlaw.com">kz@legalmaxlaw.com</a>
					</div>
				</div>
				<div class="col-auto">
					<div class="footer-social">
						<a href="https://www.facebook.com/LegalmaxLawFirm/" target="_blank" class="social-facebook" />
						<a href="https://t.me/legalmaxlawfirm" target="_blank" class="social-telegram" />
						<a href="https://t.me/legalmaxbot" target="_blank" class="social-bot" />
						<a href="https://www.linkedin.com/company/legalmax-advisers-group/" target="_blank" class="social-linkedin" />
					</div>
				</div>
				<div class="col-auto ml-5">
					<button type="button" class="btn btn-secondary btn-lg" v-b-modal="'modal-callback'">
						{{ $t('request-call') }}
					</button>
				</div>
			</div>
		</div>
	</footer>
</template>

<script>
	export default {
		methods: {
			openSidebar () {
				this.$eventBus.$emit('openSidebar')
			}
		}
	}
</script>