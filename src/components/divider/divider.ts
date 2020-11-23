import muiBase from '../../behaviors/muiBase.ts'

Component({
  behaviors: [muiBase],
  properties: {
    absolute: {
      type: Boolean,
      value: false,
    },
    flexItem: {
      type: Boolean,
      value: false,
    },
    light: {
      type: Boolean,
      value: false,
    },
    orientation: {
      type: String,
      value: 'horizontal',
    },
    variant: {
      type: String,
      value: 'fullWidth',
    },
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
