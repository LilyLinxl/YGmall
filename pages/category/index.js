// pages/category/index.js
import { request } from '../../request/index.js'

Page({
  data: {
    cateList: []
  },
  onLoad: function (options) {
    this.getCateList()
  },
  getCateList(){
    request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/categories"
    }).then(res => {
      this.setData({
        cateList: res.data.message
      })
    })
  }
})
