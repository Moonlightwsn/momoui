Component({
  data: {
    menuItems: [{
      text: '发起群聊',
      icon: 'message',
      key: 'message',
    }, {
      text: '添加朋友',
      icon: 'user-add',
      key: 'user-add',
    }, {
      text: '扫一扫',
      icon: 'scan',
      key: 'scan',
    }, {
      text: '收付款',
      icon: 'pay',
      key: 'pay',
    }],
  },
  methods: {
    itemClick(e) {
      const {detail: {key}} = e
      console.log('itemClick', key)
    },
  }
})
