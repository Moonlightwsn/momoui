import themeMixin from '../../behaviors/theme'

Page({
  behaviors: [themeMixin],
  data: {
    open: false,
  },
  onLoad() {
    this.setData({
      Close: this.Close.bind(this),
    })
  },
  Open() {
    this.setData({open: true})
  },
  Close() {
    this.setData({open: false})
  }
})
