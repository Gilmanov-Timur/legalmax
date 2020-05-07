<template>
	<b-modal id="modal-help" centered scrollable hide-footer size="lg" :header-close-label="$t('close')" header-close-content="" :title="$t('modal-help-title')">
		<div v-html="$t('modal-help-content')" />
		<div class="text-center">
			<button @click="$bvModal.hide('modal-help')" class="btn btn-lg btn-white">
				{{ $t('understood') }}
			</button>
		</div>
	</b-modal>
</template>