<template>
	<div class="rating-ratings" v-el:ratings>
		<div class="ratings-content">
			<div class="overview">
				<div class="overview-left">
					<div class="score">{{seller.score}}</div>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{seller.rankRate}}%</div>
				</div>
				<div class="overview-right">
					<div class="serviceScore item">
						<span class="title">服务态度</span>
						<div class="star-wrapper">
							<star :size="36" :score="seller.serviceScore"></star>
						</div>
						<span  class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="foodScore item">
						<span class="title">商品评分</span>
						<div class="star-wrapper">
							<star :size="36" :score="seller.foodScore"></star>
						</div>
						<span class="score">{{seller.foodScore}}</span>
					</div>
					<div class="deliveryTime item">
						<span class="title">送达时间</span> 
						<span class="time">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<split></split>
			<ratingselect :ratings="ratings" :selct-type="selectType" :only-content="onlyContent" :desc="desc"></ratingselect>
			<div class="rating-wrapper">
				<ul>
					<li v-for="rating in ratings" v-show="needShow(rating.rateType, rating.text)" class="rating-item border-1px">
						<div class="avatar">
							<img width="28" height="28" :src="rating.avatar">
						</div>
						<div class="content">
							<h1 class="name">{{rating.username}}</h1>
							<div class="star-wrapper">
								<star :size="24" :score="rating.score"></star>
								<span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
							</div>
							<p class="text">{{rating.text}}</p>
							<div class="recommend" v-show="rating.recommend && rating.recommend.length">
								<span class="icon-thumb_up"></span>
								<span class="item" v-for="item in rating.recommend">{{item}}</span>
							</div>
							<div class="time">
								{{rating.rateTime | formatDate}}
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script type="text/babel">
	import BScroll from 'better-scroll';
	import star from 'components/star/star';
	import split from 'components/split/split';
	import ratingselect from 'components/ratingselect/ratingselect';

	import {formatDate} from 'common/js/date';
	
	const ALL = 2;
	const ERR_OK = 0;

	export default {
		data() {
			return {
				ratings: [],
				selectType: ALL,
				onlyContent: true
			};
		},
		props: {
			seller: {
				type: Object
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
		methods: {
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
		created() {
			// this.$http.get('/api/ratings').then((resp) => {
   //      resp = resp.body;
   //      if (resp.errno === ERR_OK) {
   //        this.ratings = resp.data;
   //        this.$nextTick(() => {
			// 			this.scroll = new BScroll(this.$els.ratings, {
			// 				click: true
			// 			});
   //        });
   //      }
   //    });
   		this.ratings = [
		    {
		      "username": "3******c",
		      "rateTime": 1469281964000,
		      "deliveryTime": 30,
		      "score": 5,
		      "rateType": 0,
		      "text": "不错,粥很好喝,我经常吃这一家,非常赞,以后也会常来吃,强烈推荐.",
		      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
		      "recommend": [
		        "南瓜粥",
		        "皮蛋瘦肉粥",
		        "扁豆焖面",
		        "娃娃菜炖豆腐",
		        "牛肉馅饼"
		      ]
		    },
		    {
		      "username": "2******3",
		      "rateTime": 1469271264000,
		      "deliveryTime": "",
		      "score": 4,
		      "rateType": 0,
		      "deliveryTime": "",
		      "text": "服务态度不错",
		      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
		      "recommend": [
		        "扁豆焖面"
		      ]
		    },
		    {
		      "username": "3******b",
		      "rateTime": 1469261964000,
		      "score": 3,
		      "rateType": 1,
		      "text": "",
		      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
		      "recommend": []
		    },
		    {
		      "username": "1******c",
		      "rateTime": 1469261864000,
		      "deliveryTime": 20,
		      "score": 5,
		      "rateType": 0,
		      "text": "良心店铺",
		      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
		      "recommend": []
		    },
		    {
		      "username": "2******d",
		      "rateTime": 1469251264000,
		      "deliveryTime": 10,
		      "score": 4,
		      "rateType": 0,
		      "text": "",
		      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
		      "recommend": []
		    },
		    {
		      "username": "9******0",
		      "rateTime": 1469241964000,
		      "deliveryTime": 70,
		      "score": 1,
		      "rateType": 1,
		      "text": "送货速度蜗牛一样",
		      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
		      "recommend": []
		    },
		    {
		      "username": "d******c",
		      "rateTime": 1469231964000,
		      "deliveryTime": 30,
		      "score": 5,
		      "rateType": 0,
		      "text": "很喜欢的粥店",
		      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
		      "recommend": []
		    },
		    {
		      "username": "2******3",
		      "rateTime": 1469221264000,
		      "deliveryTime": "",
		      "score": 4,
		      "rateType": 0,
		      "text": "量给的还可以",
		      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
		      "recommend": []
		    },
		    {
		      "username": "3******8",
		      "rateTime": 1469211964000,
		      "deliveryTime": "",
		      "score": 3,
		      "rateType": 1,
		      "text": "",
		      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
		      "recommend": []
		    },
		    {
		      "username": "a******a",
		      "rateTime": 1469201964000,
		      "deliveryTime": "",
		      "score": 4,
		      "rateType": 0,
		      "text": "孩子喜欢吃这家",
		      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
		      "recommend": [
		        "南瓜粥"
		      ]
		    },
		    {
		      "username": "3******3",
		      "rateTime": 1469191264000,
		      "deliveryTime": "",
		      "score": 4,
		      "rateType": 0,
		      "text": "粥挺好吃的",
		      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
		      "recommend": []
		    },
		    {
		      "username": "t******b",
		      "rateTime": 1469181964000,
		      "deliveryTime": "",
		      "score": 3,
		      "rateType": 1,
		      "text": "",
		      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
		      "recommend": []
		    },
		    {
		      "username": "f******c",
		      "rateTime": 1469171964000,
		      "deliveryTime": 15,
		      "score": 5,
		      "rateType": 0,
		      "text": "送货速度很快",
		      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
		      "recommend": []
		    },
		    {
		      "username": "k******3",
		      "rateTime": 1469161264000,
		      "deliveryTime": "",
		      "score": 4,
		      "rateType": 0,
		      "text": "",
		      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
		      "recommend": []
		    },
		    {
		      "username": "u******b",
		      "rateTime": 1469151964000,
		      "deliveryTime": "",
		      "score": 4,
		      "rateType": 0,
		      "text": "下雨天给快递小哥点个赞",
		      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
		      "recommend": []
		    },
		    {
		      "username": "s******c",
		      "rateTime": 1469141964000,
		      "deliveryTime": "",
		      "score": 4,
		      "rateType": 0,
		      "text": "好",
		      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
		      "recommend": []
		    },
		    {
		      "username": "z******3",
		      "rateTime": 1469131264000,
		      "deliveryTime": "",
		      "score": 5,
		      "rateType": 0,
		      "text": "吃了还想再吃",
		      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
		      "recommend": []
		    },
		    {
		      "username": "n******b",
		      "rateTime": 1469121964000,
		      "deliveryTime": "",
		      "score": 3,
		      "rateType": 1,
		      "text": "发票开的不对",
		      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
		      "recommend": []
		    },
		    {
		      "username": "m******c",
		      "rateTime": 1469111964000,
		      "deliveryTime": 30,
		      "score": 5,
		      "rateType": 0,
		      "text": "好吃",
		      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
		      "recommend": []
		    },
		    {
		      "username": "l******3",
		      "rateTime": 1469101264000,
		      "deliveryTime": 40,
		      "score": 5,
		      "rateType": 0,
		      "text": "还不错吧",
		      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
		      "recommend": []
		    },
		    {
		      "username": "3******o",
		      "rateTime": 1469091964000,
		      "deliveryTime": "",
		      "score": 2,
		      "rateType": 1,
		      "text": "",
		      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
		      "recommend": []
		    },
		    {
		      "username": "3******p",
		      "rateTime": 1469081964000,
		      "deliveryTime": "",
		      "score": 4,
		      "rateType": 0,
		      "text": "很喜欢的粥",
		      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
		      "recommend": []
		    },
		    {
		      "username": "o******k",
		      "rateTime": 1469071264000,
		      "deliveryTime": "",
		      "score": 5,
		      "rateType": 0,
		      "text": "",
		      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
		      "recommend": []
		    },
		    {
		      "username": "k******b",
		      "rateTime": 1469061964000,
		      "deliveryTime": "",
		      "score": 4,
		      "rateType": 0,
		      "text": "",
		      "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
		      "recommend": []
		    }
		  ];
  // setTimeout(() => {
  //   this.scroll = new BScroll(this.$els.ratings, {
		// 	click: true
		// });
  // }, 1000);
			this.$nextTick(() => {
				this.scroll = new BScroll(this.$els.ratings, {
					click: true
				})
			});
		},
		components: {
			star, split, ratingselect
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.rating-ratings
	position absolute
	top 174px
	bottom 0
	left 0
	width 100%
	overflow hidden
	.ratings-content
		.overview
			padding 18px 0
			display flex
			align-items center
			justify-content space-around
			font-size 12px
			color rgb(7, 17, 27)
			.overview-left
				text-align center
				width 38%
				border-right 1px solid rgba(7, 17, 27, 0.2)
				.score
					line-height 26px
					font-size 24px
					color rgb(255, 153, 0)
				.title
					line-height 12px
					padding 6px 0 8px 0
				.rank
					font-size 10px
					color rgb(147, 153, 159)
			.overview-right
				width 60%
				margin-left 20px
				.item
					height 18px
					line-height 18px
					margin-bottom 8px
					.title
						margin-right 6px
					.score
						color rgb(255, 153, 0)
					.star-wrapper
						display inline-block
						vertical-align top
						margin-right 6px
					.time
						color rgb(147, 153, 159)
				&.last-child
					margin-bottom 0
	.rating-wrapper
		padding 0 18px
		.rating-item
			display flex
			padding 18px 0
			border-1px(rgba(7, 17, 27, 0.1))
			.avatar
				flex 0 0 28px
				width 28px
				margin-right 12px
				img
					border-radius 50%
			.content
				position relative
				flex 1
				.name
					margin-bottom 4px
					line-height 12px
					font-size 10px
					color rgb(7, 17, 27)
				.star-wrapper
					margin-bottom 6px
					font-size 0
					.star
						display inline-block
						margin-right 6px
						vertical-align top
					.delivery
						display inline-block
						vertical-align top
						line-height 12px
						font-size 10px
						color rgb(147, 153, 159)
				.text
					margin-bottom 8px
					line-height 18px
					color rgb(7, 17, 27)
					font-size 12px
				.recommend
					line-height 16px
					font-size 0
					.icon-thumb_up, .item
						display inline-block
						margin 0 8px 4px 0
						font-size 9px
					.icon-thumb_up
						color rgb(0, 160, 220)
					.item
						padding 0 6px
						border 1px solid rgba(7, 17, 27, 0.1)
						border-radius 1px
						color rgb(147, 153, 159)
				.time
					position absolute
					top 0
					right 0
					line-height 12px
					font-size 10px
					color rgb(147, 153, 159)
						
</style>