import {
  achilveHomeData,
  getGoodsList
} from "./../../servive/home.js";
const Top_Distance = 700;
Page({
  data: {
    banner: [],
    recommends: [],
    tabControl: ["流行", "新款", "精选"],
    currentindex: 0,
    arr: ["pop", "new", "sell"],
    backTopShow: false,
    showtab: false,
    showtaba: 0,
    goods: {
      "pop": {
        page: 0,
        list: []
      },
      "new": {
        page: 0,
        list: []
      },
      "sell": {
        page: 0,
        list: []
      }
    }
  },
  onLoad() {
    // 进行获取轮播图，推荐列表数据
    this.gethomeMultidata();

    // 获取商品数据
    this.getGoodList({
      type: "pop"
    });
    this.getGoodList({
      type: "new"
    });
    this.getGoodList({
      type: "sell"
    });

  },
  // 获取轮播等数据
  gethomeMultidata() {
    achilveHomeData().then(res => {
      //对数据进行处理后
      var bannerArr=res.data.data.banner.list;
       bannerArr=bannerArr.map((val)=>{
        return val.image;
      })
      this.setData({
        banner: bannerArr,
        recommends: res.data.data.recommend
      })
    })
  },
  // 获取商品数据
  getGoodList(obj) {
    var {
      type
    } = obj;
    obj.page = this.data.goods[type].page + 1;
    var page = obj.page;
    return getGoodsList(obj).then(res => {
      // 请求新的一页
      // 进行保存页码
      const pagea = `goods.${type}.page`;
      const lista = `goods.${type}.list`;
      var listb = this.data.goods[type].list;
      listb.push(...res.data.data.list);
      // var list = res.data.data.list;
      // 保存数据与页码
      this.setData({
        [pagea]: page,
        [lista]: listb
      })
    })
  },

  // 监听点击分类
  clickTab(res) {
    this.setData({
      currentindex: res.detail.index
    })
  },
  // 下拉重新刷新获取数据
  onReachBottom() {
    this.getGoodList({
      type: this.data.arr[this.data.currentindex]
    });
  },
  // 页面滑动
  onPageScroll(res) {
    var flag = res.scrollTop > Top_Distance;
    if (flag != this.data.backTopShow) {
      this.setData({
        backTopShow: flag
      })
    }
    const flag2=res.scrollTop > this.data.showtaba;
    if (flag2!=this.data.showtab) {
      this.setData({
        showtab: flag2
      })
    }
  },
  // 图片加载完
  imgLoad() {
    var that = this;
    const query = wx.createSelectorQuery();
    query.select('#w-tab-control').boundingClientRect(
      function (res) {
        that.data.showtaba = res.top;
      }).exec()
  }




})