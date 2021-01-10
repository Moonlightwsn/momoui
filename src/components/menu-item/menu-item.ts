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
      value: true,
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
  observers: {},
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
