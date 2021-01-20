import muiBase from '../../behaviors/muiBase.ts'

Component({
  behaviors: [muiBase],
  properties: {
    action: {
      type: String,
      optionalTypes: [Object],
      value: null,
    },
    message: {
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
