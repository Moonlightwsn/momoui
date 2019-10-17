import {debounce} from '../utils/utils'

Component({
  data: {
    rippleList: [],
    rippleListInitKey: 0,
    width: 0,
    x: 0,
    y: 0,
  },
  methods: {
    stopRipple: debounce(function () {
      this.setData({
        rippleList: [],
        rippleListInitKey: 0,
      })
    }, 1500),
    Click(e) {
      const that = this
      const query = this.createSelectorQuery()
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
