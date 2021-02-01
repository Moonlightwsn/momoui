import themeMixin from '../../behaviors/theme'

Page({
  behaviors: [themeMixin],
  data: {
    checked1: true,
    checked2: true,
  },
  onLoad() {
    this.setData({
      Change1: this.Change1.bind(this),
      Change2: this.Change2.bind(this),
    })
  },
  Change1(checked) {
    this.setData({checked1: checked})
  },
  Change2(checked) {
    this.setData({checked2: checked})
  },
})
