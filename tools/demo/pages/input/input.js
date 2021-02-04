import themeMixin from '../../behaviors/theme'

Page({
  behaviors: [themeMixin],
  data: {
    inputValue: 'Two-way binding',
    isPassword: true,
  },
  ShowPassword() {
    this.setData({
      isPassword: !this.data.isPassword,
    })
  }
})
