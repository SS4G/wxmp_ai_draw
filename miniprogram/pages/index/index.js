// index.js
// const app = getApp()
const { envList } = require('../../envList.js');

Page({
  data: {
    has_rsp: false,
    rsp_text: "null"
  },
  onClick() {
    wx.cloud.callFunction(
      {
        name: "httpcall",
        //data: {"url": "https://www.baidu.com"},
        data: {"url": "http://crossentropy.asia:12321/test"},
        success(res) {
          console.log("aaa")
          var result_text = res["result"]
          if (result_text.length > 0) {
            console.log("got msg")
            this.setData(
              {
                has_rsp: true,
                rsp_text: result_text
              }
            )
          }
          console.log(res)
        },
        fail(e) {
          console.log("fail")
        }
    })
  }
});
