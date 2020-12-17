import muiBase from '../../behaviors/muiBase.ts'

Component({
  behaviors: [muiBase],
  properties: {
    image: {
      type: String,
      value: null,
    },
    imageClass: {
      type: String,
      value: '',
    },
    imageMode: {
      type: String,
      value: 'center',
    },
    imageStyle: {
      type: String,
      value: '',
    },
    src: {
      type: String,
      value: null,
    },
  },
  data: {
    _imageStyle: '',
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
