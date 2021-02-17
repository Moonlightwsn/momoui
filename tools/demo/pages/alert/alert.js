import themeMixin from '../../behaviors/theme'

Page({
  behaviors: [themeMixin],
  data: {
    open: true,
  },
  onLoad() {
    this.setData({
      Close: this.Close.bind(this),
    })
  },
  Close(e, dataset) {
    console.log('close action')
    if (dataset.key === 'closeCollapse') {
      this.setData({
        open: false,
      })
    }
  },
  ReOpen() {
    this.setData({
      open: true,
    })
  }
})
