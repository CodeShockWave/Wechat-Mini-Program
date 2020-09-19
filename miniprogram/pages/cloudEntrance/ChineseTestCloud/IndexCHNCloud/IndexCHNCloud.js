//这是起始页
const app = getApp()

//相当于自己服务器上的数据库连接字段 192.172.0.1/database/user
const DBuser = wx.cloud.database().collection("user")

Page({

  //初始化变量
  data: {
    id: '',
    password: '',
    week: '',
    message1:'',
    practiceNumber:'',
    
    
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
      url: '../vspCHNCloud/vspCHNCloud'
    })

  },

  //登陆操作  
  userLoginDB: function () {
    var that = this;

    //打印账号和密码
    console.log('输入账号为: ', this.data.id);
    console.log('输入密码为: ', this.data.password);

    //条件查询，判断账号密码是否对应
     DBuser.where({
      Id:this.data.id,
    }).get({
      success(res){
        if(res.data[0] != null){
          
        }
        else{
          console.log('失败,账号错误')
		  //账号密码错误后弹出提示
          wx.showToast({
            title: 'Account or password error login failed',
            icon: 'none',
            duration:1500,
            mask:true
          })
        } 
      }, 
    })
    DBuser.where({
      Id:this.data.id,
      password:this.data.password,
    }).get({
      success(res){
        if(res.data[0] != null){
          console.log("欢迎登录",res.data[0].Id)
          app.globalData.id = that.data.id
          that.getServerPracticeNo(app.globalData.id)
          wx.showToast({
            title: 'Welcome',
            icon: 'success',
            duration:1500,
            mask:true
          })
            
          
        }
        else{
          console.log('失败,密码错误')
          wx.showToast({
            title: 'Welcome',
            icon: 'none',
            duration:1500,
            mask:true
          })
        } 
      },
      
    })
    

    
  },

  getServerPracticeNo: function (e) {
    
    wx.cloud.callFunction({
      //调用云函数名
      name: 'getPracticeNo',
      // 传给云函数的参数
      data: {
        id: app.globalData.id,
      },
      success: function(res) {        
        //console.log(res.result.data.list[0].practiceNo)
        app.globalData.practiceNumber = res.result.data.list[0].practiceNo;
        console.log(app.globalData.practiceNumber)
		//根据剩余测试次数选择跳转的页面
        if(app.globalData.practiceNumber > 0){
          wx.navigateTo({
            url: '../smpCHNCloud/smpCHNCloud'
          })

        }else{
          wx.navigateTo({
            url: '../smp2CHNCloud/smp2CHNCloud'
          })
        }
        
        
      },
      fail: console.error
    })
  },

  
 

})

