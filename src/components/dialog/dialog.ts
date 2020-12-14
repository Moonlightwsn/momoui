import muiBase from '../../behaviors/muiBase.ts'

Component({
  behaviors: [muiBase],
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
    multipleSlots: true,
  },
})
