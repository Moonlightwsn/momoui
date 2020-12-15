import muiBase from '../../behaviors/muiBase.ts'

Component({
  behaviors: [muiBase],
  properties: {
    actions: {
      type: Object,
      value: null,
    },
    content: {
      type: String,
      value: null,
    },
    disableBackdropClick: {
      type: Boolean,
      value: false,
    },
    fullScreen: {
      type: Boolean,
      value: false,
    },
    fullWidth: {
      type: Boolean,
      value: false,
    },
    maxWidth: {
      type: Boolean,
      optionalTypes: [String],
      value: false,
    },
    onBackdropClick: {
      // @ts-ignore
      type: Function,
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
    scroll: {
      type: String,
      value: 'paper',
    },
    title: {
      type: String,
      value: null,
    },
    transitionDuration: {
      type: Number,
      value: 255,
    },
  },
  lifetimes: {
    attached() {
      console.log(this.data.actions)
    }
  },
  methods: {
    _clickDialogContent() {},
    _confirm(e) {
      const {actions} = this.data
      if (actions && actions.onConfirm && typeof actions.onConfirm === 'function') {
        actions.onConfirm(e)
      }
    },
    _cancel(e) {
      const {actions} = this.data
      if (actions && actions.onCancel && typeof actions.onCancel === 'function') {
        actions.onCancel(e)
      }
    },
  },
  observers: {},
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
