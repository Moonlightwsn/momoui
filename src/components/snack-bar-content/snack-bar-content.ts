import muiBase from '../../behaviors/muiBase.ts'

Component({
  behaviors: [muiBase],
  properties: {
    action: {
      type: String,
      optionalTypes: [Object],
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
  },
  methods: {
    _ActionHandler(e) {
      const {
        action,
        onClose,
      } = this.data
      if (action) {
        if (action.action && typeof action.action === 'function') {
          action.action(e, this.dataset)
        } else if (onClose && typeof onClose === 'function') {
          onClose(e, this.dataset)
        }
      }
    },
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
    multipleSlots: true,
  },
})
