import muiBase from '../../behaviors/muiBase.ts'

Component({
  behaviors: [muiBase],
  properties: {
    dense: {
      type: Boolean,
      value: false,
    },
    disablePadding: {
      type: Boolean,
      value: false,
    },
    nested: {
      type: Boolean,
      value: false,
    },
    subheader: {
      type: String,
      value: '',
    },
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
    multipleSlots: true,
  },
})
