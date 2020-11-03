import themeMixin from '../../behaviors/theme'

Page({
  behaviors: [themeMixin],
  data: {
    checked: false,
  },
  change(event) {
    console.log(event)
  },
  trigger(event) {
    const {checked} = event.detail || {}
    this.setData({
      checked,
    })
  },
  submit(event) {
    console.log(event)
  },
  reset(event) {
    console.log(event)
  }
})