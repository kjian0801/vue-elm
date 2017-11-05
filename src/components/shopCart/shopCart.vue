<template>
	<div class="shopCart">
		<div class="content">
			<div class="content-left" @click="toggleShowList">
				<div class="logo-wrapper" :class="{'highlight': totalCount>0}">
					<div class="logo">
						<i class="icon-shopping_cart"></i>
					</div>
					<div class="count" v-show="totalCount>0">{{totalCount}}</div>
				</div>
				<div class="price" :class="{'highlight': totalPrice>0}">¥{{totalPrice}}</div>
				<div class="line"></div>
				<div class="desc">另需配送费¥{{deliveryPrice}}元</div>
			</div>
			<div class="content-right" :class="payClass">
				{{payDesc}}
			</div>
			<div class="selectList" v-show="listShow" transition="fold">
				<div class="header">
					<h1 class="title">购物车</h1>
					<span class="empty" @click="empty">清空</span>
				</div>
				<div class="list-content" v-el:list-content>
					<ul>
						<li class="food border-1px" v-for="food in selectFoods">
							<div class="name">{{food.name}}</div>
							<div class="cartcontrol-wrapper">
								<cart-control :food="food"></cart-control>
							</div>
							<div class="price">¥{{food.price*food.count}}</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<div class="list-mask" v-show="listShow" transition="showMask" >
		
	</div>
</template>

<script type="text/babel">
	import BScroll from 'better-scroll';
	import cartControl from 'components/cartControl/cartControl';
	export default {
		data() {
			return {
				fold: true // 列表是否折叠
			};
		},
		props: {
			selectFoods: {
				type: Array,
				default() {
					return [
						{
							price: 10,
							count: 2
						}
					];
				}
			},
			deliveryPrice: {
				type: Number,
				default: 0
			},
			minPrice: {
				type: Number,
				default: 0
			},
			payClass: {
				type: String,
				default: ''
			}
		},
		computed: {
			totalCount() {
				let count = 0;
				this.selectFoods.forEach((item) => {
					count += item.count;
				});
				return count;
			},
			totalPrice() {
				let price = 0;
				this.selectFoods.forEach((item) => {
					price += item.price * item.count;
				});
				return price;
			},
			payDesc() {
				if (this.totalPrice === 0) {
					this.payClass = 'not-enough';
					return `¥${this.minPrice}起送`;
				} else if (this.totalPrice < this.minPrice) {
					this.payClass = 'not-enough';
					return `还差¥${this.minPrice - this.totalPrice}起送`;
				} else {
					this.payClass = 'enough';
					return '去结算';
				}
			},
			listShow() {
				if (!this.totalCount > 0) {
					this.fold = true;
					return false;
				}
				let show = !this.fold;
				if (show) {
					this.$nextTick(() => {
						if (!this.scroll) {
							this.scroll = new BScroll(this.$els.listContent, {
								click: true
							});
						} else {
							this.scroll.refresh();
						}
					});
				}
				return show;
			}
		},
		methods: {
			toggleShowList() {
				console.log('click');
				if (!this.totalCount) {
					return;
				}
				this.fold = !this.fold;
			},
			empty() {
				this.selectFoods.forEach((food) => {
					food.count = 0;
				});
			}
		},
		components: {
			'cart-control': cartControl
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl'
	.shopCart
		position fixed
		left 0
		bottom 0
		width 100%
		height 54px
		z-index 100
		.content
			display flex
			height 100%
			background-color #141d27
			.content-left
				flex 1
				position relative
				font-size 0
				.logo-wrapper
					position absolute
					top -10px
					width 44px
					height 44px
					display inline-block
					padding 6px
					margin 0 12px
					border-radius 50%
					background-color #141d27
					.logo
						width 100%
						height 100%
						border-radius 50%
						font-size 24px
						line-height 24px
						text-align center
						color rgba(255, 255, 255, 0.4)
						background-color rgba(255, 255, 255, 0.1)
						.icon-shopping_cart
							line-height 44px
					.count
						position absolute
						top 0
						right 0
						width 24px
						height 16px
						border-radius 16px
						line-height 16px
						text-align center
						font-size 9px
						font-weight 700
						background-color rgb(240, 20, 20)
						color #fff
					&.highlight
						.logo
							background-color rgb(0, 160, 220)
							.icon-shopping_cart
								color #fff
				.price
					display inline-block
					line-height 54px
					margin-left 80px
					padding-right 12px
					font-size 16px
					font-weight 700
					color rgba(255, 255, 255, 0.4)
					&.highlight
						color #fff
				.desc
					display inline-block
					line-height 54px
					padding-left 12px
					font-size 14px
					color rgba(255, 255, 255, 0.4)
				.line
					display inline-block
					height 24px
					position relative
					top 5px
					border-left 1px solid rgba(255, 255, 255, 0.4)
			.content-right
				flex 0 0 105px
				width 105px
				background-color rgba(255, 255, 255, 0.1)
				text-align center
				line-height 54px
				color rgba(255, 255, 255, 0.4)
				&.enough
					background-color #00b43c
					color #fff
				&.not-enough
					background-color rgba(255, 255, 255, 0.1)
					color rgba(255, 255, 255, 0.4)
			.selectList
				position absolute
				left 0
				top 0
				width 100%
				z-index -1
				&.fold-transition
					transition all 0.5s
					transform translate3d(0, -100%, 0)
				&.fold-enter, &.fold-leave
					transform translate3d(0, 0, 0)
				.header
					height 40px
					line-height 40px
					padding 0 18px
					font-size 14px
					background-color #f3f5f7
					border-bottom 1px solid rgba(7, 17, 27, 0.1)
					.title
						float left
						color rgb(7, 17, 27)
					.empty
						float right
						font-size 12px
						color rgb(0, 160, 220)
				.list-content
					padding 0 18px
					max-height 217px
					overflow hidden
					background-color #fff
					.food
						padding 12px 0
						height 24px
						line-height 24px
						border-1px(rgba(7, 17, 27, 0.1))
						.name
							float left
							font-size 14px
							color rgb(7, 17, 27)
						.price
							float right
							padding 0 12px 0 18px
						.cartcontrol-wrapper
							float right
							position relative
							top -5px
	.list-mask
		position fixed
		top 0
		left 0
		width 100%
		height 100%
		z-index 40
		background-color rgba(7, 17, 27, 0.6)
		&.showMask-transition
			transition all 0.5s
			opacity 1
			backdrop-filter: blur(10px)
		&.showMask-enter, &.showMask-leave
			opacity 0		
</style>