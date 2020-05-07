<template>
	<b-modal id="modal-callback" centered scrollable hide-footer size="sm" :header-close-label="$t('close')" header-close-content="" :title="$t('modal-callback-title')" @show="onShow">
		<div class="loader" v-if="isLoading">
			<b-spinner variant="primary" />
		</div>
		<div class="modal-result" v-if="response && response.success">
			<div class="icon-success">&#10003;</div>
			<h2 class="mt-3 mb-5" v-html="$t('callback-success')"/>
			<button type="button" class="btn btn-lg btn-white" @click="$bvModal.hide('modal-callback')">
				{{ $t('go-back') }}
			</button>
		</div>
		<div class="modal-result" v-if="response && !response.success">
			<div class="icon-error">!</div>
			<h2 class="mt-3 mb-5" v-html="$t('callback-error')"/>
			<button type="button" class="btn btn-lg btn-white" @click="$bvModal.hide('modal-callback')">
				{{ $t('go-back') }}
			</button>
		</div>
		<div :class="{'invisible': isError || response}">
			<div class="mb-4">
				{{ $t('modal-callback-subtitle') }}
			</div>
			<b-form @submit.stop.prevent="onSubmit">
				<b-form-group>
					<b-input-group>
						<template v-slot:prepend>
							<b-input-group-text class="input-group-icon">
								<img src="../assets/images/icon-user.svg" width="25" height="25" alt="" />
							</b-input-group-text>
						</template>
						<b-form-input
							type="text"
							name="callbackName"
							class="form-control"
							:placeholder="$t('name-input-placeholder')"
							v-model="$v.form.name.$model"
							:state="validateState('name')"
						/>
						<b-form-invalid-feedback class="mt-2">
							{{ $t('validation-name') }}
						</b-form-invalid-feedback>
					</b-input-group>
				</b-form-group>
				<b-form-group>
					<b-input-group>
						<template v-slot:prepend>
							<b-input-group-text class="input-group-icon">
								<img src="../assets/images/icon-phone.svg" width="19" height="27" alt="" />
							</b-input-group-text>
						</template>
						<b-form-input
							type="tel"
							name="callbackPhone"
							class="form-control"
							:placeholder="$t('phone-input-placeholder')"
							v-model="$v.form.phone.$model"
							:state="validateState('phone')"
						/>
						<b-form-invalid-feedback class="mt-2">
							{{ $t('validation-phone') }}
						</b-form-invalid-feedback>
					</b-input-group>
				</b-form-group>
				<b-form-group>
					<b-input-group>
						<vue-recaptcha :loadRecaptchaScript="true" :language="$i18n.locale" sitekey="6LfBm98UAAAAALbo5ez8De8i3TYyBBMCmRDCpP2y" @verify="recaptchaVerified" />
						<b-form-invalid-feedback class="d-block mt-2" v-if="recaptchaMessage">
							{{ recaptchaMessage }}
						</b-form-invalid-feedback>
					</b-input-group>
				</b-form-group>
				<div class="form-group mb-4">
					<div class="form-check">
						<input class="form-check-input checkbox" type="checkbox" id="callbackCheck" v-model="isAgree" />
						<label class="form-check-label" for="callbackCheck" v-html="$t('use-terms')" />
					</div>
				</div>
				<button class="btn btn-lg btn-block btn-white" :disabled="!isAgree">
					{{ $t('send') }}
				</button>
			</b-form>
		</div>
	</b-modal>
</template>

<script>
	import VueRecaptcha from 'vue-recaptcha'
	import { required } from 'vuelidate/lib/validators'

	export default {
		data () {
			return {
				isLoading: false,
				isError: false,
				isAgree: true,
				isRecaptchaVerified: false,
				recaptchaMessage: null,
				response: null,
				form: {
					name: null,
					phone: null,
					language: this.$i18n.locale
				}
			}
		},
		validations: {
			form: {
				name: {
					required
				},
				phone: {
					required
				}
			}
		},
		methods: {
			onShow() {
				this.isError = false
				this.response = null
				this.form.name = null
				this.form.phone = null
				this.$v.$reset()
			},
			onSubmit() {
				this.$v.form.$touch();

				if (this.$v.form.$anyError) {
					return
				} else if (!this.isRecaptchaVerified) {
					this.recaptchaMessage = this.$t('validation-captcha')
					return
				}

				this.isLoading = true
				this.axios({
					method: 'post',
					url: 'https://timra.ru/legalmax-static/callback.json',
					// data: this.form
				})
					.then((response) => {
						this.response = response.data
					})
					.catch(() => {
						this.isError = true
					})
					.finally(() => {
						this.isLoading = false
					})
			},
			validateState(name) {
				const { $dirty, $error } = this.$v.form[name];
				return $dirty ? !$error : null;
			},
			recaptchaVerified() {
				this.isRecaptchaVerified = true
				this.recaptchaMessage = null
			},
		},
		components: { VueRecaptcha }
	}
</script>