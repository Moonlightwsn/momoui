import muiBase from '../../behaviors/muiBase.ts'

Component({
  behaviors: [muiBase],
  properties: {
    color: {
      type: String,
      value: 'default',
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    disableRipple: {
      type: Boolean,
      value: false,
    },
    edge: {
      type: String,
      value: '',
    },
    icon: {
      type: String,
      value: null,
    },
    iconSize: {
      type: Number,
      value: null,
    },
    iconColor: {
      type: String,
      value: null,
    },
    iconSpin: {
      type: Boolean,
      value: false,
    },
    size: {
      type: String,
      value: 'medium',
    },
  },
  observers: {},
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
