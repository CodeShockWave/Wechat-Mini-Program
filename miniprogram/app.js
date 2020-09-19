//app.js
App({
  onLaunch: function () {
    //云开发环境初始化
	//cloudId需在小程序中自行配置云服务
    wx.cloud.init({
      env:"cloudId"
    })
  },
  globalData: {
    userInfo: null,
    
  }
})