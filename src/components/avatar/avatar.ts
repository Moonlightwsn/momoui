import muiBase from '../../behaviors/muiBase.ts'

Component({
  behaviors: [muiBase],
  properties: {
    icon: {
      type: String,
      value: null,
    },
    iconColor: {
      type: String,
      value: null,
    },
    iconSize: {
      type: Number,
      value: null,
    },
    src: {
      type: String,
      value: null,
    },
    variant: {
      type: String,
      value: 'circle',
    },
  },
  data: {
    _groupStyles: '',
  },
  relations: {
    '../avatar-group/avatar-group': {
      type: 'parent',
    },
  },
  methods: {
    _groupControlAction(styles) {
      let _groupStyles = ''
      Object.keys(styles).forEach(styleKey => {
        _groupStyles = `${_groupStyles}${styleKey}:${styles[styleKey]};`
      })
      this.setData({_groupStyles})
    }
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
