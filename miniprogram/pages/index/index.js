const app = getApp()

Page({

  //初始化变量
  data: {
    rank: '',
  },
	//腾讯云服务器入口
  enterServer: function () {
    wx.navigateTo({
      url: '../serverEntrance/ServerIndex/ServerIndex'
      })

  },

	//云开发入口
  enterCloud: function () {
    wx.navigateTo({
      url: '../cloudEntrance/CloudIndex/CloudIndex'
    })

  },

})

