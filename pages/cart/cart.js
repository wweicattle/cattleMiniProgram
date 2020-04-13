// pages/cart/cart.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    iidnum: {},
    clickcolor: false,
    totalPrice: 0,
    clickAll: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 给数据添加一个属性默认为false
    let appVal = app.globalData.cartList;
    appVal.forEach(val => {
      val.select = false;
    })
    // 1.第一次加载数据
    this.setData({
      cartList: app.globalData.cartList
    })

    // 判断选中状态
    this.changeData();

    // 2.设置回调
    app.addCartCallback = () => {
      this.setData({
        cartList: app.globalData.cartList
      })
      this.changeData();
    };

    // 3.设置修改某个商品的回调
    app.changeGoodsState = (index, goods) => {
      // 1.修改某一项的选中状态
      this.setData({
        [`cartList[${index}]`]: goods
      });
      // 判断选中状态
      this.changeData();
    }
  },
  // 判断商品的select是否全部是真
  changeData() {
    var boolean = this.data.cartList.every(val => {
      return val.select == true;
    })
    var arr = [];
    this.data.cartList.forEach((val) => {
      if (val.select) arr.push(val);
    });
    var val = arr.reduce((acc, item, index, arr) => {
      return acc + arr[index].count * arr[index].price
    }, 0);
    if(Number.isInteger(val))val=val+".00"
    this.setData({
      totalPrice: val
    })
    if (boolean) {
      this.setData({
        clickAll: true
      })
    } else {
      this.setData({
        clickAll: false
      })
    }
  },
  // 点击选中按钮
  clickicon(res) {
    // 获取点击的商品iid
    let iid = res.currentTarget.dataset.iid;
    let index = this.data.cartList.findIndex(val => {
      return val.iid === iid;
    })
    var sd = `cartList[${index}].select`;
    this.setData({
      [sd]: !this.data.cartList[index].select
    })

    // 修改完数据之后，需要重新进行this.setData()
    app.changeGoodsState(index, this.data.cartList[index])

  },
  // 判断全选
  clickAll() {
    if (!this.data.clickAll) {
      this.data.cartList.forEach(item => {
        item.select = true
      })
      this.setData({
        cartList: this.data.cartList,
        clickAll: !this.data.clickAll
      })
    } else {
      this.data.cartList.forEach(item => {
        item.select = false
      })
      this.setData({
        cartList: this.data.cartList,
        clickAll: !this.data.clickAll
      })
    }
    // 
    this.changeData();

  }
})