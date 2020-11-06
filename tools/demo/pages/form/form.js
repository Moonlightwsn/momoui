import themeMixin from '../../behaviors/theme'

Page({
  behaviors: [themeMixin],
  data: {
    checked: true,
    size: 'medium',
    checkedValue: ['A', 'B'],
    input: 'Hello world',
  },
  showInput() {
    console.log(this.data.input, this.data.checked)
  },
  test(event) {
    const {checkedValue} = event.detail
    console.log('form page', checkedValue)
    this.setData({
      checkedValue
    })
  },
  radioChange(event) {
    console.log(event.detail)
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