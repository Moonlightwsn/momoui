import themeMixin from '../../behaviors/theme'

let timer

Page({
  behaviors: [themeMixin],
  data: {
    progress: 0,
    progress2: 0,
    progress2Buffer: 0,
    success: false,
    loading: false,
  },
  onLoad() {
    timer = setInterval(() => {
      this.setData({
        progress: (this.data.progress >= 100 ? 0 : (this.data.progress + 10))
      })
      if (this.data.progress2 > 100) {
        this.setData({
          progress2: 0,
          progress2Buffer: 10,
        })
      } else {
        const diff = Math.random() * 10
        const diff2 = Math.random() * 10
        this.setData({
          progress2: this.data.progress2 + diff,
          progress2Buffer: this.data.progress2 + diff + diff2,
        })
      }
    }, 500);
  },
  onUnload() {
    clearInterval(timer)
  },
  handleLoadingTap() {
    if (!this.data.loading) {
      this.setData({
        loading: true,
        success: false,
      })
      setTimeout(() => {
        this.setData({
          loading: false,
          success: true,
        })
      }, 3000)
    }
  },
})
