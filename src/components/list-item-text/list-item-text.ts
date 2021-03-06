import muiBase from '../../behaviors/muiBase.ts'

Component({
  behaviors: [muiBase],
  properties: {
    inset: {
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
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
    multipleSlots: true,
  },
})
