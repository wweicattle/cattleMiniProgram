// components/w-good-item/w-good-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Object,
      value: {}
    }
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
    clickTap(){
      let iid=this.data.list.iid||this.data.item_id;
      wx.navigateTo({
        url:`/pages/detail/detail?iid=${iid}`,
      })
    }
  }
})