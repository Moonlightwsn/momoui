import {highBrightnessColor} from '../common/utils.ts'

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
      const {disableRipple} = this.properties
      const {disabled, loading} = this.data
      const _disabled = disabled || loading
      if (!disableRipple && !_disabled) {
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
            computedStyle: ['backgroundColor']
          })
          query.selectViewport().scrollOffset()
          query.exec((res) => {
            const [view = {}, viewPort = {}] = res || {}
            const {
              width = 0,
              height = 0,
              left = 0,
              top = 0,
              backgroundColor = ''
            } = view
            if (width > 0 && height > 0) {
              const {scrollLeft = 0, scrollTop = 0} = viewPort
              const {rippleColor} = this.data
              let realRippleColor = rippleColor
              if (!realRippleColor) {
                realRippleColor = (highBrightnessColor(backgroundColor) ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)')
              }
              this._muiRippleContainer._RippleAction({
                width,
                height,
                left,
                top,
                scrollLeft,
                scrollTop,
                backgroundColor: realRippleColor,
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
