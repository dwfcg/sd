import {UserInfo} from './userInfo-model.js';
var userInfo = new UserInfo();
var app = getApp();
// pages/my_data/my_data.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taobao:{
      name:'',
      level:'',
      year:'',
      professional:"",
      qq:'',
      tq:'',
    },
    img: [
      { url: '' ,id:''},
      { url: '', id: '' },
      { url: '', id: '' },
      { url: '', id: '' },
      { url: '', id: '' },
    ],
    pics: [],
    ids:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._load();
  },
  _load:function(){
    //获取用户信息
    let that = this;
    this.getUserInfo();
    userInfo.getTaobao((res)=>{
      if(res){
        that.setData({
          taobao:res
        });
      }
    });
  },
  getUserInfo:function(){
    let userInfo = wx.getStorageSync('userInfo');
    let img = this.data.img;
    if (userInfo.show_img){
      img = userInfo.show_img
    }
    console.log(userInfo);
    this.setData({
      userInfo:userInfo,
      img:img
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
    

    let data = e.detail.value;
    userInfo.setTaobao(data,(res)=>{
      wx.showToast({
        title: res.msg,
        icon: 'succes',
        duration: 1000,
        mask: true
      })
    });
  },
  upload:function(){
    var that = this,
    pics = this.data.pics;

    wx.chooseImage({
      count: 5 - pics.length, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        var imgsrc = res.tempFilePaths;
        pics = pics.concat(imgsrc);
        that.setData({
          ids:''
        });
        that.uploadimg({
          url: userInfo.api.upload,//这里是你图片上传的接口
          path: pics//这里是选取的图片的地址数组
        });
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })

  },
  uploadimg: function (data) {
    var that = this,
      i = data.i ? data.i : 0,
      success = data.success ? data.success : 0,
      fail = data.fail ? data.fail : 0;
     
    wx.uploadFile({
      url: data.url,
      filePath: data.path[i],
      name: 'logo',
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('token')
      },
      formData: {
        id: data.id
      },
      success: function (res) {
        success++;
        let img = that.data.img,ids=that.data.ids;
        console.log(res);
        var obj = JSON.parse(res.data);
        img[i].url = obj.path;
        ids += ids ? "," + obj.id : obj.id;
        that.setData({
          img:img,
          ids: ids
        });
       
        console.log(res)
        console.log(i);

      },
      fail: function (res) {
        fail++;
        console.log('fail:' + i + "fail:" + fail);
      },
      complete: function (res) {
        console.log(i);
        i++;
        if (i == data.path.length) {  //当图片传完时，停止调用     
          console.log('执行完毕');
          console.log(that.data.ids);
          if (success==5){
            let data = { ids: that.data.ids};
            userInfo.setIds(data,(res)=>{
              wx.showToast({
                title: res.msg,
                icon: 'succes',
                duration: 1000,
                mask: true
              })
            });
          }else{
            wx.showModal({
              title: '提示',
              content: '请上传5张照片',
              showCancel: false,
            })
          }
          console.log('成功：' + success + " 失败：" + fail);
        } else {
          console.log(i);
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data);
        }

      }
    })
  }
})