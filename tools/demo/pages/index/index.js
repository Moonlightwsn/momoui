import themeMixin from '../../behaviors/theme'

Page({
  behaviors: [themeMixin],
  data: {
    buttonColor: 'primary',
    disabled: true,
  },
  gototestpage() {
    wx.redirectTo({ url: '/pages/grid/grid' })
  },
  changeButtonColor() {
    console.log('changeButtonColor')
    const {buttonColor} = this.data
    let newButtonColor
    if (buttonColor === 'primary') {
      newButtonColor = 'secondary'
    } else {
      newButtonColor = 'primary'
    }
    this.setData({
      buttonColor: newButtonColor
    })
  },
  changeDisabled() {
    console.log('changeDisabled')
    const {disabled} = this.data
    this.setData({
      disabled: !disabled
    })
  },
  testLongPress() {
    console.log('testLongPress')
  }
})
