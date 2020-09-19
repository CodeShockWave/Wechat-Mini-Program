//这是主页面
const app = getApp();
const recorderManager = wx.getRecorderManager();
const voiceReciver = wx.getRecorderManager();
const innerAudioContext = wx.createInnerAudioContext();
const voicePlayer = wx.createInnerAudioContext();
const audioPlayer = wx.createInnerAudioContext();
const DBfulfillment = wx.cloud.database().collection("fulfillment")

//小程序端直接使用密钥计算授权凭证，secretId，secretKey获取请查阅《智聆语音评测》
app.globalData.plugin = requirePlugin("myPlugin");
app.globalData.manager = app.globalData.plugin.getSoeRecorderManager({
  secretId: '',
  secretKey: ''
});

Page({
  data: {
    resps: [],

    btnText: '开始录制',
    bofangText: '播放试听',
    shoutingText: '播放录音',

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
    PronAccuracy: '',
    PronFluency: '',
    PronCompletion: '',

    openRecordingdis: "block",//录音图片的不同
    shutRecordingdis: "none",//录音图片的不同
    recordingTimeqwe:0,//录音计时
    setInter:"",//录音名称
    fileName:"",
    isplay:true //播放状态  true--播放中  false--暂停播放

  },
	//页面的初始化
  onLoad: function (options) {
    var that = this;
    this.setData({
      id: app.globalData.id,
    })

    console.log('传入云函数的账号为: ', this.data.id);
    that.getServerContent(this.data.id);

    //调用语音评测端口，获取评价指标以百分制表示，保留两位小数
    app.globalData.manager.onSuccess((res) => {
      this.setData({
        PronAccuracy: (res.PronAccuracy).toFixed(2),
        PronFluency: (res.PronFluency * 100).toFixed(2),
        PronCompletion: (res.PronCompletion * 100).toFixed(2),
        practiceNumber: this.data.practiceNumber - 1,

      })
      //记录三次的成绩，超过三次后不向服务器发送响应，服务器不记录后续成绩
      if(app.globalData.practiceNumber > 0){
        that.toServerFulfillment(this.data.id); 
        that.toServerCount(this.data.id); 
      }
            
    });

    //语音端口的调用，调用时自动改变图标内的文字，增加易用性
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

  //播放试听功能：根据获取的voiceId播放存在云数据的音频
  onmusicTap: function (event) {
   if (this.data.isPlayingMusic) {
     this.setData({
       isPlayingMusic: false,
       bofangText: '暂停中...',
     });
     audioPlayer.pause();
 
   }else{
     audioPlayer.autoplay = true; 
     audioPlayer.loop = false;
	 //云储存路径，此处模糊化处理，具体见附件
     audioPlayer.src = 'cloud://xxxxxxx/' + app.globalData.voiceId + '.mp3'
     audioPlayer.play();
     this.setData({
       bofangText: '播放中..',
     })
     this.setData({
       isPlayingMusic: true
     });
     audioPlayer.onEnded((res) => {
       this.setData({
         bofangText: '播放结束！',
         isPlayingMusic: false,
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

  //计时器：录音超出一分钟将进行提示
  recordingTimer:function(){
    var that = this;
    //将计时器赋值给setInter
    that.data.setInter = setInterval(
      function () {
        var time = that.data.recordingTimeqwe + 1;
        if(time>60){
          wx.showToast({
            title: '录音时长到一分钟啦',
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
      serverType: this.data.serverType,
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
    app.globalData.manager.stop();
    
    
 
  },

  //跳转至计划页
  gotoPlanPage: function () {
    wx.navigateTo({
      url: '../sppEngCloud/sppEngCloud'
    })

  },

  //向小程序云发送字段，返回content
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
        console.log(res.result)
        console.log(res.result.data.list[0].Id)
        console.log(res.result.data.list[0].planId)
        console.log(res.result.data.list[0].makeplan[0].corpusId)
        console.log(res.result.data.list[0].corpus[0].voiceId)
        console.log(res.result.data.list[0].corpus[0].content)
        console.log(res.result.data.list[0].practiceNo)

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

  //向小程序云发送字段，传送口语评测得分
  toServerFulfillment: function (e) {
    //var that = this;
    wx.cloud.callFunction({
      //调用云函数名
      name: 'toFulfillment',
      // 传给云函数的参数
      data: {
        id:app.globalData.id,
        pra:app.globalData.practiceNumber,
        acc:this.data.PronAccuracy,
        com:this.data.PronCompletion,
        flu:this.data.PronFluency,
      },
      success: function(res) {
        app.globalData.practiceNumber = app.globalData.practiceNumber -1    
       
      },
      fail: console.error
    })
  },

  //向小程序云发送字段，更新操作
  toServerCount: function (e) {
    //var that = this;
    wx.cloud.callFunction({
      //调用云函数名
      name: 'toCount',
      // 传给云函数的参数
      data: {
        id:app.globalData.id,
        pra:app.globalData.practiceNumber,     
      },
      success: function(res) {
               
      },
      fail: console.error
    })
  },




})
