// pages/bookAddNote/bookAddNote.js
import Toast from '../../vant/toast/toast';
const db = wx.cloud.database();

Page({


  data: {

  },
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
  },

  formSubmit: function (e) {
    //保存数据
    this.addNote(e.detail.value);
    setTimeout(function () {//跳转到bookNote界面
      wx.navigateBack({
        delta: 1
      });},1000)
 
  },
  formReset: function () {
    console.log('form发生了reset事件');
  },
  /*新添笔记*/
  addNote: function (value) {
    var noteJson = {} ;
    noteJson.title = value.title;
    noteJson.mood = value.mood;
    noteJson.content = value.content;
    noteJson.bookId = this.data.id;  //带上书本数据库的id
    var date = new Date();
    var dateFormat = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();  
    noteJson.time = dateFormat;

    console.log('保存数据',noteJson);
       const bookNote = db.collection('bookNote');
       db.collection('bookNote').add({
         data: noteJson
       }).then(res => {
         console.log(res);
         Toast.loading({
           type: 'success',
           message: '添加笔记成功',
           duration: 500
         });
        //  //跳转到bookNote界面
        //  wx.navigateBack({
        //    delta: 1
        //  });
       }).catch(err => {
         console.log(err)
       })
  }
})
