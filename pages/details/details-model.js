import {Base} from '../../utils/base.js';
class Details extends Base{
  constructor(){
    super()
  }

  //获取任务详情
  getTaskInfo(id,callback){
    var that = this;
    var param = {
      url: that.api.getTaskInfo+id,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  //申请任务
  applyTask(id, callback){
    var that = this;
    var param = {
      url: that.api.applyTask + id,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
}
export {Details}