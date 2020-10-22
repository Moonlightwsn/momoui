import rippleBase from '../../behaviors/rippleBase.ts'

Component({
  behaviors: [rippleBase],
  properties: {
    mClass: {
      type: String,
      value: '',
    },
    mStyle: {
      type: String,
      value: '',
    },
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  }
})
