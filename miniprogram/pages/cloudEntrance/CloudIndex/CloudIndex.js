const app = getApp()

Page({

  //初始化变量
  data: {
    rank: '',
  },
	//汉语评测入口
  enterChinese: function () {
    wx.navigateTo({
      url: '../ChineseTestCloud/IndexCHNCloud/IndexCHNCloud'
      })

  },

	//英语评测入口
  enterEnglish: function () {
    wx.navigateTo({
      url: '../EnglishTestCloud/IndexEngCloud/IndexEngCloud'
    })

  },

})

