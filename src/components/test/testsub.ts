import muiBase from '../../behaviors/muiBase.ts'

Component({
  behaviors: [muiBase],
  methods: {
    _tap3() {
      console.log('tap 3')
    },
    _capturetap3() {
      console.log('captruetap 3')
    }
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  }
})
