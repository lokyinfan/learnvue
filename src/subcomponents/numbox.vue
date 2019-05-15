<template>
    <div class="mui-numbox" data-numbox-min='1'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" ref="num" @change="countChanged"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
	export default {
		name: "numbox",
		data() {
			return {}
		}
		,
		created() {

		}
		,
		methods: {
			//上面的@change就是原生js的onchange事件,

			countChanged() {
				this.$emit('getCount', parseInt(this.$refs.num.value))//第二个参数其实就是子组件的数据,传到父组件对应的方法里做形参
			}
		},
		props: ['max'],
		watch: {
			max: function (newVal, oldVal) {
				mui(mui-numbox).numbox().setOption('max', newVal)
			}
		}
	}
</script>

<style scoped>

</style>