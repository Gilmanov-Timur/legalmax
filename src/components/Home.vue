<template>
	<form class="search-form">
		<div class="help-desktop d-none d-lg-block">
			<button type="button" class="help" v-b-modal="'modal-help'" />
		</div>

		<div class="base-search">
			<div class="corner d-none d-lg-block"></div>

			<h1 class="title" v-html="$t('trademark-search-title')" />

			<div class="form-row align-items-center mb-3">
				<div class="col-12 col-md-8 mb-2 mb-md-0">
					<input
						type="text"
						class="form-control"
						:class="{'is-invalid': mainForm.errors.query}"
						:placeholder="$t('trademark-input-placeholder')"
						v-model="mainForm.inputs.query"
						@input="validateForm"
					/>
				</div>
				<div class="col">
					<div class="invalid-feedback" v-if="mainForm.errors.query" v-html="$t('validation-trademark')" />
				</div>
			</div>

			<div class="subtitle mb-2 pb-1" v-html="$t('choose-country')" />

			<div class="form mb-4 mb-lg-3">
				<div class="form-row align-items-center">
					<div class="col col-12 col-lg-auto col-xl-7 mb-sm-2">
						<div class="form-row align-items-center">
							<div class="col col-12 col-sm-4 col-lg-auto col-xl-4 mb-2 mb-sm-0" v-for="country in countries" :key="country">
								<div class="custom-control country-radio">
									<input
										type="radio"
										:id="`country-${country}`"
										name="country"
										:value="country"
										class="custom-control-input"
										v-model="mainForm.inputs.country"
										@change="validateForm"
									/>
									<label class="custom-control-label" :class="`label-${country}`" :for="`country-${country}`">
										{{ $t(`country-${country}`) }}
									</label>
								</div>
							</div>
						</div>
					</div>
					<div class="col col-12 col-lg-4 col-xl-5 mb-lg-2">
						<div class="invalid-feedback" v-if="mainForm.errors.country" v-html="$t('validation-country')" />
					</div>
				</div>
			</div>

			<div class="form-row mb-3 mb-lg-0">
				<div class="col-5 col-sm-4 col-lg-3 col-xl-2 mr-n2 mr-sm-0 mb-2 mb-sm-0">
					<button type="button" class="btn btn-block btn-primary" @click="validateForm">
						{{ $t('search') }}
					</button>
				</div>
				<div class="col col-sm-auto mb-2 mb-sm-0">
					<div class="d-block d-sm-none">
						<button type="button" class="btn btn-block btn-secondary text-nowrap" @click="isExtendedSearchOpened = !isExtendedSearchOpened">
							{{ $t('search-class') }}
							<span class="close-search" v-if="isExtendedSearchOpened" />
						</button>
					</div>
					<div class="d-none d-sm-block">
						<button type="button" class="btn btn-secondary" @click="isExtendedSearchOpened = true">
							{{ $t('choose-search-class') }}
						</button>
					</div>
				</div>
			</div>
		</div><!--base search-->

		<div class="extended-search" v-show="isExtendedSearchOpened">
			<div class="close-search d-none d-md-block" @click="isExtendedSearchOpened = false"></div>

			<div class="d-block d-lg-none mb-2">
				<div class="d-inline subtitle mr-1">
					{{ $t('selected-classes') }}
				</div>
				<div class="d-inline selected-items">
					<div class="selected-item" v-for="classNumber in selectedClasses.slice().sort((a, b) => a - b)" :key="classNumber">
						<span class="badge custom-badge">
							{{ classNumber }}
						</span>
					</div>
				</div>
			</div>

			<div class="row mb-2 mb-lg-3">
				<div class="col col-12 col-md-5 mb-3 mb-lg-0">
					<div class="classifications-list">
						<VuePerfectScrollbar ref="classListScroll" class="custom-scrollbar">
							<div
								class="list-item"
								:class="{active: index === activeGroupIndex}"
								v-for="(group, index) in groups"
								:key="index"
								@click="() => selectGroup(index)"
							>
								{{ group.title }}
								<span class="badge badge-primary">{{ getSelectedClassesCount(index) }}</span>
							</div>
						</VuePerfectScrollbar>
					</div>
				</div>
				<div class="col col-12 col-md-7 mb-3 mb-lg-0">
					<div class="classification-items">
						<VuePerfectScrollbar ref="classItemsScroll" class="custom-scrollbar">
							<div class="list-item" v-for="classification in groups[activeGroupIndex].classes" :key="classification.number">
								<div class="custom-control custom-checkbox">
									<input
										type="checkbox"
										class="custom-control-input"
										:name="`class-${classification.number}`"
										:id="`class-${classification.number}`"
										:checked="selectedClasses.indexOf(classification.number) !== -1"
										@change="() => toggleClass(classification.number)"
									/>
									<label class="custom-control-label" :for="`class-${classification.number}`">
										<span class="badge custom-badge tooltip-badge" v-b-tooltip.hover.left :title="classification.description">
											{{ classification.number }}
										</span>
										{{ classification.subtitle }}
									</label>
								</div>
							</div>
						</VuePerfectScrollbar>
					</div>
				</div>
			</div>

			<div class="d-none d-lg-block" v-if="selectedClasses.length">
				<div class="subtitle mb-2">
					{{ $t('selected-classes') }}
				</div>
				<div class="selected-items">
					<VuePerfectScrollbar ref="selectedItemsScroll" class="custom-scrollbar">
						<div class="selected-item" v-for="classNumber in selectedClasses.slice().sort((a, b) => a - b)" :key="classNumber">
							<span class="badge custom-badge">
								{{ classNumber }}
							</span>
							{{ getClassTitle(classNumber) }}
							<span class="delete" @click="() => toggleClass(classNumber)">&times;</span>
						</div>
					</VuePerfectScrollbar>
				</div>
			</div>
		</div><!--extended-search-->
	</form>
</template>

<script>
	import VuePerfectScrollbar from 'vue-perfect-scrollbar'
	import mktu from '../assets/json/mktu.json'

	export default {
		data () {
			return {
				countries: ['uz', 'kz', 'ru'],
				groups: mktu,
				activeGroupIndex: 0,
				selectedClasses: [],
				isExtendedSearchOpened: false,
				mainForm: {
					isAutoValidate: false,
					inputs: {
						query: '',
						country: ''
					},
					errors: {
						query: false,
						country: false
					}
				}
			}
		},
		watch: {
			isExtendedSearchOpened: function () {
				this.$nextTick(function () {
					this.$refs.classListScroll && this.$refs.classListScroll.update()
					this.$refs.classItemsScroll && this.$refs.classItemsScroll.update()
					this.$refs.selectedItemsScroll && this.$refs.selectedItemsScroll.update()
				})
			},
			activeGroupIndex: function () {
				this.$refs.classItemsScroll.$el.scrollTop = 0
			}
		},
		methods: {
			selectGroup (index) {
				this.activeGroupIndex = index
			},
			toggleClass (number) {
				const index = this.selectedClasses.indexOf(number)

				if (index === -1) {
					this.selectedClasses.push(number)
				} else {
					this.selectedClasses.splice(index, 1)
				}
			},
			getClassTitle (number) {
				const groupItem = this.groups.find(group => group.classes.some(item => item.number === number))
				const classItem = groupItem.classes.find((classification) => classification.number === number)

				return classItem.subtitle
			},
			getSelectedClassesCount (groupIndex) {
				let count = null
				this.groups[groupIndex].classes.forEach(classification => this.selectedClasses.indexOf(classification.number) !== -1 ? count++ : count )
				return count
			},
			validateForm (e) {
				if (e.target.tagName.toLowerCase() === 'button') {
					this.mainForm.isAutoValidate = true
					if (this.isFormValid) {
						this.$emit('searchTrademarks', {
							language: this.$i18n.locale,
							query: this.mainForm.inputs.query,
							country: this.mainForm.inputs.country,
							classes: this.isExtendedSearchOpened ? this.selectedClasses : []
						})
					}
				} else if (!this.mainForm.isAutoValidate) {
					return
				}

				this.mainForm.errors.query = this.mainForm.inputs.query.trim().length < 3
				this.mainForm.errors.country = !this.mainForm.inputs.country
			}
		},
		computed: {
			isFormValid () {
				return this.mainForm.inputs.query.trim().length >= 3 && !!this.mainForm.inputs.country
			}
		},
		components: {
			VuePerfectScrollbar
		}
	}
</script>