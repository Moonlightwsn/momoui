import muiBase from '../../behaviors/muiBase.ts'

Component({
  behaviors: [muiBase],
  properties: {
    invisible: {
      type: Boolean,
      value: false,
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
      value: 255,
    },
  },
  methods: {
    _click() {
      const {onClose} = this.data
      if (onClose && typeof onClose === 'function') {
        onClose()
      }
    },
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
