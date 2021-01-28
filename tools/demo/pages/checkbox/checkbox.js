import themeMixin from '../../behaviors/theme'

Page({
  behaviors: [themeMixin],
  data: {
    checked: true,
    error: true,
    groupValue: ['gilad'],
  },
  onLoad() {
    this.setData({
      HandleChange: this.HandleChange.bind(this),
      HandleGroupChange: this.HandleGroupChange.bind(this),
    })
  },
  HandleChange(checked) {
    this.setData({checked})
  },
  HandleGroupChange(values) {
    this.setData({
      groupValue: values,
      error: values.filter(v => v).length !== 2,
    })
  }
})
