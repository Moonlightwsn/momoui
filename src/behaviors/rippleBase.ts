export default Behavior({
  properties: {
    disableRipple: {
      type: Boolean,
      value: false,
    },
    centerRipple: {
      type: Boolean,
      value: false,
    },
    rippleColor: {
      type: String,
      value: ''
    },
  },
  data: {
    _rippleList: [],
    _rpcStyle: {
      width: 0,
      height: 0,
      borderRadius: 0,
      radius: 0,
    },
  },
  methods: {
    _RippleAction(rippleParams) {
      const {disableRipple, disabled} = this.data
      if (!disableRipple && !disabled) {
        const {
          _rippleList,
          _rpcStyle,
          centerRipple,
        } = this.data
        const newData: any = {}
        const newRpcStyles = {}
        Object.keys(_rpcStyle).forEach(styleKey => {
          newRpcStyles[styleKey] = rippleParams[styleKey]
        })
        if (Object.keys(newRpcStyles).length > 0) {
          newData._rpcStyle = newRpcStyles
        }
        const query = this.createSelectorQuery()
        query.select('.mui-ripple-base').fields({
          rect: true,
        })
        query.selectViewport().scrollOffset()
        query.exec((res) => {
          const [view, viewport] = res || {}
          const {left = 0, top = 0} = view || {}
          const {scrollLeft = 0, scrollTop = 0} = viewport || {}
          let rippleX
          let rippleY
          if (centerRipple) {
            rippleX = rippleParams.centerX
            rippleY = rippleParams.centerY
          } else {
            rippleX = (rippleParams.x - (left + scrollLeft)) - (rippleParams.radius / 2)
            rippleY = (rippleParams.y - (top + scrollTop)) - (rippleParams.radius / 2)
          }
          _rippleList.push({
            key: rippleParams.key,
            x: rippleX,
            y: rippleY,
            rippleClass: rippleParams.rippleClass,
          })
          newData._rippleList = _rippleList
          this.setData(newData)
        })
      }
    },
    _RippleEnd({key, rippleClass = ''}) {
      if (key) {
        const endRippleIndex = this.data._rippleList.findIndex(item => item.key === key)
        if (endRippleIndex > -1) {
          this.setData({
            [`_rippleList[${endRippleIndex}].rippleClass`]: rippleClass
          })
        }
      }
    },
    _RippleAnimationEnd(e) {
      const {detail: {animationName}, target: {dataset: {key}}} = e
      if (key && animationName !== 'rippleLongpress') {
        const tobeDeleteIndex = this.data._rippleList.findIndex(item => item.key === key)
        this.data._rippleList.splice(tobeDeleteIndex, 1)
      }
    }
    /*
    _RippleAction(e) {
      const {disableRipple} = this.data
      const {disabled} = this.data
      if (!disableRipple && !disabled) {
        if (!this._muiRippleContainer) {
          const _muiRippleContainer = this.selectComponent('._mui-ripple-container')
          this._muiRippleContainer = _muiRippleContainer
        }
        if (this._muiRippleContainer) {
          const {pageX: x, pageY: y} = e.changedTouches[0]
          const query = this.createSelectorQuery()
          query.select('.mui-ripple-base').fields({
            size: true,
            rect: true,
            computedStyle: ['borderRadius']
          })
          query.selectViewport().scrollOffset()
          query.exec((res) => {
            const [view, viewPort] = res || {}
            const {
              width = 0,
              height = 0,
              left = 0,
              top = 0,
              borderRadius = 0,
            } = view || {}
            if (width > 0 && height > 0) {
              const {scrollLeft = 0, scrollTop = 0} = viewPort || {}
              const {rippleColor} = this.data
              this._muiRippleContainer._RippleAction({
                width,
                height,
                left,
                top,
                borderRadius,
                scrollLeft,
                scrollTop,
                backgroundColor: rippleColor,
                x,
                y,
                center: this.data.centerRipple,
              })
            }
          })
        }
      }
    }
    */
  }
})
