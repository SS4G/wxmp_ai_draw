// index.js
// const app = getApp()
const { envList } = require('../../envList.js');
const WAITING_IMAGE_URL = "../../imgs/waiting.gif"
Page({
  data: {
    promote: '',
    has_rsp: false,
    rsp_image_url: WAITING_IMAGE_URL //../../imgs/waiting.gif "../../imgs/waiting.gif"
  },

  onShareTimeline: function(options) {
    var that = this;
    // 设置菜单中的转发按钮触发转发事件时的转发内容
    var shareObj = {
      title: "智能绘画小工具",    // 默认是小程序的名称(可以写slogan等)
      path: '/pages/index/index',    // 默认是当前页面，必须是以‘/'开头的完整路径
      imageUrl: '../../imgs/gptavtar.png',   //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
    };
    // 返回shareObj
    return shareObj;
  },

  onShareAppMessage: function( options ){
    var that = this;
    // 设置菜单中的转发按钮触发转发事件时的转发内容
    var shareObj = {
      title: "智能绘画小工具",    // 默认是小程序的名称(可以写slogan等)
      path: '/pages/index/index',    // 默认是当前页面，必须是以‘/'开头的完整路径
      imageUrl: '../../imgs/gptavtar.png',   //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
    };
    // 返回shareObj
    return shareObj;
  },
 handleChange: function(e) {
   //console.log("changed", e.detail.detail.value)
   var total_text = e.detail.detail.value
   console.log("total_text", total_text)
   this.setData({
    promote: total_text
   })
 },
 handleClick: function(e) {
    //const promote = e.detail.value.question//.question // 获取输入框输入的文本值
    console.log('输入框输入的文本值：', this.data.promote)
    // TODO：接下来可以对 inputValue 进行处理或保存
    
    var that = this
    console.log("cloud func called")
    that.setData({has_rsp: true, rsp_image_url: WAITING_IMAGE_URL})
    wx.cloud.callFunction(
      {
        name: "httpcall",
        data: {"url": "https://crossentropy.asia/api/image", "promote": this.data.promote},
        success(res) {
          console.log("cloud func success res.result.data=", res)
          var resultObj = JSON.parse(res.result)
          if (resultObj.code === 0) {
            var result_image_url = resultObj.data
            console.log("res=", res)
            console.log("result_image_url=", result_image_url)
            that.setData({has_rsp: true, rsp_image_url: result_image_url})
          } else {
            that.setData({has_rsp: false})
          }
        },
        fail(e) {
          console.log(e)
          console.log("get response fail", e)
        }
    })
    console.log("cloud func called done")
  }
});
