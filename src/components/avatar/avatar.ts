import muiBase from '../../behaviors/muiBase.ts'

Component({
  behaviors: [muiBase],
  properties: {
    icon: {
      type: String,
      value: null,
    },
    src: {
      type: String,
      value: null,
    },
    variant: {
      type: String,
      value: 'circle',
    },
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
