// components/w-tab-control/w-tab-control.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
    },

  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },
  /**
   * 组件的方法列表
   */
  methods: {
    clickTab(res) {
      var index = res.currentTarget.dataset.index;
      this.setData({
        currentIndex: index
      })
      // 发出一个事件，page进行监听
      this.triggerEvent("clickTab",{index})
    }
  }
})