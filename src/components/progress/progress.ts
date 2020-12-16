import muiBase from '../../behaviors/muiBase.ts'

Component({
  behaviors: [muiBase],
  properties: {
    color: {
      type: String,
      value: 'primary',
    },
    disableShrink: {
      type: Boolean,
      value: false,
    },
    progressColor: {
      type: String,
      value: null,
    },
    size: {
      type: Number,
      value: 40,
    },
    /*
    thickness: {
      type: Number,
      value: 3.6,
    },
    */
    type: {
      type: String,
      value: 'circular',
    },
    value: {
      type: Number,
      value: 0,
    },
    valueBuffer: {
      type: Number,
      value: null,
    },
    variant: {
      type: String,
      value: 'indeterminate',
    },
  },
  data: {
    _progressPropsForIcon: {
      disableShrink: false,
      value: 0,
      variant: 'indeterminate',
    },
    _mainBarStyle: '',
    _bufferStyle: '',
  },
  observers: {
    'disableShrink, value, variant, type, valueBuffer': function (disableShrink, value, variant, type, valueBuffer) {
      if (type === 'circular') {
        this.setData({
          _progressPropsForIcon: {
            disableShrink,
            value,
            variant,
          },
        })
      } else if (type === 'linear' && variant !== 'indeterminate') {
        const newStyles: any = {}
        newStyles._mainBarStyle = `transform: translateX(${(-100 + value)}%);`
        if (variant === 'buffer') {
          newStyles._bufferStyle = `transform: translateX(${(-100 + valueBuffer)}%);`
        }
        this.setData(newStyles)
      }
    },
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
