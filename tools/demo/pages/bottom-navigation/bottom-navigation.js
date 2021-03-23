import themeMixin from '../../behaviors/theme'

Page({
  behaviors: [themeMixin],
  data: {
    value: 0,
    icon: 'heart',
    test: true,
    height: 80,
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
  },
  drawerTest() {
    this.setData({
      height: this.data.height === 80 ? 300 : 80,
    })
  },
  bindinputfocus() {
    console.log('input focus')
  },
  bindinputblur() {
    console.log('input blur')
  },
  bindtextareafocus() {
    console.log('text focus')
  },
  bindtextareablur() {
    console.log('text blur')
  },
})
