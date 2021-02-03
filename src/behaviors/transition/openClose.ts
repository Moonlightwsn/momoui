import transition from './transition.ts'

export default Behavior({
  behaviors: [transition],
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
  },
  data: {
    _open: false,
    _show: false,
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
      const {
        autoHideDuration,
        transitionDuration,
      } = this.data
      if (open) {
        if (autoHideDuration > 0) {
          this.closeTimer = setTimeout(() => {
            this._close()
          }, autoHideDuration)
        }
        this.setData({_open: true}, () => {
          let needUpdateData
          const {_onBeforeShow} = this
          if (_onBeforeShow && typeof _onBeforeShow === 'function') {
            const onBeforeShowRes = _onBeforeShow()
            if (!onBeforeShowRes.then) {
              needUpdateData = onBeforeShowRes
              if (needUpdateData) {
                this.setData(needUpdateData, () => {
                  this.openTimer = setTimeout(() => {
                    this.setData({_show: true})
                  }, 50)
                })
              } else {
                this.openTimer = setTimeout(() => {
                  this.setData({_show: true})
                }, 50)
              }
            } else {
              _onBeforeShow().then(theNeedUpdateData => {
                needUpdateData = theNeedUpdateData
                if (needUpdateData) {
                  this.setData(needUpdateData, () => {
                    this.openTimer = setTimeout(() => {
                      this.setData({_show: true})
                    }, 50)
                  })
                } else {
                  this.openTimer = setTimeout(() => {
                    this.setData({_show: true})
                  }, 50)
                }
              }).catch(e => console.log(e))
            }
          } else {
            this.openTimer = setTimeout(() => {
              this.setData({_show: true})
            }, 50)
          }
        })
      } else {
        this.setData({_show: false}, () => {
          this.closeTimer = setTimeout(() => {
            this.setData({_open: false})
          }, transitionDuration)
        })
      }
    },
  },
})
