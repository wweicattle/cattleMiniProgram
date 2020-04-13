// pages/index/indexCon/recommends.js
Component({
  /**
   * 组件的属性列表
   */
  // 从页面传递数据
  properties: {
    list: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showimg: false

  },

  /**
   * 组件的方法列表
   */
  methods: {
    imagLoad() {
      if (!this.data.showimg) {  
         this.data.showimg = true;
        this.triggerEvent("imgLoad");
      }
    }
  }
})