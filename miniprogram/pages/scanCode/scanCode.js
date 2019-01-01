// pages/scanCode/scanCode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false
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

  scanCode:function(event) {
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['barCode'],
      success : res => {
        console.log("识别成功，isnb为", res.result)
        //传到云函数处理
        wx.cloud.callFunction({
          // 需调用的云函数名
          name: 'bookinfo',
          // 传给云函数的参数
          data: {
            isbn: res.result,
          },
         success:res =>{
          // console.log("豆瓣api返回结果", res)
           var bookString = res.result
           var bookJson = JSON.parse(bookString)
          bookJson.cost = '';       //这三个字段是为了后面方便更改数据用
          bookJson.bookStore = '';
          bookJson.message = '' ;
           console.log(bookJson)
          // 存数据库
           const db = wx.cloud.database()
           const book =db.collection('mybook')
           db.collection('mybook').add({
             // data 字段表示需新增的 JSON 数据
             //个性化设置 书店价格评价！！！！！！！！！！！！！！！！
             data: bookJson
            }).then(res => {
               console.log(res)
             }).catch(err =>{
               console.log(err)
             })
         },
         fail:err =>{
           console.log(err)
         }
        })
      },
      fail : err => {
        console.log("识别失败",err)
      }
    })
  }
})