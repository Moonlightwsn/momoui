Component({
  data: {
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
  },
  methods: {
    bnchange(e) {
      const {detail: {key}} = e
      this.setData({activeKey: key})
    },
  }
})
