import {Index} from './index-model.js';
var index = new Index();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isActive:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  _Load:function(){
    let that = this;
    index.getBanner(1,(banner)=>{
      that.setData({
        bannerItem:banner.item
      });
    });

    //获取任务分类
    index.getTaskCate((res)=>{
      that.setData({
        cate:res
      });
    });

    //获取任务列表
    index.getTaskList({'page':1},(res)=>{
      that.setData({
        taskList:res.data,
        page: res.current_page,
        last_page: res.last_page
      });
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
    this._Load();
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
  getTaskByCate:function(e){
    let id = index.getDataSet(e,'id');
    this.setData({
      isActive:id
    });
    let that = this;
    //获取任务列表
    index.getTaskList({ 'id':id,'page': 1 }, (res) => {
      that.setData({
        taskList: res.data,
        page: res.current_page,
        last_page: res.last_page
      });
    });
  },
  lower:function(){
    //获取任务列表
    let that =this;
    if(this.data.page<this.data.last_page){
      index.getTaskList({ 'page': ++this.data.page }, (res) => {
        let taskList = that.data.taskList;
        that.setData({
          taskList: that.data.taskList.concat(res.data),
          page: res.current_page,
          last_page: res.last_page
        });
      });
    }
    
  },
  toDetails:function(e){
    //获取任务详情
    let id = index.getDataSet(e,'id');
    wx.navigateTo({
      url: '/pages/details/details?id='+id
    })
  }

})