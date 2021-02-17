import themeMixin from '../../behaviors/theme'

Page({
  behaviors: [themeMixin],
  data: {
    open: false,
    formValues: [],
  },
  onLoad() {
    this.setData({
      Close: this.Close.bind(this),
    })
  },
  Close() {
    this.setData({
      open: false,
      formValues: [],
    })
  },
  Submit(e) {
    const formValues = Object.keys(e.detail.value).map(key => {
      return {
        key,
        value: e.detail.value[key]
      }
    })
    this.setData({
      open: true,
      formValues,
    })
  },
})