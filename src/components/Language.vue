<template>
	<div class="language">
		<router-link
			v-for="(locale, index) in $i18n.availableLocales.slice().reverse()"
			:to="`/${locale}`"
			:class="{active: locale === $i18n.locale}"
			:key="index"
		>
			{{ $t(`language-${locale}`) }}
		</router-link>
	</div>
</template>