import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    pics:[]
  },

  onLoad: function (options) {
   const {goods_id} = options
   this.getGoodDetail(goods_id)
  },
  async getGoodDetail(goods_id){
    const res = await request({url:'/goods/detail',data:{goods_id}})
    this.setData({
      pics:res.pics
    })
  }
})