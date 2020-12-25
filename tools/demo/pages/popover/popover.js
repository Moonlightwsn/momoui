import themeMixin from '../../behaviors/theme'

Page({
  behaviors: [themeMixin],
  data: {
    open: false,
  },
  onLoad() {
    this.setData({
      onClose: this.closePopover.bind(this)
    })
  },
  openPopover() {
    this.setData({open: true})
  },
  closePopover() {
    this.setData({open: false})
  }
})
