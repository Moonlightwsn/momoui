import themeMixin from '../../behaviors/theme'

Page({
  behaviors: [themeMixin],
  data: {
    width: 180,
    width2: 180,
    width3: 57,
    open2: false,
    open3: false,
    anchor: 'left',
  },
  onLoad() {
    this.setData({
      Close: this.Close.bind(this),
    })
  },
  Open(e) {
    const {target: {dataset: {anchor = 'left'}}} = e
    this.setData({open: true, anchor})
  },
  Close() {
    this.setData({open: false})
  },
  Open2() {
    this.setData({open2: true})
  },
  Close2() {
    this.setData({open2: false})
  },
  Open3() {
    this.setData({open3: true, width3: 180})
  },
  Close3() {
    this.setData({open3: false, width3: 57})
  },
})
