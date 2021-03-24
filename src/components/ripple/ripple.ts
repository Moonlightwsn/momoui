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
    getRef: {
      // @ts-ignore
      type: Function,
      value: null,
    }
  },
  lifetimes: {
    /*
    attached() {
      const {getRef, rippleKey} = this.data
      if (getRef && typeof getRef === 'function') {
        getRef(this, rippleKey)
      }
    },
    */
    ready() {
      // rippleContainer 负责创建ripple list
      // ripple 自身在渲染就绪时，自主触发一次Ripple动作
      this._RippleAction()
    }
  },
  methods: {
    /*
    _RippleEnd() {
      this.animate(
        '.mui-ripple',
        [{
          scale: [2, 2],
          opacity: 0.3,
        }, {
          scale: [2, 2],
          opacity: 0,
        }],
        100,
        () => {
          this.triggerEvent('clearripple', {
            rippleKey: this.data.rippleKey
          })
        }
      )
    },
    */
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
