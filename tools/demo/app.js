const themeListeners = []

App({
  onLaunch: function() {
    wx.getSystemInfo({
      success: (sysinfo) => {
        if (sysinfo && sysinfo.theme) {
          this.momouiTheme = sysinfo.theme;
        }
      },
    })
  },
  onThemeChange: function(obj) {
    if (obj && obj.theme) {
      this.momouiTheme = obj.theme;
      themeListeners.forEach((listener) => {
        listener(obj.theme)
      })
    }
  },
  watchThemeChange(listener) {
    if (themeListeners.indexOf(listener) < 0) {
        themeListeners.push(listener)
    }
  },
  unWatchThemeChange(listener) {
    const index = themeListeners.indexOf(listener)
    if (index > -1) {
        themeListeners.splice(index, 1)
    }
  },
  momouiRootPath: '/',
  momouiTheme: 'light'
})
