Page({
  data: {
    buttonColor: 'primary',
    disabled: true,
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
  }
})
