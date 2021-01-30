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
    transitions: {
      type: Array,
      value: [],
    },
    transitionDelay: {
      type: Number,
      optionalTypes: [Object],
      value: 0,
    },
    transitionDuration: {
      type: Number,
      optionalTypes: [Object],
      value: 225,
    },
  },
  methods: {
    _ClickDialogContent() {},
    _confirm(e) {
      const {actions} = this.data
      if (actions && actions.onConfirm && typeof actions.onConfirm === 'function') {
        actions.onConfirm(e)
      }
    },
    _Cancel(e) {
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
