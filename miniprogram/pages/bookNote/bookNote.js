// miniprogram/pages/bookNote/bookNote.js
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    noteList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options.id)
      this.setData({
        id: options.id
      })
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
  //  console.log("onShow id:",this.data.id)
    db.collection('bookNote').where({
      // 匹配该书笔记
      bookId: this.data.id
    }).get({
      success: res => {
        console.log(res.data);
        this.setData({
          noteList: res.data,
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

  /*新添笔记*/
  addNote:function(){

    // bookId : this.data.id 必须加上  

  //   const bookNote = db.collection('bookNote');
  //   db.collection('bookNote').add({
  //     data: bookNoteJson
  //   }).then(res => {
  //     console.log(res)
  //   }).catch(err => {
  //     console.log(err)
  //   })
   },

  /*删除笔记*/
  deleteNote: function (noteId){
    db.collection('bookNote').doc(noteId).remove({
      success: function (res) {
        console.log('删除笔记成功', res);
        //todo 想加个删除成功的图案

      }
    })
  },
  //跳转到添加笔记界面
  addNotePage:function(){
    console.log('跳转到添加笔记界面')
    wx.navigateTo({
      url: '../bookAddNote/bookAddNote',
    })
  }
})