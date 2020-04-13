// pages/category/category.js
import {
  getCategory,
  getSubcategory
} from "./../../servive/category.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateList: [],
    mailkey: 3627,
    Subcategorys:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 请求目录数据
    this.categories();
    console.log(this.data.mailkey);
    // 请求目录中的详细数据
    this.Subcategory();
  },
  // 
  categories() {
    getCategory().then(res => {
      console.log(res);
      this.setData({
        cateList: res.data.data.category.list
      })
    });
  },
  // 
  Subcategory() {
    getSubcategory(this.data.mailkey).then(res => {
      let data=res.data.data.list;
      console.log(data);
      this.setData({
        Subcategorys:data
      })
    })
  },
  clickCate(options) {
    this.setData({
      mailkey: options.currentTarget.dataset.maitkey
    })
    this.Subcategory();
  },
  clickDetatil(){
    console.log(444);
    
  }
})