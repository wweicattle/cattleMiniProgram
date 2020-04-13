import {
  getRecommends
} from "./../../servive/recommend.js"
const app = getApp()
import {
  getDetailsData,
  GoodsBaseInfo,
  ShopInfo,
  ParamInfo,
} from "./../../servive/detail.js"
const Top_Distance = 700;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerImag: [],
    baseInfo: {},
    shopInfo: {},
    detailInfo: {},
    paramInfo: {},
    commentInfo: {},
    Recommends: [],
    backTopShow: false,
    showtab: false,
    showtaba: 0,
    iid: ""
  },
  onAddCart() {
    // 1.获取商品对象
    const obj = {}
    obj.iid = this.data.iid;
    obj.imageURL = this.data.bannerImag[0];
    obj.title = this.data.baseInfo.title;
    obj.desc = this.data.baseInfo.desc;
    obj.price = this.data.baseInfo.realPrice;
    // 2.加入到购物车列表
    app.addToCart(obj)
    // 3.加入成功提示
    wx.showToast({
      title: '加入购物车成功',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getDetailsData(options.iid).then(res => {
      const data = res.data.result;
      const iid = options.iid;

      // 2.创建BaseInfo对象
      const baseInfo = new GoodsBaseInfo(data.itemInfo, data.columns, data.shopInfo.services)
      // 3.创建ShopInfo对象
      const shopInfo = new ShopInfo(data.shopInfo);

      // 4.获取detailInfo信息
      const detailInfo = data.detailInfo;

      // 5.创建ParamInfo对象
      const paramInfo = new ParamInfo(data.itemParams.info, data.itemParams.rule)

      // 6.获取评论信息
      let commentInfo = {}
      if (data.rate && data.rate.cRate > 0) {
        commentInfo = data.rate.list[0]
      }
      this.setData({
        bannerImag: res.data.result.itemInfo.topImages,
        baseInfo: baseInfo,
        shopInfo: shopInfo,
        detailInfo: detailInfo,
        paramInfo: paramInfo,
        commentInfo: commentInfo,
        iid
      })
    });
    // 获取推荐的数据
    getRecommends().then(res => {
      var data = res.data.data.list;
      this.setData({
        Recommends: data
      })
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  // 页面滑动
  onPageScroll(res) {
    var flag = res.scrollTop > Top_Distance;
    if (flag != this.data.backTopShow) {
      this.setData({
        backTopShow: flag
      })
    }
    const flag2 = res.scrollTop > this.data.showtaba;
    if (flag2 != this.data.showtab) {
      this.setData({
        showtab: flag2
      })
    }
  },
})