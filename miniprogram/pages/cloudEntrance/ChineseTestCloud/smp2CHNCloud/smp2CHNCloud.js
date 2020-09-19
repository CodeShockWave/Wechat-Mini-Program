
const app = getApp()
const audioPlayer = wx.createInnerAudioContext();

Page({
  data: {
    btnText: 'Start Recording',
    bofangText: 'Play Music Demo',
    id: '',
    week: '1',

  },



  
    //播放试听功能：根据获取的voiceId播放存在云数据的音频
    onmusicTap: function (event) {
      if (this.data.isPlayingMusic) {
        this.setData({
          isPlayingMusic: false,
          bofangText: 'Pause...',
        });
        audioPlayer.pause();
    
      }else{
        audioPlayer.autoplay = true; 
        audioPlayer.loop = false;
		//云储存路径，此处模糊化处理，具体见附件
        audioPlayer.src = 'cloud://xxxxxxx/' + app.globalData.voiceId + '.mp3'
        audioPlayer.play();
        this.setData({
          bofangText: 'Playing...',
        })
        this.setData({
          isPlayingMusic: true
        });
        audioPlayer.onEnded((res) => {
          this.setData({
            bofangText: 'End!',
            isPlayingMusic: false,
          })
        })
      }
      },

	//页面的初始化
   onLoad: function (options) {
    var that = this;
    this.setData({
      id: app.globalData.id,
    })

    console.log('传入云函数的账号为: ', this.data.id);
    that.getServerContent(this.data.id);

  },


  //跳转至计划页
  gotoPlanPage: function () {
    wx.navigateTo({
      url: '../sppCHNCloud/sppCHNCloud'
    })

  },

    //向小程序云发送字段，返回content（需要测试的语音内容文字）
    getServerContent: function (e) {
      var that = this;
      wx.cloud.callFunction({
        //调用云函数名
        name: 'getContent',
        // 传给云函数的参数
        data: {
          id:app.globalData.id
        },
        success: function(res) {
			//打印结果
          console.log(res.result)
          		  
		  //对结果进行赋值，使用全局变量方便数据在页面间交互
          app.globalData.planId = res.result.data.list[0].planId;
          app.globalData.corpusId = res.result.data.list[0].makeplan[0].corpusId;
          app.globalData.voiceId = res.result.data.list[0].corpus[0].voiceId;
          app.globalData.content = res.result.data.list[0].corpus[0].content;
          app.globalData.practiceNumber = res.result.data.list[0].practiceNo;
  
          that.setData({
            content: res.result.data.list[0].corpus[0].content,
            practiceNumber:res.result.data.list[0].practiceNo,
          })
  
        },
        fail: console.error
      })
    },
})
