import themeMixin from '../../behaviors/theme'

Page({
  behaviors: [themeMixin],
  data: {
    openMenu: false,
    openMenu2: false,
    openMenu3: false,
    openMenu4: false,
    auth: true,
    searchInputFocus: false,
  },
  onLoad() {
    this.setData({
      CloseMenu: this.CloseMenu.bind(this),
      CloseMenu2: this.CloseMenu2.bind(this),
      CloseMenu3: this.CloseMenu3.bind(this),
      CloseMenu4: this.CloseMenu4.bind(this),
      changeAuth: this.changeAuth.bind(this),
      inputFocusOrBlur: this.inputFocusOrBlur.bind(this),
    })
  },
  OpenMenu() {
    this.setData({openMenu: true})
  },
  CloseMenu() {
    this.setData({openMenu: false})
  },
  OpenMenu2() {
    this.setData({openMenu2: true})
  },
  CloseMenu2() {
    this.setData({openMenu2: false})
  },
  OpenMenu3() {
    this.setData({openMenu3: true})
  },
  CloseMenu3() {
    this.setData({openMenu3: false})
  },
  OpenMenu4() {
    this.setData({openMenu4: true})
  },
  CloseMenu4() {
    this.setData({openMenu4: false})
  },
  changeAuth() {
    this.setData({auth: !this.data.auth})
  },
  inputFocusOrBlur(e) {
    if (e.type === 'focus') {
      this.setData({searchInputFocus: true})
    } else if (e.type === 'blur') {
      this.setData({searchInputFocus: false})
    }
  },
})
