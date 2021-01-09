import themeMixin from '../../behaviors/theme'

Page({
  behaviors: [themeMixin],
  data: {
    open: false,
    dense: false,
    secondary: false,
    selectedIndex: 0,
    checked: {
      0: true,
      1: false,
      2: false,
      3: false,
    },
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
  handleSecondaryActionTap(e) {
    console.log(e)
  },
  handleToggle(e) {
    const {dataset: {index}} = e.currentTarget
    const {checked} = this.data
    const newChecked = {
      ...checked,
      [index]: !checked[index],
    };
    this.setData({
      checked: newChecked,
    })
  },
  onChangeDense() {
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
