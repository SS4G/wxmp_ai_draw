// release/components/chatbox
const app = getApp();
// 时间工具类
const timeutil = require('./timeutil');
const cx = Component({
  /**
   * 组件的一些选项
   */
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    roomId: {
      type: Number,
      observer: function (newVal, oldVal) {
        if (newVal != undefined && newVal != null) {
          // console.log(newVal)
        }

      }
    }
  },
  /**
   * 组件注册页面生命周期
   */
  pageLifetimes: {
    show: function () {
      // 页面被展示
    },
  },
  lifetimes: {
    attached() {
      var that = this;
      that.initMessageHistory();
      //初始化监听器
      // that.initWatcher();
      wx.getSystemInfo({
        success: function (res) {
          that.setData({
            systemInfo: res
          })
        }
      })
    },
    detached() {
      try {
      } catch (error) {
        console.log('--消息监听器关闭失败--')
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    
    openid: app.globalData.openid || wx.getStorageSync('openid'),
    scrollId: '',
    systemInfo: {},
    //消息记录列表
    chatList: [],
    //标记触顶事件
    isTop: false
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 预览图片
    viewImage(e) {
      // console.log(e)
      let url = e.currentTarget.dataset.url;
      wx.previewImage({
        urls: [url],
      })
    },
    //触顶事件
    tapTop() {
      console.log('--触顶--')
      var that = this;
      that.setData({
        isTop: true
      }, () => {
      })

    },
    //初始化
    initMessageHistory() {
      //初始化消息历史
      var that = this;
      app.globalData.cht = that

      that.setData({
        chatList: [
          {
            "type":"man",
            "avatarUrl":"https://6d69-mini-program1-6gs2uj9nf2b87c9e-1302984141.tcb.qcloud.la/chatgpt_imgs/human.jpg?sign=a562c57bd56f4569719f22a5c428f280&t=1679671246",   
            "content":"你好 智能助手",
            "index": 0
          },
          {
            "type":"robot",
            "avatarUrl":"https://6d69-mini-program1-6gs2uj9nf2b87c9e-1302984141.tcb.qcloud.la/chatgpt_imgs/gptavtar.png?sign=6dfe4caccddf280f3288a1169516a267&t=1679670708",
            "content":"我是智能助手 为了保证准确度 每条回答大约需要10秒生成 复杂问题需要更久的时间请耐心等待",
            "index": 1
          },
          {
            "type":"robot",
            "avatarUrl":"https://6d69-mini-program1-6gs2uj9nf2b87c9e-1302984141.tcb.qcloud.la/chatgpt_imgs/gptavtar.png?sign=6dfe4caccddf280f3288a1169516a267&t=1679670708",
            "content":"复杂问题回答内容较长, 可能需要更久的时间, 请耐心等待",
            "index": 2
          }
        ]
      })
    },
  }
})
