const app = getApp()

Page({

  //初始化变量
  data: {
    rank: '',
    visitorContent:'',
  },

  inputA: function () {   
    
    app.globalData.vid = "admin1",
    wx.navigateTo({
      url: '../vmpEngCloud/vmpEngCloud'
    })

    
  },




  inputB: function () {
    app.globalData.vid = "admin2",
    wx.navigateTo({
      url: '../vmpEngCloud/vmpEngCloud'
    })

  },





  inputC: function () {
    app.globalData.vid = "admin3",
    wx.navigateTo({
      url: '../vmpEngCloud/vmpEngCloud'
    })
    

  },

  
})

