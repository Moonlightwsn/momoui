Page({
  data: {
    menuItems: [{
      text: 'Profile',
    }, {
      text: 'My Account',
    }, {
      text: 'Logout',
    }],
    activeKey: 'wechat',
    actions: [{
      key: 'wechat',
      title: '微信',
      icon: 'message',
    }, {
      key: 'address',
      title: '通讯录',
      icon: 'address-book',
    }, {
      key: 'browser',
      title: '发现',
      icon: 'browser',
    }, {
      key: 'user',
      title: '我',
      icon: 'user',
    }],
    buttonLoading: false,
    checked: true,
    checkedboxList: [{
      key: 1,
      value: 'test1',
      color: 'default',
      label: 'check1',
      checked: true,
    }, {
      key: 2,
      value: 'test2',
      color: 'primary',
      label: 'check2',
      checked: true,
    }, {
      key: 3,
      value: 'test3',
      color: 'secondary',
      label: 'check3',
      checked: true,
    }],
  },
  bnchange(e) {
    const {detail: {key}} = e
    this.setData({activeKey: key})
  },
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.values)
  },
  formReset() {
    console.log('form发生了reset事件')
  }
})
