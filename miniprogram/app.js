// app.js
App({
  globalData: {
    systemInfo: null,
    windowHeight: null, // rpx换算px后的窗口高度
    screenHeight: null, // rpx换算px后的屏幕高度
  },
  onLaunch: function () {
    wx.getSystemInfo({
      success: res => {
          this.globalData.systemInfo = res
          this.globalData.windowHeight = res.windowHeight /(res.windowWidth /750)
          this.globalData.screenHeight = res.screenHeight /(res.screenWidth /750)
      }
    })
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        //env: cloud.DYNAMIC_CURRENT_ENV,// 'gpt-cloud-4g0i66ey01a69ba4',
        traceUser: true,
      });
    }

    this.globalData = {};
  }
});
