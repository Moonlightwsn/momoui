import themeMixin from '../../behaviors/theme'

Page({
  behaviors: [themeMixin],
  data: {
    disabled: true,
    color: 'secondary',
    size: 'medium',
    focus: true,
    checkboxValue: ['c1'],
    radioValue: 'r2',
    invisible: false,
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'right',
    },
    overlap: 'rectangle',
    badgeVariant: 'standard',
  },
  onLoad() {
    this.setData({
      onCheckboxChange: this.onCheckboxChange.bind(this),
      onRadioChange: this.onRadioChange.bind(this),
    })
  },
  trigger() {
    this.setData({
      disabled: !this.data.disabled,
      size: this.data.size === 'medium' ? 'small' : 'medium',
      color: this.data.color === 'primary' ? 'secondary' : 'primary',
    })
  },
  submit(e) {
    console.log(e.detail.value)
  },
  reset(e) {
    console.log(e)
  },
  onCheckboxChange(checkedValue) {
    this.setData({ checkboxValue: checkedValue })
  },
  onRadioChange(checkedValue) {
    this.setData({ radioValue: checkedValue })
  },
  showOrHideBadge() {
    this.setData({ invisible: !this.data.invisible })
  },
  changeOverlap() {
    this.setData({ overlap: this.data.overlap === 'rectangle' ? 'circle' : 'rectangle' })
  },
  changeVariant() {
    this.setData({ badgeVariant: this.data.badgeVariant === 'dot' ? 'standard' : 'dot' })
  },
  topRight() {
    this.setData({
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      }
    })
  },
  topLeft() {
    this.setData({
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'left',
      }
    })
  },
  bottomRight() {
    this.setData({
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right',
      }
    })
  },
  bottomLeft() {
    this.setData({
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
      }
    })
  }
})
