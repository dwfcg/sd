import {Base} from '../../utils/base.js';
class Task extends Base{
  constructor(){
    super();
  }

  tastStatus(id,callback){
    var that = this;
    var param = {
      url: that.api.tastStatus+id,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  getMoney(id, status, callback){
    var that = this;
    var param = {
      url: that.api.getMoney + id + '/' + status,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
  
}

export {Task}