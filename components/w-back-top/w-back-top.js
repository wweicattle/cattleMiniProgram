// components/w-back-top/w-back-top.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击图标滚动到目标位置
    clickTabBack() {
      wx.pageScrollTo({
       scrollTop:0,
       duration:300
      })
    }
  }
})