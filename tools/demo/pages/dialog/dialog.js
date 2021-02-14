import themeMixin from '../../behaviors/theme'

Page({
  behaviors: [themeMixin],
  data: {
    open: false,
    selectedValue: 'username@gmail.com',
    emails: ['username@gmail.com', 'user02@gmail.com'],
    open2: false,
    open3: false,
    open4: false,
    open5: false,
    open6: false,
    open7: false,
    maxWidth: 'sm',
    maxWidthRange: [{
      key: false,
      value: 'false',
    }, {
      key: 'xs',
      value: 'xs'
    }, {
      key: 'sm',
      value: 'sm'
    }, {
      key: 'md',
      value: 'md'
    }, {
      key: 'lg',
      value: 'lg'
    }, {
      key: 'xl',
      value: 'xl'
    }],
    fullWidth: true,
    dialogTexts: new Array(50),
    scroll: 'paper',
  },
  onLoad() {
    this.setData({
      CloseDialog: this.CloseDialog.bind(this),
      CloseDialog2: this.CloseDialog2.bind(this),
      CloseDialog3: this.CloseDialog3.bind(this),
      CloseDialog4: this.CloseDialog4.bind(this),
      CloseDialog5: this.CloseDialog5.bind(this),
      CloseDialog6: this.CloseDialog6.bind(this),
      CloseDialog7: this.CloseDialog7.bind(this),
      HandleFullWidthChange: this.HandleFullWidthChange.bind(this),
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
  OpenDialog4() {
    this.setData({open4: true})
  },
  CloseDialog4() {
    this.setData({open4: false})
  },
  OpenDialog5() {
    this.setData({open5: true})
  },
  CloseDialog5() {
    this.setData({open5: false})
  },
  OpenDialog6() {
    this.setData({open6: true})
  },
  CloseDialog6() {
    this.setData({open6: false})
  },
  OpenDialog7(e) {
    this.setData({open7: true, scroll: e.target.dataset.scroll})
  },
  CloseDialog7() {
    console.log(1314)
    this.setData({open7: false})
  },
  HandleFullWidthChange(checked) {
    this.setData({fullWidth: checked})
  },
  HandleMaxWidthChange(e) {
    this.setData({
      maxWidth: e.detail.value,
    })
  },
})
