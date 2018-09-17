import { Base } from '../../utils/base.js';
class Index extends Base{
  constructor(){
    super();
  }

  //获取任务标签
  getTaskCate(callback){
    var that = this;
    var param = {
      url: that.api.getTaskCate,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  //获取任务列表
  getTaskList(data,callback){
    var that = this;
    var data = data.id ? "?id=" + data.id + "&page=" + data.page:'?page='+data.page;
    var param = {
      url: that.api.getTaskList + data,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  

}
export { Index }