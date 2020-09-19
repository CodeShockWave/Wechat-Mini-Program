
const app = getApp()

app.globalData.plugin = requirePlugin("myPlugin");
// 小程序端直接使用密钥计算授权凭证
app.globalData.manager = app.globalData.plugin.getSoeRecorderManager({
  secretId: '',
  secretKey: ''
});

Page({
  data: {
    resps: [],

    btnText: '开始录制',
    bofangText: '播放试听',

    serverTypeItems: [
      { name: 0, value: '英文', checked: 'true' },
      { name: 1, value: '中文' }
    ],
    evalModeItems: [
      { name: 0, value: '词模式' },
      { name: 1, value: '句子模式', checked: 'true' },
      { name: 2, value: '段落模式' },
      { name: 3, value: '自由说模式' }
    ],
    storageModeItems: [
      { name: 0, value: '放弃存储', checked: 'true' },
      { name: 1, value: '存储音频' }
    ],
    textModeItems: [
      { name: 0, value: '普通文本', checked: 'true' },
      { name: 1, value: '音素结构文本' }
    ],

    soeAppId: '',
    content: '',
    serverType: 0,
    storageMode: 0,
    evalMode: 0,
    scoreCoeff: 1.5,
    textMode: 0,
    duration: 60000,

    id: '',
    week: '',
    practiceNumber: '',
    rank:'',

  },

	//播放试听功能：根据获取的voiceId播放存在云数据的音频
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
     this.audioPlayer.src = 'xxxxxxx/voice/' + app.globalData.visitorVoiceId
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


  onLoad: function (options) {
    this.setData({
      rank: app.globalData.rank,
      id: '',
    })

    console.log('等级为', this.data.rank);


    
    var that = this;
    wx.request({

      //服务器路径，此处模糊化处理，具体见附件
      url: 'xxxxxxx/get_rank.php',

      //get方法
      method: 'GET',

      //传输的变量
      data: {
        rankToserver: this.data.rank,

      },

      //默认格式
      header: {
        'content-Type': 'application/json'
      },

      //若响应成功，打印一段从服务器传来的字符串
      success(res) {
        console.log(res.data);
        app.globalData.content = res.data['0']['content'];
        app.globalData.voiceId = res.data['0']['voiceId'];
        
        console.log(app.globalData.content);
        console.log(app.globalData.voiceId);
        

        
        that.setData({
          visitorPostList: res.data,

        });


      }
    });

    app.globalData.manager.onSuccess((res) => {
      this.setData({
        PronAccuracy: (res.PronAccuracy).toFixed(2),
        PronFluency: (res.PronFluency * 100).toFixed(2),
        PronCompletion: (res.PronCompletion * 100).toFixed(2),
        practiceNumber: this.data.practiceNumber - 1,

      })


    });


    app.globalData.manager.onStop(() => {
      this.setData({
        btnText: '开始录制'
      })
    })

    app.globalData.manager.onStart(() => {
      this.setData({
        resps: [],
        btnText: '录制中'
      })
    })

    app.globalData.manager.onResponse((res) => {
      let array = this.data.resps
      array.push(JSON.stringify(res))
      this.setData({ resps: array })
    })

    app.globalData.manager.onError((res) => {
      console.log(res)
    })
  },

  ontouchstart: function () {

    app.globalData.manager.start({
      content: app.globalData.visitorContent,
      evalMode: 2,
      scoreCoeff: this.data.scoreCoeff,
      serverType: this.data.serverType,
      storageMode: this.data.storageMode,
      soeAppId: this.data.soeAppId,
      textMode: this.data.textMode,
      duration: this.data.duration
    })

  },

  ontouchend: function () {
    app.globalData.manager.stop()
  },

  
})
