import themeMixin from '../../behaviors/theme'

Page({
  behaviors: [themeMixin],
  data: {
    disabled: true,
    color: 'secondary',
    size: 'medium',
    focus: true,
  },
  trigger() {
    this.setData({
      disabled: !this.data.disabled,
      size: this.data.size === 'medium' ? 'small' : 'medium',
      color: this.data.color === 'primary' ? 'secondary' : 'primary',
    })
  },
  submit(e) {
    console.log(e)
  }
})
