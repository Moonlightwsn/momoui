import themeMixin from '../../behaviors/theme'

Page({
  behaviors: [themeMixin],
  data: {
    badgeContent: 1,
    invisible: false,
    vertical: 'top',
    horizontal: 'right',
  },
  onLoad() {
    this.setData({
      HandleChange: this.HandleChange.bind(this),
      HandleChange2: this.HandleChange2.bind(this),
      HandleChange3: this.HandleChange3.bind(this),
    })
  },
  SetCount(e) {
    const {currentTarget: {dataset: {operation }}} = e
    if (operation === 'minus') {
      this.setData({badgeContent: this.data.badgeContent - 1})
    } else if (operation === 'plus') {
      this.setData({badgeContent: this.data.badgeContent + 1})
    }
  },
  HandleChange() {
    this.setData({
      invisible: !this.data.invisible,
    })
  },
  HandleChange2(vertical) {
    this.setData({vertical})
  },
  HandleChange3(horizontal) {
    this.setData({horizontal})
  },
})
