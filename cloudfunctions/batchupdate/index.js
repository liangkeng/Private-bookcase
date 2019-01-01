const cloud = require('wx-server-sdk')
cloud.init({})
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  try {
    return await db.collection('mybook').where({
      _openid: "oYWa94rJdchQyX3r6x83QwMm0CYY"
    })
      .update({
        data: {
          price: "100元"
        },
      })
  } catch (e) {
    console.error(e)
  }
}

// 控制台调用wx.cloud.callFunction({ name: "batchupdate", compete: res => console.log(res) })
