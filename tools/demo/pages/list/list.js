import themeMixin from '../../behaviors/theme'

Page({
  behaviors: [themeMixin],
  data: {
    open: false,
    dense: false,
    secondary: false,
    selectedIndex: 0,
  },
  onLoad() {
    this.setData({
      onChangeDense: this.onChangeDense.bind(this),
      onChangeSecondary: this.onChangeSecondary.bind(this),
    })
  },
  handleTap() {
    this.setData({
      open: !this.data.open,
    })
  },
  handleSelect(e) {
    const {dataset: {index}} = e.currentTarget
    if (typeof index === 'number') {
      this.setData({selectedIndex: index})
    }
  },
  onChangeDense(checked) {
    this.setData({
      dense: !this.data.dense,
    })
  },
  onChangeSecondary() {
    this.setData({
      secondary: !this.data.secondary,
    })
  },
})
