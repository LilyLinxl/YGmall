import {
  request
} from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    tabs: [{
        id: 0,
        value: '综合',
        isActive: true
      },
      {
        id: 1,
        value: '销量',
        isActive: false
      },
      {
        id: 2,
        value: '价格',
        isActive: false
      }
    ],
    goodsList: []
  },
  //接口需要额参数
  QueryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  //总页数
  totalPages: 1,
  onLoad: function (options) {
    this.getGoodList()
  },
  async getGoodList() {
    const res = await request({
      url: '/goods/search'
    ,data: this.QueryParams})
    const total = res.total 
    this.totalPages = Math.ceil(total/ this.QueryParams.pagesize)
    this.setData({
      goodsList: [...this.data.goodsList,...res.goods]
    })
     // 关闭下拉刷新的窗口
    wx.stopPullDownRefresh()
  },
  handleTabsItemChange(e) {
    const {
      index
    } = e.detail
    let {
      tabs
    } = this.data
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs
    })

  },
  //下拉加载，触底函数
  onReachBottom() {
    if(this.totalPages<= this.QueryParams.pagenum){
     wx.showToast({
       title: '没有下一页数据了'
     });
    }else{
      this.QueryParams.pagenum++
      this.getGoodList()
    }
  },
  onPullDownRefresh(){
    this.setData({
      goodsList:[]
    })
    this.QueryParams.pagenum = 1
    this.getGoodList()
  }

})
