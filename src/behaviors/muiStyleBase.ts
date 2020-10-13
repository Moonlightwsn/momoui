const styleProps = [
  'color',
  'variant',
  'size',
]

export default Behavior({
  properties: {
    mClass: {
      type: String,
      value: ''
    },
    mStyle: {
      type: String,
      value: ''
    }
  },
  data: {
    muiClasses: ['mui-color-default', 'mui-variant-contained', 'mui-size-medium']
  },
  methods: {
    _defindMuiClasses(params = {}) {
      /** 整合所有样式 */
      const muiClasses = []
      styleProps.forEach(sp => {
        muiClasses.push(params[sp] ? `mui-${sp}-${params[sp]}` : '')
      })
      const {mClass} = this.properties
      if (mClass) {
        muiClasses.push(mClass)
      }
      this.setData({
        muiClasses
      })
    }
  },
  observers: {
    'color, variant, size': function (color, variant, size) {
      if (!(color === 'default' && variant === 'contained' && size === 'medium')) {
        /**
         * 在人为设置[color, variant, size]三元组的值后会触发observers
         * 但如果都与默认值相同
         * 则不生成muiClasses，直接使用默认的muiClasses
         * */
        this._defindMuiClasses({
          color,
          variant,
          size
        })
      }
    }
  }
})
