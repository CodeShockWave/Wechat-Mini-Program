const app = getApp()

Page({

  //初始化变量
  data: {
    rank: '',
    visitorContent:'',
  },

  inputA: function () {   
    
    app.globalData.vid = "user1",
    wx.navigateTo({
      url: '../vmpCHNCloud/vmpCHNCloud'
    })

    
  },




  inputB: function () {
    app.globalData.vid = "user2",
    wx.navigateTo({
      url: '../vmpCHNCloud/vmpCHNCloud'
    })

  },





  inputC: function () {
    app.globalData.vid = "user3",
    wx.navigateTo({
      url: '../vmpCHNCloud/vmpCHNCloud'
    })
    

  },

  
})

