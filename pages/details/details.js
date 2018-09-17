import {Details} from './details-model.js';
var details = new Details();
// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
    });
    this._load();
  },
  _load:function(){
    let that = this;
    details.getTaskInfo(this.data.id,(res)=>{
      let main_img= res.main_img,
          shops_img = res.shops_img;
      if (shops_img){
        main_img = main_img.concat(shops_img);
          }
     
     
      that.setData({
        taskInfo:res,
        main_img: main_img
      });
      console.log(res);
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  applyTask:function(){
    details.applyTask(this.data.id,(res)=>{
      wx.showToast({
        title: res.msg,
        icon: 'success',
        duration: 1000,
        mask: true
      })
    });
  }
})