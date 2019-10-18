import {debounce} from '../utils/utils'

export default Behavior({
  properties: {
    ripple: {
      type: Boolean,
      value: true
    }
  },
  data: {
    rippleList: [],
    rippleListInitKey: 0,
  },
  methods: {
    stopRipple: debounce(function () {
      this.setData({
        rippleList: [],
        rippleListInitKey: 0,
      })
    }, 1500),
    rippleClick(e) {
      console.log(111, e)
      const that = this
      const query = that.createSelectorQuery()
      query.select('.mui-ripple-view').boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec(function (res) {
        const [view, viewPort] = res
        const boxWidth = parseInt(view.width, 10)
        const boxHeight = parseInt(view.height, 10)
        const rippleWidth = boxWidth > boxHeight ? boxWidth : boxHeight
        const rippleX = (e.detail.x - (view.left + viewPort.scrollLeft)) - (rippleWidth / 2)
        const rippleY = (e.detail.y - (view.top + viewPort.scrollTop)) - (rippleWidth / 2)
        that.data.rippleListInitKey += 1
        that.data.rippleList.push({
          width: rippleWidth,
          x: rippleX,
          y: rippleY,
          key: that.data.rippleListInitKey
        })
        that.setData({
          rippleList: that.data.rippleList,
        })
      })
    }
  }
})
