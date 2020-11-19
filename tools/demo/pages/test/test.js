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
  }
})
