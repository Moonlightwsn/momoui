import themeMixin from '../../behaviors/theme'

Page({
  behaviors: [themeMixin],
  data: {
    value: 0,
    value2: 'one',
  },
  onLoad() {
    this.setData({
      SetValue: this.SetValue.bind(this),
      SetValue2: this.SetValue2.bind(this)
    })
  },
  SetValue(e, value) {
    this.setData({
      value,
    })
  },
  SetValue2(e, value) {
    this.setData({
      value2: value,
    })
  },
})
