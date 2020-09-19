
const app = getApp()

Page({
  data: {
    btnText: '开始录制',
    bofangText: '播放试听',
    id: '',
    week: '1',

  },


  //播放试听功能：根据获取的voiceId播放存在服务器的音频
  audioPlayer: wx.createInnerAudioContext(),
  onmusicTap: function (event) {
   if (this.data.isPlayingMusic) {
     this.setData({
       isPlayingMusic: false,
       bofangText: '暂停中...',
     });
     this.audioPlayer.pause();
 
   }else{
     this.audioPlayer.autoplay = true; 
     this.audioPlayer.loop = false;
	 //服务器路径，此处模糊化处理，具体见附件
     this.audioPlayer.src = 'xxxxxxx/voice/' + app.globalData.voiceId
     this.audioPlayer.play();
     this.setData({
       bofangText: '播放中..',
     })
     this.setData({
       isPlayingMusic: true
     });
     this.audioPlayer.onEnded((res) => {
       this.setData({
         bofangText: '播放结束！',
       })
     })
   }
   },


	//页面的初始化
  onLoad: function (options) {
    this.setData({
      id: app.globalData.id
    })


    //打印账号和密码
    console.log('账号为: ', this.data.id);
    console.log('星期为: ', this.data.week);

    //发起服务器响应，向服务器端的get_test.php发送userToserver，passwordToserver，服务器收到后进行匹配，若正确返回一段文字记录
    var that = this;
    wx.request({

      //服务器路径，此处模糊化处理，具体见附件
      url: 'xxxxxxx/get_test.php',

      //get方法
      method: 'GET',

      //传输的变量
      data: {
        userToserver: this.data.id,
        weekToserver: this.data.week,
      },

      //默认格式
      header: {
        'content-Type': 'application/json'
      },

      //若响应成功，打印一段从服务器传来的字符串
	  //对结果进行赋值，使用全局变量方便数据在页面间交互
      success(res) {
        console.log(res.data);
        app.globalData.content = res.data['0']['content'];
        app.globalData.voiceId = res.data['0']['voiceId'];
        app.globalData.practiceNumber = res.data['0']['practiceNumber'];
        console.log(app.globalData.content);
        console.log(app.globalData.voiceId);
        console.log(app.globalData.practiceNumber)

        console.log(res.data)
        that.setData({
          postList: res.data,

        });

      }
    });

  
  },


	//跳转至计划页
  gotoPlanPage: function () {
    wx.navigateTo({

      url: '../sppEngServer/sppEngServer'
    })

  }
})
