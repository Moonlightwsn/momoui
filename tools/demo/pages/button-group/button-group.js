import themeMixin from '../../behaviors/theme'

Page({
  behaviors: [themeMixin],
  data: {
    buttonGroupVariant: [
      'text',
      'outlined',
      'contained',
    ],
    buttonGroupColor: [
      'primary',
      'secondary',
      'default'
    ],
    buttonGroupSize: [
      'medium',
      'small',
      'large'
    ],
    colorIndex: 0,
    variantIndex: 0,
    sizeIndex: 0,
  },
  test() {
    console.log(this.data)
  },
  testColor() {
    this.setData({
      colorIndex: this.data.colorIndex >= 2 ? 0 : this.data.colorIndex + 1,
    })
  },
  testSize() {
    this.setData({
      sizeIndex: this.data.sizeIndex >= 2 ? 0 : this.data.sizeIndex + 1,
    })
  },
  testVariant() {
    this.setData({
      variantIndex: this.data.variantIndex >= 2 ? 0 : this.data.variantIndex + 1,
    })
  }
})
