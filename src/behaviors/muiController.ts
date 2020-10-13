import {openTypeMap} from '../common/utils.ts'

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
    _disabled: false,
    muiClasses: ['mui-color-default', 'mui-variant-contained', 'mui-size-medium']
  },
  methods: {
    _openTypeEvent(e) {
      const {openType} = this.properties
      this.triggerEvent(openTypeMap[openType], e)
    },
    _defineDisabled(_disabled) {
      /*
      const {muiClasses} = this.data
      const disabledIndex = muiClasses.findIndex((c: String) => c === 'mui-disabled')
      if (_disabled && disabledIndex < 0) {
        muiClasses.push('mui-disabled')
      } else if (!_disabled && disabledIndex >= 0) {
        muiClasses.splice(disabledIndex, 1)
      }
      */
      this.setData({
        _disabled,
      })
    },
    _defindMuiClasses(params = {}, _disabled) {
      /** 整合所有样式 */
      const muiClasses = []
      if (_disabled) {
        muiClasses.push('mui-disabled')
      }
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
    'color, variant, size, loading, disabled': function (color, variant, size, loading, disabled) {
      const _disabled = (disabled || loading)
      this._defineDisabled(_disabled)
      console.log(color, variant, size, _disabled)
      if (!(color === 'default' && variant === 'contained' && size === 'medium' && !_disabled)) {
        /**
         * 在人为设置[color, variant, size, _disabled]四元组的值后会触发observers
         * 但如果都与默认值相同
         * 则不生成muiClasses，直接使用默认的muiClasses
         * */
        this._defindMuiClasses({
          color,
          variant,
          size,
        }, _disabled)
      }
    },
  },
})
