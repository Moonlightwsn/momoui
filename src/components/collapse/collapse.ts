import muiBase from '../../behaviors/muiBase.ts'

Component({
  behaviors: [muiBase],
  properties: {
    collapsedHeight: {
      type: Number,
      optionalTypes: [String],
      value: 0,
    },
    in: {
      type: Boolean,
      value: false,
    },
    timeout: {
      type: Number,
      optionalTypes: [String, Object],
      value: 300,
    },
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
