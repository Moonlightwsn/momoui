module.exports = Behavior({
  data: {
    theme: 'light'
  },
  attached: function() {
    const app = getApp()
    this.themeChanged(app.momouiTheme)
    app.watchThemeChange && app.watchThemeChange(this.themeChanged)
  },
  detached: function() {
    const app = getApp()
    app.unWatchThemeChange && app.unWatchThemeChange(this.themeChanged)
  },
  methods: {
    themeChanged(theme) {
      this.setData({
        theme
      })
    }
  }
})