import muiBase from '../../behaviors/muiBase.ts'

Component({
  behaviors: [muiBase],
  properties: {
    color: {
      type: String,
      value: 'secondary',
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    error: {
      type: Boolean,
      value: false,
    },
    filled: {
      type: Boolean,
      value: false,
    },
    focus: {
      type: Boolean,
      value: false,
    },
    required: {
      type: Boolean,
      value: false,
    },
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
