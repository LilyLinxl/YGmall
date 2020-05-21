import { request } from '../../request/index.js'
Page({
  data: {
    swiperList: [],
    catesList: [],
    floorList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperList()
    this.getCateList()
    this.getFloorList()
  },
  //获取轮播图数据
  getSwiperList(){
    request({
      url: "/home/swiperdata"
    }).then(res => {
      this.setData({
        swiperList: res
      })
    })
  },
  //获取导航数据
  getCateList(){
    request({
      url: "/home/catitems"
    }).then(res => {
      this.setData({
        catesList: res
      })
    })
  },
  //获取楼层数据
  getFloorList(){
    request({
      url: "/home/floordata"
    }).then(res => {
      this.setData({
        floorList: res
      })
    })
  }
})
