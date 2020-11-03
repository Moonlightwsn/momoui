import muiBase from '../../behaviors/muiBase.ts'
import muiController from '../../behaviors/muiController.ts'
import rippleBase from '../../behaviors/rippleBase.ts'

const innerRippleColorMap = {
  primary: '#90caf9',
  secondary: '#f48fb1'
}

Component({
  behaviors: [muiBase, muiController, rippleBase],
  properties: {
    disabled: {
      type: Boolean,
      value: false
    },
    loading: {
      type: Boolean,
      value: false,
    },
    inline: {
      type: Boolean,
      value: true
    },
    color: {
      type: String,
      value: 'default'
    },
    variant: {
      type: String,
      value: 'contained'
    },
    size: {
      type: String,
      value: 'medium'
    },
    shape: {
      type: String,
      value: 'normal'
    },
    formType: {
      type: String,
      value: ''
    },
    openType: {
      type: String,
      value: ''
    },
    appParameter: {
      type: String,
      value: '',
    },
    sessionFrom: {
      type: String,
      value: '',
    },
    sendMessageTitle: {
      type: String,
      value: ''
    },
    sendMessagePath: {
      type: String,
      value: ''
    },
    sendMessageImg: {
      type: String,
      value: ''
    },
    showMessageCard: {
      type: String,
      value: '',
    },
  },
  data: {
    _rippleColor: '',
  },
  relations: {
    '../button-group/button-group': {
      type: 'parent',
      linked(target) {
        if (target) {
          const {data: {variant, color, size} = {}} = target
          this.setData({
            variant,
            color,
            size,
          })
        }
      }
    }
  },
  lifetimes: {
    created() {
      console.log('button create', this.data.color)
    },
    attached() {
      console.log('button attached', this.data.color)
    },
  },
  methods: {
    _setRippleColor(variant = 'contained', color = 'default') {
      if (variant !== 'contained') {
        const _rippleColor = innerRippleColorMap[color] || ''
        this.setData({
          _rippleColor,
        })
      }
    },
  },
  observers: {
    'variant, color, shape': function (variant = 'contained', color = 'default', shape = 'normal') {
      this._setRippleColor(variant, color)
      if (shape === 'circle' && variant === 'text') {
        this.setData({
          _pureCenter: shape === 'circle',
        })
      }
    },
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
