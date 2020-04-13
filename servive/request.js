import {
  baseUrl
} from "./const.js";
export default function (options) {
  return new Promise((res, rej) => {
    wx.request({
      url: baseUrl+options.url || {},
      data: options.data || {},
      success: res,
      fail: rej
    })
  })
}