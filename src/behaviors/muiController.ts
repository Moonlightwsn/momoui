const styleProps = [
  'color',
  'variant',
  'size',
]

export default Behavior({
  data: {
    muiClasses: '',
  },
  lifetimes: {
    attached() {
      if (!this._firstOberverForMuiClass) {
        const {
          color,
          variant,
          size,
          mClass,
        } = this.data
        this._defindMuiBehaviors({
          color,
          variant,
          size,
          mClass,
        })
      }
    }
  },
  methods: {
    _defindMuiBehaviors(params = {}) {
      /** 整合所有样式 */
      const newData: { muiClasses?: string } = {}
      const muiClassesArr = []
      styleProps.forEach(sp => {
        muiClassesArr.push(params[sp] ? `mui-${sp}-${params[sp]}` : '')
      })
      if (params.mClass) {
        muiClassesArr.push(params.mClass)
      }
      newData.muiClasses = muiClassesArr.join(' ')
      this.setData(newData)
    },

  },
  observers: {
    'color, variant, size, mClass': function (color, variant, size, mClass) {
      this._firstOberverForMuiClass = true
      this._defindMuiBehaviors({
        color,
        variant,
        size,
        mClass,
      })
    },
  },
})
