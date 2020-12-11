import themeMixin from '../../behaviors/theme'

Page({
  behaviors: [themeMixin],
  data: {
    value: 1,
    range: [{key: 'a'}, {key: 'b'}],
    disabled: true,
    color: 'secondary',
    size: 'medium',
    focus: true,
    checkboxValue: ['c1'],
    radioValue: 'r2',
    invisible: false,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'center',
    },
    overlap: 'rectangle',
    badgeVariant: 'standard',
    open: true,
    avatar: {
      icon: 'pictures',
      src: 'https://i0.hdslb.com/bfs/face/fbf1064cea4c3356282b53c93fbbd750adb0c5a1.jpg@68w_68h.webp'
    },
    avatar2: {
      icon: 'user',
    },
    listChecked: {
      0: false,
      1: false,
      2: true,
      3: false,
    },
  },
  onLoad() {
    this.setData({
      onCheckboxChange: this.onCheckboxChange.bind(this),
      onRadioChange: this.onRadioChange.bind(this),
      secondaryAction: {
        icon: 'trash',
        color: 'primary',
        action: this.secondaryAction.bind(this),
        longpress: this.secondaryLongpress.bind(this),
      },
      chipClick: this.chipClick.bind(this),
      chipDelete: this.chipDelete.bind(this),
      onOpen: this.onOpen.bind(this),
      onClose: this.onClose.bind(this),
    })
  },
  getPhoneNumber(e) {
    console.log(e)
  },
  secondaryAction(e) {
    console.log('secondaryAction', this, e)
  },
  secondaryLongpress(e) {
    console.log('secondaryLongpress', this, e)
  },
  listItemTap(e) {
    const {currentTarget: {dataset: {index}} = {}} = e || {}
    const {listChecked} = this.data
    const newListChecked = {
      ...listChecked,
      [index]: !listChecked[index],
    };
    this.setData({
      listChecked: newListChecked,
    })
  },
  onOpen() {
    this.setData({open: true})
  },
  onClose() {
    this.setData({open: false})
  },
  setOpen() {
    this.setData({open: !this.data.open})
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
  change(e) {
    this.setData({value: e.detail.value})
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
  },
  test() {
    console.log(this.data)
  },
  chipClick() {
    console.log('click chip')
  },
  chipDelete() {
    console.log('clip delete')
  }
})
