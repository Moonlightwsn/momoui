Page({
  data: {
    disabled: true,
    color: 'secondary',
    size: 'medium',
  },
  trigger() {
    this.setData({
      disabled: !this.data.disabled,
      size: this.data.size === 'medium' ? 'small' : 'medium',
      color: this.data.color === 'primary' ? 'secondary' : 'primary',
    })
  }
})
