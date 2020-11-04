import themeMixin from '../../behaviors/theme'

Page({
  behaviors: [themeMixin],
  data: {
    checked: false,
    size: 'small',
  },
  test(event) {
    console.log('test', event.detail.checkedValue)
  },
  change(event) {
    console.log('form page change', event)
  },
  trigger(event) {
    const {checked} = event.detail || {}
    this.setData({
      checked,
    })
  },
  changeSize() {
    this.setData({
      size: this.data.size === 'small' ? 'medium' : 'small',
    })
  },
  submit(event) {
    console.log(event)
  },
  reset(event) {
    console.log(event)
  }
})