Page({
  data: {
    checked: true,
  },
  testTap(e) {
    console.log('testTap', e)
  },
  testLongPress(e) {
    console.log('testLongPress', e)
  },
  test2(e) {
    console.log('test2', e.detail.value)
  }
})
