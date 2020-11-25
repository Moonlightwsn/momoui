import muiBase from '../../behaviors/muiBase.ts'
import muiController from '../../behaviors/muiController.ts'

const innerRippleColorMap = {
  primary: '#90caf9',
  secondary: '#f48fb1'
}

Component({
  behaviors: [muiBase, muiController, 'wx://form-field-button'],
  properties: {
    appParameter: {
      type: String,
      value: '',
    },
    color: {
      type: String,
      value: 'default'
    },
    disabled: {
      type: Boolean,
      value: false
    },
    formType: {
      type: String,
      value: ''
    },
    inline: {
      type: Boolean,
      value: true
    },
    icon: {
      type: String,
      value: null,
    },
    iconSize: {
      type: Number,
      value: null,
    },
    iconColor: {
      type: String,
      value: 'inherit'
    },
    iconPosition: {
      type: String,
      value: 'left',
    },
    loading: {
      type: Boolean,
      value: false,
    },
    openType: {
      type: String,
      value: ''
    },
    size: {
      type: String,
      value: 'medium'
    },
    shape: {
      type: String,
      value: 'normal'
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
    variant: {
      type: String,
      value: 'text',
    },
  },
  data: {
    _rippleColor: '',
  },
  lifetimes: {
    attached() {
      const {variant, color} = this.data
      this._setRippleColor(variant, color)
    }
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
  methods: {
    _setRippleColor(variant = 'text', color = 'default') {
      if (variant !== 'contained') {
        const _rippleColor = innerRippleColorMap[color] || ''
        this.setData({
          _rippleColor,
        })
      }
    },
  },
  observers: {
    'variant, color': function (variant = 'text', color = 'default') {
      this._setRippleColor(variant, color)
    },
  },
  options: {
    // virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
