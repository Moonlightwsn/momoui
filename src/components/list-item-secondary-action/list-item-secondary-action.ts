import muiBase from '../../behaviors/muiBase.ts'

Component({
  behaviors: [muiBase],
  methods: {
    _catchTapAction() {},
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  }
})
