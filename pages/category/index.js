// pages/category/index.js
import {
  request
} from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
  data: {
    leftMenuList: [],
    rightContent: [],
    currentIndex: 0,
    scrollTop: 0
  },
  // 接口的返回数据
  Cates: [],
  onLoad: function (options) {
    // 获取本地存储中的数据 
    const Cates = wx.getStorageSync("cates");
    if (!Cates) {
      this.getCates()
    } else {
      // 有旧的数据 定义过期时间 5分钟
      if (Date.now() - Cates.time > 1000 * 60 * 5) {
        // 重新发送请求
        this.getCates();
      } else {
        // 可以使用旧的数据
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v => v.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },
  async getCates() {
    // request({
    //   url: "/categories"
    // }).then(res => {
    //   this.Cates = res.data.message
    //   wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });
    //   this.setData({
    //     leftMenuList: this.Cates.map(v => v.cat_name),
    //     rightContent: this.Cates[0].children,
    //   })
    // })
    const res = await request({
      url: "/categories"
    })
    this.Cates = res
    wx.setStorageSync("cates", {
      time: Date.now(),
      data: this.Cates
    })
    this.setData({
      leftMenuList: this.Cates.map(v => v.cat_name),
      rightContent: this.Cates[0].children,
    })

  },
  handleItemTap(e) {
    const {
      index
    } = e.currentTarget.dataset;
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0
    })
  }
})