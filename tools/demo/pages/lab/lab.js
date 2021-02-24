Page({
  data: {
    open: false,
  },
  onLoad() {
    this.setData({open: true, Close: this.Close.bind(this)})
  },
  Close() {
    this.setData({open: false})
  },
  Open() {
    this.setData({open: true})
  }
})