const app = getApp()

Page({

  //初始化变量
  data: {
    rank: '',
  },

  inputA: function () {
    
    this.setData({
      rank: 'A'
    })
    app.globalData.rank = 'A';
    console.log('等级为', this.data.rank);

    var that = this;
    wx.request({

      //服务器路径，此处模糊化处理，具体见附件
      url: 'xxxxxxx/get_rank.php',

      
      method: 'GET',

      
      data: {
        rankToserver: this.data.rank,

      },

      
      header: {
        'content-Type': 'application/json'
      },

      //若响应成功，打印一段从服务器传来的字符串
      success(res) {
        console.log(res.data);
        app.globalData.visitorContent = res.data['0']['content'];
        app.globalData.visitorVoiceId = res.data['0']['voiceId'];
        
        console.log(app.globalData.visitorContent);
        console.log(app.globalData.visitorVoiceId);
        wx.navigateTo({
          url: '../vmpEngServer/vmpEngServer'
        })


      }
    });


    
  },




  inputB: function () {
    this.setData({
      rank: 'B'
    })
    app.globalData.rank = 'B';
    console.log('等级为', this.data.rank);
    var that = this;
    wx.request({

		//服务器路径，此处模糊化处理，具体见附件
      url: 'xxxxxxx/get_rank.php',


      method: 'GET',


      data: {
        rankToserver: this.data.rank,

      },


      header: {
        'content-Type': 'application/json'
      },

      //若响应成功，打印一段从服务器传来的字符串
      success(res) {
        console.log(res.data);
        app.globalData.visitorContent = res.data['0']['content'];
        app.globalData.visitorVoiceId = res.data['0']['voiceId'];

        console.log(app.globalData.visitorContent);
        console.log(app.globalData.visitorVoiceId);
        wx.navigateTo({
          url: '../vmpEngServer/vmpEngServer'
        })



      }
    });

  },





  inputC: function () {
    this.setData({
      rank: 'C'
    })
    app.globalData.rank = 'C';
    console.log('等级为', this.data.rank);
    var that = this;
    wx.request({

		//服务器路径，此处模糊化处理，具体见附件
      url: 'xxxxxxx/get_rank.php',


      method: 'GET',


      data: {
        rankToserver: this.data.rank,

      },


      header: {
        'content-Type': 'application/json'
      },

      //若响应成功，打印一段从服务器传来的字符串
      success(res) {
        console.log(res.data);
        app.globalData.visitorContent = res.data['0']['content'];
        app.globalData.visitorVoiceId = res.data['0']['voiceId'];
        app.globalData.visitorPostList = res.data

        console.log(app.globalData.visitorContent);
        console.log(app.globalData.visitorVoiceId);
        wx.navigateTo({
          url: '../vmpEngServer/vmpEngServer'
        })



      }
    });

  }

})

