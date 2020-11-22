import muiBase from '../../behaviors/muiBase.ts'

Component({
  behaviors: [muiBase],
  properties: {
    icon: {
      type: String,
      value: null,
    },
    sizes: {
      type: String,
      value: null,
    },
    src: {
      type: String,
      value: null,
    },
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
