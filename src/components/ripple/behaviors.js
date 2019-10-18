import {debounce} from '../utils/utils'

const regexp = /(\b[0-9]{1,3}\b)/g

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
    ripplelongpress: false,
  },
  methods: {
    stopRipple: debounce(function () {
      if (!this.data.ripplelongpress) {
        this.setData({
          rippleList: [],
          rippleListInitKey: 0,
        })
      }
    }, 1000),
    rippleHoldEnd() {
      if (this.data.ripplelongpress) {
        const that = this
        setTimeout(function () {
          that.setData({
            rippleList: [],
            rippleListInitKey: 0,
            ripplelongpress: false,
          })
        }, 200)
      }
    },
    rippleHold(e) {
      this.setData({
        ripplelongpress: true,
      })
      const {x, y} = e.detail
      this._ripple({
        x,
        y
      }, 'hold')
    },
    rippleClick(e) {
      const {x, y} = e.detail
      this._ripple({
        x,
        y
      }, 'click')
    },
    _ripple(position, type) {
      const that = this
      const query = that.createSelectorQuery()
      query.select('.mui-ripple-view').fields({
        size: true,
        rect: true,
        computedStyle: ['backgroundColor']
      })
      query.selectViewport().scrollOffset()
      query.exec(function (res) {
        const [view, viewPort] = res
        const boxWidth = parseInt(view.width, 10)
        const boxHeight = parseInt(view.height, 10)
        const rippleWidth = boxWidth > boxHeight ? boxWidth : boxHeight
        const rippleX = (position.x - (view.left + viewPort.scrollLeft)) - (rippleWidth / 2)
        const rippleY = (position.y - (view.top + viewPort.scrollTop)) - (rippleWidth / 2)
        const rippleBackgroundColor = that.rippleBackgroundColor || (that._highBrightnessColor(view.backgroundColor) ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)')
        that.data.rippleListInitKey += 1
        that.data.rippleList.push({
          width: rippleWidth,
          x: rippleX,
          y: rippleY,
          backgroundColor: rippleBackgroundColor,
          key: that.data.rippleListInitKey,
          rippleClass: type === 'hold' ? 'mui-ripple-animation-hold' : 'mui-ripple-animation'
        })
        that.setData({
          rippleList: that.data.rippleList,
        })
      })
    },
    _highBrightnessColor(color) {
      const [r, g, b, a = 1] = color.match(regexp)
      return (
        (parseInt(r, 10) * 0.299 +
        parseInt(g, 10) * 0.578 +
        parseInt(b, 10) * 0.114) >= (192 * a)
      )
    }
  }
})
