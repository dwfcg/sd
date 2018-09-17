import {Extract} from './extract-model.js';
var extract = new Extract();
// pages/extract/extract.js
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
    this._load();
  },
  _load:function(){
    let userInfo = wx.getStorageSync('userInfo');
    this.setData({
      userInfo:userInfo
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
  formSubmit:function(e){
    //提现
    let account = e.detail.value.account,
      account_name = e.detail.value.account_name,
      money = e.detail.value.money;
    let data = { account: account, account_name: account_name, money: money};
    extract.drawal(data,(res)=>{
      console.log(res);
    });
  }
})