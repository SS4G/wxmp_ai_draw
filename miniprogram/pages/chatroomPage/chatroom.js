// 获取全局APP
const app = getApp();
const botAvatar = "https://6d69-mini-program1-6gs2uj9nf2b87c9e-1302984141.tcb.qcloud.la/chatgpt_imgs/gptavtar.png?sign=6dfe4caccddf280f3288a1169516a267&t=1679670708"
const humanAvatar = "https://6d69-mini-program1-6gs2uj9nf2b87c9e-1302984141.tcb.qcloud.la/chatgpt_imgs/human.jpg?sign=a562c57bd56f4569719f22a5c428f280&t=1679671246"
// 获取计时器函数
Page({
  /**
   * 页面的初始数据
   */
  data: {
    login: false,
    //输入框距离
    InputBottom: 0,
    roomId: 1,
    userInfo: {},
    content: '',
    gptAnswer: "null",
    itemIndex: 2,
    groups: [{
      text: '点歌',
      value: 1
    },]
  },
  InputFocus(e) {
    this.setData({
      InputBottom: e.detail.height
    })
  },
  InputBlur(e) {
    this.setData({
      InputBottom: 0
    })
  },

  /*
  function askChatgpt(question) {
    var that = this
    console.log('question', question)
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
            that.data.gptAnswer = result_text
            //that.setData({has_rsp: true, rsp_text: result_text})
          }
        },
        fail(e) {
          console.log("get response fail")
        }
    })
  },*/

  async submit() {
    var that = this;
    //已登录用户
    wx.showLoading({
      title: '信息发送',
    })
    const cht = app.globalData.cht
    const content = that.data.content
    that.data.itemIndex += 1
    console.log(cht.data.chatList.push({
      "type": "man",
      "content": that.data.content,
      "avatarUrl":humanAvatar,
      "index": that.data.itemIndex
    }))

    cht.setData({
      chatList: cht.data.chatList,
      scrollId: "msg-" + that.data.itemIndex
    })
    that.setData({
      content: ''
    })
    wx.hideLoading();

    console.log("q:", content)
     
    var question = content
    console.log('question', question)
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
            that.data.gptAnswer = result_text
          }
          that.data.itemIndex += 1
          cht.data.chatList.push({
            "type": "rob",
            "content": that.data.gptAnswer,
            "avatarUrl":botAvatar,
            "index": that.data.itemIndex
          })
          console.log("that.data.itemIndex=", that.data.itemIndex)
          cht.setData({
            chatList: cht.data.chatList,
            scrollId: "msg-" + that.data.itemIndex
          })
        },
        fail(e) {
          console.log(e)
          console.log("get response fail")
        }
    })
  },
})