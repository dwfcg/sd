import {Base} from '../../utils/base.js';
class User extends Base{
  constructor(){
    super();
  }


  //获取用户信息
  getUserInfo(callback) {
    var that = this;
    var param = {
      url: that.api.getUserInfo,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

//获取任务数量
  getTaskCount(callback){
    var that = this;
    var param = {
      url: that.api.getTaskCount,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  //绑定邀请码
  setUserCode(code,callback){
    var that = this;
    var param = {
      url: that.api.setUserCode + code,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
}
export {User}