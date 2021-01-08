import themeMixin from '../../behaviors/theme'

Page({
  behaviors: [themeMixin],
  data: {
    open: false,
  },
  handleTap() {
    this.setData({
      open: !this.data.open,
    })
  }
})
