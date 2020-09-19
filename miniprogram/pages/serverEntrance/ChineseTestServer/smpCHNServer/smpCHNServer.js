
const app = getApp();
const recorderManager = wx.getRecorderManager();
const innerAudioContext = wx.createInnerAudioContext();
const voiceReciver = wx.getRecorderManager();
const voicePlayer = wx.createInnerAudioContext()

//小程序端直接使用密钥计算授权凭证，secretId，secretKey获取请查阅《智聆语音评测》
app.globalData.plugin = requirePlugin("myPlugin");
app.globalData.manager = app.globalData.plugin.getSoeRecorderManager({
  secretId: '',
  secretKey: ''
});

Page({
  data: {
    resps: [],

    btnText: 'Start Recording',
    bofangText: 'Play Music Demo',
    shoutingText: 'Play Recording',

    serverTypeItems: [
      { name: 0, value: '英文'},
      { name: 1, value: '中文', checked: 'true' }
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
    serverType: 1,
    storageMode: 0,
    evalMode: 0,
    scoreCoeff: 1.5,
    textMode: 0,
    duration: 60000,

    id: '',
    week: '',
    practiceNumber: '',

    openRecordingdis: "block",//录音图片的不同
    shutRecordingdis: "none",//录音图片的不同
    recordingTimeqwe:0,//录音计时
    setInter:"",//录音名称
    fileName:"",
    isplay:true //播放状态  true--播放中  false--暂停播放

  },

	//播放试听功能：根据获取的voiceId播放存在服务器的音频
  audioPlayer: wx.createInnerAudioContext(),
  onmusicTap: function (event) {
   if (this.data.isPlayingMusic) {
     this.setData({
       isPlayingMusic: false,
       bofangText: 'Pause...',
     });
     this.audioPlayer.pause();
 
   }else{
     this.audioPlayer.autoplay = true; 
     this.audioPlayer.loop = false;
	 //服务器路径，此处模糊化处理，具体见附件
     this.audioPlayer.src = 'xxxxxxx/voice/' + app.globalData.voiceId
     this.audioPlayer.play();
     this.setData({
       bofangText: 'Playing...',
     })
     this.setData({
       isPlayingMusic: true
     });
     this.audioPlayer.onEnded((res) => {
       this.setData({
         bofangText: 'End!',
       })
     })
   }
   },
   
   //播放录音：播放用户最近一次语音评测所录下的音频
   playVoice() {
    let voice = this.data.voice.tempFilePath;
    voicePlayer.autoplay = true
    voicePlayer.src = voice,
      voicePlayer.onPlay(() => {
        console.log('开始播放')
      })
    voicePlayer.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },

  //页面的初始化
  onLoad: function (options) {
    this.setData({
      id: app.globalData.id,
      practiceNumber: app.globalData.practiceNumber,
    })


    //打印账号和密码
    console.log('账号为: ', this.data.id);


    //发起服务器响应，向服务器端的get_test1.php发送userToserver，服务器收到后进行匹配，若正确返回一段文字记录
    var that = this;
    wx.request({

      //服务器路径，此处模糊化处理，具体见附件
      url: 'xxxxxxx/get_test1.php',

      //get方法
      method: 'GET',

      //传输的变量
      data: {
        userToserver: this.data.id,

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

    app.globalData.manager.onSuccess((res) => {
      this.setData({
        PronAccuracy: (res.PronAccuracy).toFixed(2),
        PronFluency: (res.PronFluency * 100).toFixed(2),
        PronCompletion: (res.PronCompletion * 100).toFixed(2),
        practiceNumber: this.data.practiceNumber - 1,

      })


      var that = this;
      wx.request({

        //服务器路径，此处模糊化处理，具体见附件
        url: 'xxxxxxx/get_score.php',

        //get方法
        method: 'GET',

        //传输的变量
        data: {
          userToserver: this.data.id,
          accToserver: this.data.PronAccuracy,
          fluToserver: this.data.PronFluency,
          comToserver: this.data.PronCompletion,

        },

        //默认格式
        header: {
          'content-Type': 'application/json'
        },

        success(res) {
          console.log(res.data);

        }
      })


    });


    app.globalData.manager.onStop(() => {
      this.setData({
        btnText: 'Start Recording'
      })
    })

    app.globalData.manager.onStart(() => {
      this.setData({
        resps: [],
        btnText: 'Recording'
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

  //录音计时器
  recordingTimer:function(){
    var that = this;
    //将计时器赋值给setInter
    that.data.setInter = setInterval(
      function () {
        var time = that.data.recordingTimeqwe + 1;
        if(time>60){
          wx.showToast({
            title: 'The recording time is up to one minute',
            duration:1500,
            mask:true
          })
          clearInterval(that.data.setInter);
          that.shutRecording();
          return;
        }
        that.setData({
          recordingTimeqwe: time
        })
      }
      , 1000); 
  },

  //开始录音
  openRecording: function() {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          shutRecordingdis: "block",
          openRecordingdis: "none"
        })
      }
    })
    const options = {
      duration: 60000, //指定录音的时长，单位 ms，最大为10分钟（600000），默认为1分钟（60000）
      sampleRate: 16000, //采样率
      numberOfChannels: 1, //录音通道数
      encodeBitRate: 96000, //编码码率
      format: 'mp3', //音频格式，有效值 aac/mp3
      frameSize: 50, //指定帧大小，单位 KB
    }
    //开始录音计时   
    that.recordingTimer();
    //开始录音
    recorderManager.start(options);
    recorderManager.onStart(() => {
      console.log('。。。开始录音。。。')
    });
    //错误回调
    recorderManager.onError((res) => {
      console.log(res);
    })
  },
 
  //结束录音
  shutRecording: function() {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          shutRecordingdis: "none",
          openRecordingdis: "block"
        })
      }
    })
    recorderManager.stop();
    recorderManager.onStop((res) => {
      console.log('。。停止录音。。', res.tempFilePath)
      const {tempFilePath} = res;
      //结束录音计时  
      clearInterval(that.data.setInter);
      console.log(res) //这里是必须写完成事件的，因为最后的文件，就在这里面；
      let time = parseInt(res.duration / 1000);
      this.setData({
        voice: res,
        voiceTime: time,
        showVoice: true,
      })
      // 其中：
      // res.tempFilePath;//是临时的文件地址
      // res.duration;//录音的时长
      // res.fileSize;//文件的大小



      //上传录音
      wx.uploadFile({
        url: "xxxxxxx/upload.php",//这是你自己后台的连接
        filePath: tempFilePath,
        name:"file",//后台要绑定的名称
        header: {
          "Content-Type": "multipart/form-data"
        },
        //参数绑定
        formData:{
          recordingtime: that.data.recordingTimeqwe,
          topicid: that.data.topicid,
          userid:1,
          praisepoints:0,
          userName:this.data.id,
          voiceName:app.globalData.voiceId,
          voiceCounter:this.data.practiceNumber,
        },
        success:function(ress){
          console.log(res);
          wx.showToast({
            title: 'Save Complete',
            icon:'success',
            duration:2000
          })
          that.setData({
            recordingTimeqwe:0
          })
        },
        fail: function(ress){
          console.log("。。录音保存失败。。");
        }
      })
      
    })

  },
  
	//长按操作的开始
  ontouchstart: function () {
    var that = this;
    that.openRecording();

    app.globalData.manager.start({
      content: app.globalData.content,
      evalMode: 2,
      scoreCoeff: this.data.scoreCoeff,
      serverType: 1,
      storageMode: this.data.storageMode,
      soeAppId: this.data.soeAppId,
      textMode: this.data.textMode,
      duration: this.data.duration
    })

  },
  
	//长按操作的结束
  ontouchend: function () {
    var that = this;
    that.shutRecording();
    app.globalData.manager.stop()
  },

	//跳转至计划页
  gotoPlanPage: function () {
    wx.navigateTo({
      url: '../sppCHNServer/sppCHNServer'
    })

  }
})
