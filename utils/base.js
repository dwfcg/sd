import config from './config.js';
import {Token} from './token.js';
class Base{
  constructor(){
    this.api = config.api;
  }

  request(params,noRefetch){
  
    var that = this,
    url = params.url;

    if(!params.type){//没有设置提交方式时，默认使用get提交
      params.type = 'get';
    }
    //不需要再次组装地址
    if(params.setUpUrl == false){
      url = params.url; 
    }

    wx.request({
      url:url,
      data:params.data,
      method:params.type,
      header:{
        'content-type': 'application/json',
        'token': wx.getStorageSync('token')
      },
      success:function(res){
        //获取状态码
        var code = res.statusCode.toString();
        var startChar = code.charAt(0);

        if(startChar == '2'){//不以2开头的状态码都是失败
          if(res.data.token){
            //如存在新的token就替换旧的token
            wx.setStorageSync('token', res.data.token);
          }
          //回调
          params.sCallback && params.sCallback(res.data);
        }else{
          if (code == '401') {
            if (!noRefetch) {
              that._refetch(params);
            }
          }
          that._processError(res);
          params.eCallback && params.eCallback(res.data);
        }
      },
      fail: function (err) {
        //wx.hideNavigationBarLoading();
        that._processError(err);
        // params.eCallback && params.eCallback(err);
      }
    });
  }

  _processError(err) {
   
    let code = err.statusCode;
    if(code != 401){
      wx.showModal({
        title: '提示',
        content: err.data.msg,
        showCancel: false,
      })
    }
   
  }

  _refetch(param) {
    var token = new Token();
    token.getToken((token) => {
      this.request(param, true);
    });
  }

  /*获得元素上的绑定的值*/
  getDataSet(event, key) {
    return event.currentTarget.dataset[key];
  };

  //获取banner
  getBanner(id,callback){
    var that = this;
    var param = {
      url:that.api.getBanner+id,
      sCallback:function(data){
        callback && callback(data);
      }
    };
    this.request(param);
  }
}
export { Base }