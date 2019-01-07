const db = wx.cloud.database()
const book = db.collection("mybook")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    book_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
  

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
    db.collection('mybook').get({
      success: (res) => {
        console.log(res.data)
        this.setData({
          book_list: res.data
        })
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
  //查看卡片详情
  viewItem: function (event) {
 //   console.log(event)
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../bookDetail/bookDetail?id='+id,
    })
  },
  viewNote: function (event){
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../bookNote/bookNote?id='+id,
    })
  }
})