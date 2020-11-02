import themeMixin from '../../behaviors/theme'

Page({
  behaviors: [themeMixin],
  data: {
    checked: false,
  },
  triggle: function (e) {
    const {detail: {checked}} = e
    console.log(checked)
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