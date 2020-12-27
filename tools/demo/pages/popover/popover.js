import themeMixin from '../../behaviors/theme'

Page({
  behaviors: [themeMixin],
  data: {
    open1: false,
    open2: false,
    anchorOrigin1: {
      vertical: 'bottom',
      horizontal: 'center'
    },
    transformOrigin1: {
      vertical: 'top',
      horizontal: 'center',
    },
    anchorOrigin2: {
      vertical: 'top',
      horizontal: 'left',
    },
    transformOrigin2: {
      vertical: 'top',
      horizontal: 'left',
    },
    anchorReference: 'anchorEl',
    anchorPositionTop: 200,
    anchorPositionLeft: 20,
  },
  onLoad() {
    this.setData({
      onClose1: this.closePopover1.bind(this),
      onClose2: this.closePopover2.bind(this),
      changeAnchorReference: this.changeAnchorReference.bind(this),
      changeAnchorOriginVertical: this.changeAnchorOriginVertical.bind(this),
      changeAnchorOriginHorizontal: this.changeAnchorOriginHorizontal.bind(this),
      changeTransformOriginVertical: this.changeTransformOriginVertical.bind(this),
      changeTransformOriginHorizontal: this.changeTransformOriginHorizontal.bind(this),
    })
  },
  openPopover1() {
    this.setData({open1: true})
  },
  closePopover1() {
    this.setData({open1: false})
  },
  openPopover2() {
    this.setData({open2: true})
  },
  closePopover2() {
    this.setData({open2: false})
  },
  changeAnchorReference(checkedValue) {
    this.setData({
      anchorReference: checkedValue,
    })
  },
  changeAnchorOriginVertical(checkedValue) {
    this.setData({
      anchorOrigin2: {
        vertical: checkedValue,
        horizontal: this.data.anchorOrigin2.horizontal,
      },
    })
  },
  changeAnchorOriginHorizontal(checkedValue) {
    this.setData({
      anchorOrigin2: {
        horizontal: checkedValue,
        vertical: this.data.anchorOrigin2.vertical,
      },
    })
  },
  changeTransformOriginVertical(checkedValue) {
    this.setData({
      transformOrigin2: {
        vertical: checkedValue,
        horizontal: this.data.transformOrigin2.horizontal,
      },
    })
  },
  changeTransformOriginHorizontal(checkedValue) {
    this.setData({
      transformOrigin2: {
        horizontal: checkedValue,
        vertical: this.data.transformOrigin2.vertical,
      },
    })
  }
})
