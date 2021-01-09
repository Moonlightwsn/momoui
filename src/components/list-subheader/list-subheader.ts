import muiBase from '../../behaviors/muiBase.ts'

Component({
  behaviors: [muiBase],
  properties: {
    color: {
      type: String,
      value: 'default',
    },
    disableGutters: {
      type: Boolean,
      value: false,
    },
    disableSticky: {
      type: Boolean,
      value: false,
    },
    inset: {
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
