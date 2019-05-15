<template>
    <div>
        <cmts :id="id"></cmts>
    </div>
</template>

<script>
	import cmts from '../../subcomponents/comments.vue'

	export default {
		name: "productComment",
		components: {
			cmts
		},
		data() {
			return {
				id: this.$route.params.id
			}
		}
	}
</script>

<style scoped>

</style>