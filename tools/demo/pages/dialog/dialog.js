import themeMixin from '../../behaviors/theme'

Page({
  behaviors: [themeMixin],
  data: {
    open: false,
    selectedValue: 'username@gmail.com',
    emails: ['username@gmail.com', 'user02@gmail.com'],
    open2: false,
    open3: false,
  },
  onLoad() {
    this.setData({
      CloseDialog: this.CloseDialog.bind(this),
      CloseDialog2: this.CloseDialog2.bind(this),
      CloseDialog3: this.CloseDialog3.bind(this),
    })
  },
  OpenDialog() {
    this.setData({open: true})
  },
  CloseDialog() {
    this.setData({open: false})
  },
  HandleListItemTap(e) {
    const {dataset: {email = ''} = {}} = e.currentTarget
    this.setData({selectedValue: email})
    this.CloseDialog()
  },
  OpenDialog2() {
    this.setData({open2: true})
  },
  CloseDialog2() {
    this.setData({open2: false})
  },
  OpenDialog3() {
    this.setData({open3: true})
  },
  CloseDialog3() {
    this.setData({open3: false})
  },
})
