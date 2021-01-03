import themeMixin from '../../behaviors/theme'

Page({
  behaviors: [themeMixin],
  data: {
    value: 0,
  },
  onLoad() {
    this.setData({
      SetValue: this.SetValue.bind(this)
    })
  },
  SetValue(e, value) {
    this.setData({
      value,
    })
  }
})
