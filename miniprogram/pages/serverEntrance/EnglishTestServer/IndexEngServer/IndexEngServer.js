

const app = getApp()

Page({

  //初始化变量
  data: {
    id: '',
    password: '',
    week: '',
    message1:'',
    
    
  },

  //获取输入值的id user
  uesrInput: function (e) {
    this.data.id = e.detail.value;

  },

  //获取输入值的密码 password
  passwordInput: function (e) {
    this.data.password = e.detail.value;
  },
  
  //跳转到体验主页
  visitorLogin: function () {
    wx.navigateTo({
      url: '../vspEngServer/vspEngServer'
    })

  },

  //登陆操作
  userLogin: function () {

    //打印账号和密码
    console.log('账号为: ', this.data.id);
    console.log('密码为: ', this.data.password);

    //发起服务器响应，向服务器端的get_login.php发送userToserver，passwordToserver，服务器收到后进行匹配，若正确返回一段文字记录
    var that = this;
    wx.request({

      //服务器路径，此处模糊化处理，具体见附件     
      url: 'xxxxxxx/get_login.php',

      //get方法
      method: 'GET',

      //传输的变量
      data: {
        userToserver: this.data.id,
        passwordToserver: this.data.password,
        
      },

      //默认格式
      header: {
        'content-Type': 'application/json'
      },

      //若响应成功，打印一段从服务器传来的字符串
      success(res) {
        console.log(res),
          that.setData({
            postList: res.data,

          });
        
		//判断账号密码是否对应，若账号密码错误后弹出提示
        if (res.data != null) {
          if (res.data != '账号密码不正确') {
            app.globalData.id = that.data.id
            app.globalData.practiceNumber = res.data
                        
			//根据剩余测试次数选择跳转的页面
            if (app.globalData.practiceNumber <= 0) {
              wx.navigateTo({
                url: '../smp2EngServer/smp2EngServer'
              })
              wx.showToast({
                title: '欢迎登录',
                icon: 'success',
                duration:1500,
                mask:true
              })

            }else{
            wx.navigateTo({
              
              url: '../smpEngServer/smpEngServer'
              
            })
            wx.showToast({
              title: '欢迎登录',
              icon: 'success',
              duration:1500,
              mask:true
            })

            }
          }else{
            wx.showToast({
              title: '账户或密码错误',
              icon: 'none',
              duration:1500,
              mask:true
            })
          }
        }else{
          wx.showToast({
            title: '账户或密码错误',
            icon: 'none',
            duration:1500,
            mask:true
          })
        }
        
      }
    });

    


  },

  
 

})

