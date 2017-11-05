<template>
	<div class="food" v-show="showFlag" transition="move" v-el:food>
		<div class="food-content">
			<div class="image-header">
				<img :src="food.image">
				<div class="back">
					<i class="icon-arrow_lift" @click="hide"></i>
				</div>
			</div>
			<div class="content">
				<h1 class="title">{{food.name}}</h1>
				<div class="detail">
					<span class="count">月售{{food.sellCount}}</span><span class="rating">好评率{{food.rating}}%</span>
				</div>
				<div class="price">
					<span class="now">¥{{food.price}}</span><span class="old" v-if="food.oldPrice">¥{{food.oldPrice}}</span>
				</div>
				<div class="cartcontrol-wrapper">
					<cart-control :food="food"></cart-control>
				</div>
				<div class="buy" @click="addFirst" v-show="!food.count || food.count === 0" transition="fade">加入购物车</div>
			</div>
			<split v-show="food.info"></split>
			<div class="info" v-show="food.info">
				<h1 class="title">商品信息</h1>
				<p class="text">{{food.info}}</p>
			</div>
			<split></split>
			<div class="ratings">
				<h1 class="title">商品评价</h1>
				<rating-select :ratings="food.ratings" :selct-type="selectType" :only-content="onlyContent" :desc="desc"></rating-select>
			</div>
			<div class="ratings-wrapper">
				<ul v-show="food.ratings && food.ratings.length">
					<li v-show="needShow(rating.rateType, rating.text)" v-for="rating in food.ratings" class="ratings-item border-1px">
						<div class="rating-desc">
							<div class="time">{{rating.rateTime | formatDate}}</div>
							<div class="user">
								<span>{{rating.username}}</span>
								<img :src="rating.avatar" class="avatar">
							</div>
						</div>
						<div class="rating-content">
							<i class="icon" :class="{'icon-thumb_up':rating.rateType === 0, 'icon-thumb_down':rating.rateType === 1}"></i>
							<span class="text">{{rating.text}}</span>
						</div>
					</li>
				</ul>
				<div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评论</div>
			</div>
		</div>
	</div>
</template>

<script type="text/babel">
	import Vue from 'vue';
	import BScroll from 'better-scroll';
	import cartcontrol from 'components/cartControl/cartControl';
	import split from 'components/split/split';
	import ratingselect from 'components/ratingselect/ratingselect';

	import {formatDate} from 'common/js/date';

	// const NEGATIVE = 1;
	// const POSITIVE = 0;
	const ALL = 2;

	export default {
		props: {
			food: {
				type: Object
			}
		},
		data() {
			return {
				showFlag: false,
				selectType: ALL,
				onlyContent: true,
				desc: {
					all: '全部',
					positive: '满意',
					negative: '吐槽'
				}
			};
		},
		methods: {
			// 添加第一个商品
			addFirst(event) {
				if (!event._constructed) {
					return;
				}
				Vue.set(this.food, 'count', 1);
			},
			// 显示点击商品详情
			show() {
				this.showFlag = true;
				this.selectType = ALL;  // 保持初始化
				this.onlyContent = true;  // 保持初始化
				this.$nextTick(() => {
					if (!this.scroll) {
						this.scroll = new BScroll(this.$els.food, {
							click: true
						});
					} else {
						this.scroll.refresh();
					}
				});
			},
			hide() {
				this.showFlag = false;
			},
			needShow(type, text) {
				if (this.onlyContent && !text) {
					return false;
				}
				if (this.selectType === 2) {
					return true;
				} else {
					return type === this.selectType;
				}
			}
		},
		filters: {
			formatDate(time) {
				return formatDate(time, 'yyyy-MM-dd hh:mm');
			}
		},
		// 监听子组件传给父组件事件
		events: {
			'ratingtype.select'(type) {
				this.selectType = type;
				this.$nextTick(() => {
					this.scroll.refresh();
				});
			},
			'toggle.content'(onlyContent) {
				this.onlyContent = onlyContent;
				this.$nextTick(() => {
					this.scroll.refresh();
				});
			}
		},
		created() {
			console.log(this.food);
		},
		components: {
			'cart-control': cartcontrol,
			'split': split,
			'rating-select': ratingselect
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"
	.food
		position fixed
		top 0
		left 0
		bottom 48px
		width 100%
		z-index 30
		background-color #fff
		&.move-transition
			transition all 0.2s linear
			transform translate3d(0, 0, 0)
			opacity 1
		&.move-enter, &.move-leave
			transform translate3d(100%, 0, 0)
			opacity 0
		.image-header
			position relative
			width 100%
			height 0
			padding-top 100%
			img
				position absolute
				top 0
				left 0
				width 100%
				height 100%
			.back
				position absolute
				top 10px
				left 0
				.icon-arrow_lift
					display block
					padding 10px
					font-size 20px
					color #fff
		.content
			position relative
			padding 18px
			.title
				line-height 14px
				margin-bottom 8px
				font-size 14px
				font-weight 700
				color rgb(7, 17, 27)
			.detail
				line-height 10px
				margin-bottom 18px
				font-size 10px
				color rgb(147, 153, 159)
				.count
					margin-right 12px
			.price
				line-height 24px
				font-weight 700
				font-size 10px
				color rgb(147, 153, 159)
				.now
					color red
					font-size 14px
					margin-right 8px
				.old
					text-decoration line-through
		.cartcontrol-wrapper
			position absolute
			right 12px
			bottom 12px
		.buy
			position absolute
			right 18px
			bottom 18px
			z-index 10
			height 24px
			line-height 24px
			padding 0 12px
			box-sizing border-box
			border-radius 12px
			font-size 10px
			color #fff
			background-color rgb(0, 160, 220)
			&.fade-transition
				transition all 0.2s
				opacity 1
			&.fade-enter, &.fade-leave
				opacity 0
		.info
			padding 18px
			.title
				line-height 14px
				margin-bottom 6px
				font-size 14px
				color rgb(7, 17, 27)
			.text
				line-height 24px
				padding 0 8px
				font-size 12px
				color rgb(77, 85, 93)
		.ratings
			padding-top 18px
			.title
				line-height 14px
				margin-left 18px
				font-size 14px
				color rgb(7, 17, 27)
		.ratings-wrapper
			padding 0 18px
			.ratings-item
				padding 16px 0
				border-1px(rgba(7, 17, 27, 0.1))
				.rating-desc
					display flex
					justify-content space-between
					height 12px
					line-height 12px
					font-size 10px
					color rgb(147, 153, 159)
					.avatar
						width 12px
						height 12px
						margin-left 6px
						border-radius 50%
						vertical-align top
				.rating-content
					font-size 0
					.icon
						line-height 24px
						font-size 12px
						margin-right 4px
						vertical-align top
					.icon-thumb_up
						color rgb(0, 160, 220)
					.icon-thumb_down
						color rgb(147, 153, 159)
					.text
						line-height 16px
						font-size 12px
						color rgb(7, 17, 27)
			.no-rating
				padding 16px 0
</style>