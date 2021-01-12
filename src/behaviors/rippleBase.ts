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
  methods: {
    _RippleAction(e) {
      const {disableRipple} = this.data
      const {disabled} = this.data
      if (!disableRipple && !disabled) {
        if (!this._muiRippleContainer) {
          const _muiRippleContainer = this.selectComponent('._mui-ripple-container')
          this._muiRippleContainer = _muiRippleContainer
        }
        if (this._muiRippleContainer) {
          const {x, y} = e.detail
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
  }
})
