import muiBase from '../../behaviors/muiBase.ts'

Component({
  behaviors: [muiBase],
  properties: {
    anchorOrigin: {
      type: Object,
      value: {
        vertical: 'bottom',
        horizontal: 'center',
      },
    },
    autoHideDuration: {
      type: Number,
      value: null,
    },
    message: {
      type: String,
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
      if (open) {
        const {autoHideDuration} = this.data
        if (autoHideDuration > 0) {
          clearTimeout(this.autoCloseTimer)
          this.autoCloseTimer = setTimeout(() => {
            this._close()
          }, autoHideDuration)
        }
        this.setData({_open: true})
        setTimeout(() => {
          this.setData({_show: true})
        }, 100)
      }
    },
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
