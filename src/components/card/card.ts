import muiBase from '../../behaviors/muiBase.ts'

Component({
  behaviors: [muiBase],
  properties: {
    nativeNodeClass: {
      type: String,
      value: '',
    },
    raised: {
      type: Boolean,
      value: false,
    },
    variant: {
      type: String,
      value: 'elevation',
    }
  },
  observers: {},
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
