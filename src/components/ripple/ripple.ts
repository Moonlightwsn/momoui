Component({
  properties: {
    rippleKey: {
      type: String,
      value: ''
    },
    radius: {
      type: Number,
      value: 0
    },
    top: {
      type: Number,
      value: 0,
    },
    left: {
      type: Number,
      value: 0,
    },
    backgroundColor: {
      type: String,
      value: ''
    },
  },
  lifetimes: {
    ready() {
      this._RippleAction()
    }
  },
  methods: {
    _RippleAction() {
      this.animate(
        '.mui-ripple',
        [{
          scale: [0, 0],
          opacity: 0.3,
        }, {
          scale: [2, 2],
          opacity: 0,
        }],
        600,
        () => {
          this.triggerEvent('clearripple', {
            rippleKey: this.data.rippleKey
          })
        }
      )
    }
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
