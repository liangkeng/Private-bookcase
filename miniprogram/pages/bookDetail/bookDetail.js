// pages/bookDetail/bookDetail.js
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: [],
    show: false, //更改个性化数据窗口

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //这里的id是数据库中 "_id" 字段。option是从index点击查看详情中传过来的
    // console.log(options)
    db.collection('mybook').doc(options.id).get({
      success: res => {
        console.log(res.data);
        this.setData({
          book: res.data,
          id: options.id
        });
      },
      fail: err => {
        console.error(err);
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log('onShow  this:',this)
    db.collection('mybook').doc(this.data.id).get({
      success: res => {
        console.log(res.data);
        this.setData({
          book: res.data,
          id: options.id
        });
      },
      fail: err => {
        console.error(err);
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  // update: function(event) {
  //   console.log(event)
  //   db.collection('mybook').doc(this.data.id).update({
  //     data: {
  //       title: "局部更新测试2"
  //     },
  //     success: function(res) {
  //       console.log(res)
  //     }
  //   })
  // },
  delete: function(event) {
    db.collection('mybook').doc(this.data.id).remove({
      success: function(res) {
        console.log('删除成功',res);
        //todo 想加个删除成功的图案
        
        wx.switchTab({
          url: '../index/index',
        })
      }
    })

    //todo还应该删除bookNote集合中对应的笔记数据
    
  },
  updateBookData: function() {
    this.setData({
      show: true
    })
  },
  changeCost(value){
    this.setData({cost:value})
  },
  changeBookStore(value){
    this.setData({ bookStore: value })
  },
  changeMessage(value){
    this.setData({ message: value })
  },
  /*修改个人数据对话框关闭*/
  onClose(event) {
    if (event.detail === 'confirm') {
      //TODO 保存到数据库 
      console.log(this)
      console.log(this.data.cost.detail, this.data.bookStore.detail,this.data.message.detail)
      db.collection('mybook').doc(this.data.id).update(
        {
          data:{
            cost: this.data.cost.detail,
            bookStore: this.data.bookStore.detail,
            message: this.data.message.detail
          },
          success(res){
            console.log(res)
          }
        }
      )
      // 异步关闭弹窗
    setTimeout(() => {  
      this.setData({
        show: false
      });
    }, 1000);
    console.log('保存数据,并刷新');
    this.onShow();
  } else {
    this.setData({
      show: false
    });
    console.log('关闭对话框，未保存数据')
  }
}
})