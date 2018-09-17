import config  from './config.js';
class Token{
  constructor(){
    this.getTokenUrl = config.api.getToken;
    this.checkTokenUrl = config.api.checkToken;
  }

  //验证token
  verify(){
    //读取缓存中的token
    var token = wx.getStorageSync('token');
    if(!token){
      //缓存中不存在token，向后台请求
      this.getToken();
    }else{
      //判断token是否过期
      this.checkToken(token);
    }
  }

  //向后台获取token
  getToken(){
    var that = this;
    wx.login({
      success:function(res){
        wx.request({
          url:that.getTokenUrl,
          method:'POST',
          data:{code:res.code},
          success:function(res){
            //保存token
            wx.setStorageSync('token', res.data.token);
          }
        });
      }
    });

  }

  //验证token
  checkToken(token){
    var that = this;
    wx.request({
      url: that.checkTokenUrl,
      method:'GET',
      header:{
        'content-type': 'application/json',
        'token': token
      },
      success:function(res){
        var code = res.statusCode.toString();
        if(code==401){
          that.getToken();
          return false;
        }
        if(res.data.token){
          wx.setStorageSync('token', res.data.token);
        }
      }
    });
  }
}

export { Token }