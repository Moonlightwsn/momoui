export default Behavior({
  properties: {
    autoHideDuration: {
      type: Number,
      value: null,
    },
    onClose: {
      // @ts-ignore
      type: Function,
      value: null,
    },
    open: {
      type: Boolean,
      value: null,
    },
    transitionDuration: {
      type: Number,
      value: 225,
    },
  },
  data: {
    _open: false,
    _show: false,
    _transitionStyle: 'transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;',
  },
  methods: {
    _close() {
      const {onClose} = this.data
      if (onClose && typeof onClose === 'function') {
        onClose()
      }
    },
  },
  observers: {
    open(open) {
      clearTimeout(this.closeTimer)
      clearTimeout(this.openTimer)
      const {autoHideDuration, transitionDuration} = this.data
      if (open) {
        if (autoHideDuration > 0) {
          this.closeTimer = setTimeout(() => {
            this._close()
          }, autoHideDuration)
        }
        this.setData({_open: true})
        this.openTimer = setTimeout(() => {
          this.setData({_show: true})
        }, 50)
      } else {
        this.setData({_show: false}, () => {
          this.closeTimer = setTimeout(() => {
            this.setData({_open: false})
          }, transitionDuration)
        })
      }
    },
    transitionDuration(duration) {
      this.setData({
        _transitionStyle: `transition: opacity ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform ${duration * 0.66666667}ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;`
      })
    },
  },
})
