import muiBase from '../../behaviors/muiBase.ts'

Component({
  behaviors: [muiBase],
  properties: {
    onClose: {
      // @ts-ignore
      type: Function,
      value: null,
    },
  },
  data: {
    _close: false,
  },
  methods: {
    _onClose(e) {
      const {onClose} = this.data
      if (onClose && typeof onClose === 'function') {
        onClose(e)
      }
    },
  },
  observers: {
    onClose(onClose) {
      if (onClose && typeof onClose === 'function') {
        this.setData({_close: true})
      } else {
        this.setData({_close: false})
      }
    },
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
