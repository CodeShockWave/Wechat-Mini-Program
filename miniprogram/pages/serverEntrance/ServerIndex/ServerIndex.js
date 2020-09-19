const app = getApp()

Page({

  //初始化变量
  data: {
    rank: '',
  },
	
	//跳转至汉语评测界面
  enterChinese: function () {
    wx.navigateTo({
      url: '../ChineseTestServer/IndexCHNServer/IndexCHNServer'
      })

  },

	//跳转至英语评测界面
  enterEnglish: function () {
    wx.navigateTo({
      url: '../EnglishTestServer/IndexEngServer/IndexEngServer'
    })

  },

})

