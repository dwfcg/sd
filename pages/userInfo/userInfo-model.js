import {Base} from '../../utils/base.js';
class UserInfo extends Base{
  constructor(){
    super();
  }

  //绑定淘宝帐号
  setTaobao(data,callback){
    var that = this;
    var param = {
      url: that.api.setTaobao,
      type:'POST',
      data:data,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  //获取淘宝帐号
  getTaobao(callback) {
    var that = this;
    var param = {
      url: that.api.setTaobao,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  setIds(data,callback){
    var that = this;
    var param = {
      url: that.api.setIds,
      type:'POST',
      data:data,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  
  
}
export {UserInfo}