// index.js
// const app = getApp()
const { envList } = require('../../envList.js');

Page({
  data: {
    has_rsp: false,
    rsp_text: "null"
  },

  onShareAppMessage: function( options ){
    var that = this;
    // 设置菜单中的转发按钮触发转发事件时的转发内容
    var shareObj = {
      title: "最聪明的人工智能聊天机器人",    // 默认是小程序的名称(可以写slogan等)
      path: '/pages/index/index',    // 默认是当前页面，必须是以‘/'开头的完整路径
      imageUrl: '../../imgs/gptavtar.png',   //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
    };
    // 返回shareObj
    return shareObj;
  },

  toChatRoom: function(e) {
    console.log("toChatRoom")
    /*wx.cloud.callFunction(
    {
        name: "simple_test",
        data: {"a": 1, "b": 2},
        success(res) {
          console.log("result_text", res)
        },
        fail(e) {
          console.log("error", e)
        }
    })*/
    wx.navigateTo({
      url: '../chatroomPage/chatroom'//实际路径要写全
    })
  },

  questionForm: function(e) {
    var that = this
    const question = e.detail.value.question//.question // 获取输入框输入的文本值
    console.log('输入框输入的文本值：', question)
    // TODO：接下来可以对 inputValue 进行处理或保存
    wx.cloud.callFunction(
      {
        name: "httpcall",
        //data: {"url": "https://www.baidu.com"},
        //data: {"url": "http://crossentropy.asia:12321/test"},
        data: {"url": "http://crossentropy.asia:12321/question", "question": question},
        success(res) {
          var result_text = res["result"]
          console.log("result_text", result_text)
          if (result_text.length > 0) {
            that.setData({has_rsp: true, rsp_text: result_text})
          }
        },
        fail(e) {
          console.log(e)
          console.log("get response fail", e)
        }
    })
  }
});
