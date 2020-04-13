//app.js
App({
  onLaunch: function (res) {
    console.log(res);
    
  },
  addToCart(obj) {
    // 1.判断是否已经添加进来
    const oldInfo = this.globalData.cartList.find((item) => item.iid === obj.iid)
    if (oldInfo) {
      oldInfo.count += 1
    } else {
      obj.count = 1
      obj.checked = true
      this.globalData.cartList.push(obj)
    }

    // 2.购物车回调
    if (this.addCartCallback) {
      console.log(this);
      this.addCartCallback()
    }
  },
  globalData: {
    cartList: []
  }
})