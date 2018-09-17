import {Album} from './album-model.js';
var album = new Album();

// pages/album/album.js
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    // showView: true,
    tu:[],
    pics: [],
    img:[]


  },
  bindtapFunc: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(e.currentTarget.dataset);
    var that = this;
    that.data.img[index].hidden = !that.data.img[index].hidden;
    // console.log(that.data)
    console.log(that.data.img);
    that.setData({
      img: that.data.img
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    let userInfo = wx.getStorageSync('userInfo'),img;
    img=userInfo.show_img;
    this.setData({
      img:img
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
  upload: function () {
    var that = this,
      pics = this.data.pics,
      tu = this.data.tu;

    wx.chooseImage({
      count:9, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        var imgsrc = res.tempFilePaths;
        pics = pics.concat(imgsrc);
        
        that.setData({
          ids: '',
        
        });
        

        that.uploadimg({
          url: album.api.upload,//这里是你图片上传的接口
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
        let img = that.data.img, ids = that.data.ids;
        
        var obj = JSON.parse(res.data);
        if (res.statusCode==200){
          if(!img)
          {
            img = [{ url: obj.path, hidden: false, id: obj.id }];
          }else{
            img = img.concat({ url: obj.path, hidden: false, id: obj.id });
            }
         
          ids += ids ? "," + obj.id : obj.id;
          that.setData({
            img: img,
            ids: ids
          });
          console.log(that.data.img);
        }
      

      },
      fail: function (res) {
        fail++;
        console.log('fail:' + i + "fail:" + fail);
      },
      complete: function (res) {
        let userInfo = wx.getStorageSync('userInfo');
        // console.log(res);
        i++;

        if (i == data.path.length) {  //当图片传完时，停止调用     
          console.log('执行完毕');
          if (res.statusCode == 200){
            var ids=[], img = userInfo.show_img;
            if(img)
            {
              for (let i = 0; i < img.length; i++) {
                ids.push(img[i].id);
              }
            }
           
            ids = ids.join(",")+','+that.data.ids;

            let data = { ids: ids };
            album.setIds(data, (res) => {
              wx.showToast({
                title: res.msg,
                icon: 'succes',
                duration: 1000,
                mask: true
              })
            });
            
            userInfo.show_img=that.data.img;
            wx.setStorageSync('userInfo', userInfo);
          }else{
            wx.showToast({
              title: '图片上传失败',
              icon: 'loading',
              duration: 1000,
              mask: true
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
  },
  del:function(){

    let img = this.data.img,ids=[],new_img=[],that=this;
    for(let i=0;i<img.length;i++){
        if(img[i].hidden){
          ids.push(img[i].id);
        }
    }
    if(ids.length>0){
      ids = ids.join(",")
      album.del(ids,(res)=>{
        for (let i = 0; i < img.length; i++) {
          if (!img[i].hidden) {
            new_img.push(img[i]);
          }
        }
        that.setData({
          img: new_img
        });
        let userInfo = wx.getStorageSync('userInfo');
        userInfo.show_img = new_img;
        wx.setStorageSync('userInfo', userInfo);
      });
    }
  
  }

})