import {User} from './user-model.js';
var user = new User();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status:[
      {status:0,count:0,title:'待完成'},
      {status:1,count:0,title:'待返款'},
      {status:3,count:0,title:'已完成'}
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._load();
  },
  _load:function(){
    let that = this;
   

    //获取任务数量
    user.getTaskCount((res)=>{
      that.setStatus(res);
    });
  },
  setStatus(count){
    let status = this.data.status;
    for(let i=0;i<count.length;i++){
      if (count[i].user_status==1){
        status[1].count = count[i].counts;
      } else if (count[i].user_status == 3){
        status[2].count = count[i].counts;
      }else{
        status[0].count += count[i].counts
      }
    }
    this.setData({
      status:status
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
    let that = this;
    user.getUserInfo((res) => {
      that.setUserInfoCache(res);
      console.log(res);
      that.setData({
        userInfo: res
      });
    });
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
  getCode:function(e){
    let code = e.detail.value;
    this.setData({
      code:code
    });
  },
  setCode:function(){
    let that = this;
    user.setUserCode(this.data.code,(res)=>{
      wx.showToast({
        title: '绑定成功',
        icon: 'success',
        duration: 1000
      })
      let userInfo = that.data.userInfo;
      userInfo.inviteCode = this.data.code;
      that.setUserInfoCache(userInfo);
      that.setData({
        userInfo:userInfo
      });
    });
  },
  toVip:function(){
    wx.navigateTo({
      url: '/pages/vip/vip'
    })
  },
  toUserInfo:function(){
    wx.navigateTo({
      url: '/pages/userInfo/userInfo'
    })
  },
  toGuide:function(){
    wx.navigateTo({
      url: '/pages/guide/guide'
    })
  },
  setUserInfoCache:function(data){
    wx.setStorageSync('userInfo', data);
  },
  toExtract:function(){
    wx.navigateTo({
      url: '/pages/extract/extract'
    })
  },
  toAlbum:function(){
    wx.navigateTo({
      url: '/pages/album/album'
    })
  },
  toTask:function(e){
    let id = user.getDataSet(e,'status'),
      count = user.getDataSet(e, 'count');
    wx.navigateTo({
      url: '/pages/task/task?id='+id+"&count="+count
    })
  }
})