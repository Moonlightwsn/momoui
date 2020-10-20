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
    _pureIsGenMuiClasses: false,
    _disabled: false,
    muiClasses: ['mui-color-default', 'mui-variant-contained', 'mui-size-medium']
  },
  lifetimes: {
    attached() {
      const {
        color,
        variant,
        size,
        loading,
        disabled
      } = this.properties
      const {_pureIsGenMuiClasses} = this.data
      /** 根据纯数据字段_pureIsGenMuiClasses判断是否已经在observers中执行过_defindMuiBehaviors */
      if (!_pureIsGenMuiClasses) {
        this._defindMuiBehaviors({
          color,
          variant,
          size,
          disabled,
          loading,
        })
      }
    }
  },
  methods: {
    _openTypeEvent(e) {
      const {openType} = this.properties
      this.triggerEvent(openTypeMap[openType], e)
    },
    _defindMuiBehaviors(params = {}) {
      /** 整合所有样式 */
      const muiClasses = []
      const {disabled, loading} = params
      if (!(typeof disabled === 'undefined' && typeof loading === 'undefined')) {
        const _disabled = (disabled || loading)
        if (_disabled) {
          muiClasses.push('mui-disabled')
        }
        this.setData({
          _disabled,
        })
      }
      styleProps.forEach(sp => {
        muiClasses.push(params[sp] ? `mui-${sp}-${params[sp]}` : '')
      })
      const {mClass} = this.properties
      if (mClass) {
        muiClasses.push(mClass)
      }
      this.setData({
        muiClasses,
        _pureIsGenMuiClasses: true,
      })
    },

  },
  observers: {
    'color, variant, size, loading, disabled': function (color, variant, size, loading, disabled) {
      this._defindMuiBehaviors({
        color,
        variant,
        size,
        disabled,
        loading,
      })
    },
  },
})
