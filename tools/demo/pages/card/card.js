import themeMixin from '../../behaviors/theme'

Page({
  behaviors: [themeMixin],
  data: {
    open: false,
  },
  handleExpandTap() {
    this.setData({
      open: !this.data.open,
    })
  }
})
