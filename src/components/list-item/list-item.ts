import muiBase from '../../behaviors/muiBase.ts'

Component({
  behaviors: [muiBase],
  properties: {
    alignItems: {
      type: String,
      value: 'center',
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
    primary: {
      type: String,
      value: null,
    },
    secondary: {
      type: String,
      value: null,
    },
    selected: {
      type: Boolean,
      value: false,
    }
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
