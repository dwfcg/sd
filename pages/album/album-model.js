import {Base} from '../../utils/base.js';
class Album extends Base{
  constructor(){
    super();
  }

  setIds(data, callback) {
    var that = this;
    var param = {
      url: that.api.setIds,
      type: 'POST',
      data: data,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  del(ids, callback) {
    var that = this;
    var param = {
      url: that.api.del+'/'+ids,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
}
export {Album}