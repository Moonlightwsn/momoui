import muiBase from '../../behaviors/muiBase.ts'

Component({
  behaviors: [muiBase],
  properties: {
    customized: {
      type: Boolean,
      value: false,
    },
    icon: {
      type: String,
      optionalTypes: [Object],
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
    _iconStyle: '',
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
  observers: {
    'src, icon': function (src, icon) {
      let _iconStyle = ''
      if (src) {
        _iconStyle = 'mui-avatar-img'
      } else if (icon) {
        _iconStyle = 'mui-avatar-icon'
      }
      this.setData({_iconStyle})
    },
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
