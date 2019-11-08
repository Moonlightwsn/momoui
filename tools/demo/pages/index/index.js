Page({
  data: {
    checked: true,
  },
  checkboxChange() {
    const {checked} = this.data
    this.setData({
      checked: !checked,
    })
  },
})
