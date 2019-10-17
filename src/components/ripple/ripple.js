Component({
  data: {
    rippleList: [],
    width: 0,
    x: 0,
    y: 0,
  },
  methods: {
    stopRipple() {
      this.data.rippleList.shift()
      this.setData({
        rippleList: this.data.rippleList,
      })
    },
    ripple(e) {
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
        that.data.rippleList.push({
          width: rippleWidth,
          x: rippleX,
          y: rippleY,
        })
        console.log(that.data.rippleList)
        that.setData({
          rippleList: that.data.rippleList,
        })
      })
    }
  }
})
