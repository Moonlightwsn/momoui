import themeMixin from '../../behaviors/theme'

Page({
  behaviors: [themeMixin],
  data: {
    checked: true,
  },
  onLoad() {
    this.setData({
      HandleChange: this.HandleChange.bind(this),
    })
  },
  HandleChange(checked) {
    this.setData({checked})
  },
})
