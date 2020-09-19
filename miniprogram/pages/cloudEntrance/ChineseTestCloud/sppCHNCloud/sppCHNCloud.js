const app = getApp()
Page({

  data: {
    id: '',
    

  },


  onLoad: function (options) {
    var that = this;
    that.getServerPlan(app.globalData.id)
    
  },

  //向小程序云发送字段，返回content
  getServerPlan: function (e) {
    var that = this;
    wx.cloud.callFunction({
      //调用云函数名
      name: 'getContent',
      // 传给云函数的参数
      data: {
        id: app.globalData.id,
      },
      success: function(res) {
        console.log(res.result.data.list)
        //将结果定义为postList，再在wxml中循环遍历
        that.setData({
          postList: res.result.data.list,

        });       

      },
      fail: console.error
    })
  },




})