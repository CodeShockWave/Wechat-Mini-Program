const app = getApp()
Page({

  data: {
    id: '',
    

  },


  onLoad: function (options) {
    var that = this;
    wx.request({

      //服务器路径，此处模糊化处理，具体见附件
      url: 'xxxxxxx/get_score_plan.php',

      //get方法
      method: 'GET',

      //传输的变量
      data: {
        userToserver: app.globalData.id,

      },

      //默认格式
      header: {
        'content-Type': 'application/json'
      },

      //若响应成功，打印一段从服务器传来的字符串
      success(res) {
        console.log(res.data)
		//将结果定义为postList，再在wxml中循环遍历
        that.setData({
          postList: res.data,

        });
      }
    });
  },


})