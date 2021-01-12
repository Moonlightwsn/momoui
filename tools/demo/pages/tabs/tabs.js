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
  SetValue(e) {
    const {current} = e.detail
    this.setData({
      value: current,
    })
  },
  SetValue2(e) {
    const {current} = e.detail
    this.setData({
      value2: current,
    })
  },
})
