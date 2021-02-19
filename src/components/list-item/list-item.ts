import muiBase from '../../behaviors/muiBase.ts'

Component({
  behaviors: [muiBase],
  properties: {
    alignItems: {
      type: String,
      value: 'center',
    },
    avatar: {
      type: String,
      optionalTypes: [Object],
      value: null,
    },
    button: {
      type: Boolean,
      value: false,
    },
    dense: {
      type: Boolean,
      value: false,
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    disableGutters: {
      type: Boolean,
      value: false,
    },
    divider: {
      type: Boolean,
      value: false,
    },
    icon: {
      type: String,
      optionalTypes: [Object],
      value: null,
    },
    indent: {
      type: Number,
      value: null,
    },
    primary: {
      type: String,
      value: null,
    },
    secondary: {
      type: String,
      value: null,
    },
    secondaryAction: {
      type: Object,
      value: null,
    },
    selected: {
      type: Boolean,
      value: false,
    },
  },
  data: {
    _paddingLeftStyle: '',
  },
  methods: {
    _secondaryAction(e) {
      const {secondaryAction = {}} = this.data
      const {action} = secondaryAction
      if (action && typeof action === 'function') {
        action(e, this.dataset)
      }
    },
    _secondaryLongpress(e) {
      const {secondaryAction = {}} = this.data
      const {longpress} = secondaryAction
      if (longpress && typeof longpress === 'function') {
        longpress(e, this.dataset)
      }
    }
  },
  observers: {
    indent(indent) {
      let _paddingLeftStyle = ''
      if (typeof indent === 'number') {
        _paddingLeftStyle = `padding-left: ${indent}px;`
      }
      this.setData({_paddingLeftStyle})
    },
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
