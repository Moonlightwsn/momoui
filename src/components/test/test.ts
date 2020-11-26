import muiBase from '../../behaviors/muiBase.ts'
// import rippleBase from '../../behaviors/rippleBase.ts'

Component({
  behaviors: [muiBase/* , rippleBase */],
  methods: {
    _tap1() {
      console.log('tap 1')
    },
    _tap2() {
      console.log('tap 2')
    },
    _capturetap1() {
      console.log('capturetap 1')
    },
    _capturetap2() {
      console.log('capturetap 2')
    }
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
