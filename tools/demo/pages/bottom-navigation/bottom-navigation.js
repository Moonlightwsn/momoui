import themeMixin from '../../behaviors/theme'

Page({
  behaviors: [themeMixin],
  data: {
    value: 0,
    icon: 'heart',
    test: true,
  },
  onLoad() {
    this.setData({
      SetValue: this.SetValue.bind(this)
    })
  },
  SetValue(e) {
    const {current} = e.detail
    this.setData({
      value: current,
    })
  },
  test() {
    this.setData({
      test: !this.data.test,
    })
  }
})
