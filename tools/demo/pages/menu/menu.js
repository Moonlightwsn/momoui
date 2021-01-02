import themeMixin from '../../behaviors/theme'

Page({
  behaviors: [themeMixin],
  data: {
    open: false,
    open2: false,
    options: [
      'Show some love to Material-UI',
      'Show all notification content',
      'Hide sensitive notification content',
      'Hide all notification content',
    ],
    secondaryIndex: 0,
  },
  onLoad() {
    this.setData({
      onClose: this.onClose.bind(this),
      onClose2: this.onClose2.bind(this),
    })
  },
  OpenMenu() {
    this.setData({
      open: true,
    })
  },
  OpenMenu2() {
    this.setData({
      open2: true,
    })
  },
  onClose() {
    this.setData({
      open: false,
    })
  },
  onClose2() {
    this.setData({
      open2: false,
    })
  },
  selectOption(e) {
    const {index} = e.target.dataset
    this.setData({
      secondaryIndex: index,
      open2: false,
    })
  },
})
