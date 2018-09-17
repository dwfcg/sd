import {Base} from '../../utils/base.js';
class Extract extends Base{
  constructor(){
    super();
  }

  //提现
  drawal(data,callback){
    var that = this;
    var param = {
      url: that.api.drawal,
      type:'POST',
      data:data,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
  
}
export {Extract}