Page({
  data: {
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
  testTap(e) {
    console.log('testTap', e)
  },
  testLongPress(e) {
    console.log('testLongPress', e)
  },
  test2(e) {
    console.log('test2', e.detail.value)
  },
  testswitch(e) {
    console.log('testswitch', e.detail.checked)
  },
  buttonTapTest(e) {
    console.log('buttonTapTest', e)
    this.setData({ buttonLoading: true });
    setTimeout(() => {
      this.setData({ buttonLoading: false })
    }, 3000);
  }
})
