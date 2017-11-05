<template>
	<div class="cartControl">
		<div class="cart-decrease" v-show="food.count>0" @click.stop.provent="decreaseCart" transition="move">
			<div class="inner icon-remove_circle_outline"></div>
		</div>
		<div class="cart-count" v-show="food.count>0" transition="show">{{food.count}}</div>
		<div class="cart-add icon-add_circle" @click.stop.provent="addCart"></div>
	</div>
</template>

<script type="text/babel">
	import Vue from 'vue';
	export default {
		props: {
			food: {
				type: Object
			}
		},
		methods: {
			addCart(event) {
				if (!event._constructed) {
					return;
				}
				if (!this.food.count) {
					Vue.set(this.food, 'count', 1);   // 添加没有的属性时，使用 Vue.set，不然DOM监测不到改变
				}	else {
					this.food.count ++;
				}
			},
			decreaseCart(event) {
				if (!event._constructed) {
					return;
				}
				if (this.food.count) {
					this.food.count --;
				}
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.cartControl
		font-size 0
		.cart-decrease
			display inline-block
			padding 6px
			transition all 0.4s linear
			&.move-transition
				opacity 1
				transform translate3d(0, 0, 0)
				.inner
					display inline-block
					line-height 24px
					font-size 24px
					color rgb(0, 160, 220)
					transition all 0.4s linear
					transform rotate(0)
			&.move-enter,&.move-leave
				opacity 0
				transform translate3d(24px, 0, 0)
				.inner
					transform rotate(180deg)
		.cart-count
			display inline-block
			line-height 24px
			text-align center
			vertical-align top
			padding-top 6px
			width 12px
			font-size 10px
			transition all 0.4s linear
			&.show-transition
				opacity 1
			&.show-enter, &.show-leave
				opacity 0
		.cart-add
			display inline-block
			padding 6px
			line-height 24px
			font-size 24px
			color rgb(0, 160, 220)
</style>