import muiBase from '../../behaviors/muiBase.ts'
import muiController from '../../behaviors/muiController.ts'

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
    disableElevation: {
      type: Boolean,
      value: false,
    },
    disableRipple: {
      type: Boolean,
      value: false,
    },
    formType: {
      type: String,
      value: ''
    },
    fullWidth: {
      type: Boolean,
      value: false,
    },
    hoverClass: {
      type: String,
      value: '',
    },
    hoverStopPropagation: {
      type: Boolean,
      value: false,
    },
    hoverStartTime: {
      type: Number,
      value: 20,
    },
    hoverStayTime: {
      type: Number,
      value: 70,
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
      value: null,
    },
    iconPosition: {
      type: String,
      value: 'left',
    },
    iconSpin: {
      type: Boolean,
      value: false,
    },
    lang: {
      type: String,
      value: 'en',
    },
    loading: {
      type: Boolean,
      value: false,
    },
    openType: {
      type: String,
      value: ''
    },
    rippleColor: {
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
    _groupStyle: '',
  },
  relations: {
    '../button-group/button-group': {
      type: 'parent',
      linked(target) {
        if (target) {
          const {
            data: {
              variant,
              color,
              size,
              disabled,
              disableElevation,
              disableRipple,
            } = {}
          } = target
          const newData: any = {
            disabled,
            disableElevation,
            disableRipple,
            fullWidth: false,
          }
          if (!this._variantIsSet) {
            newData.variant = variant
          }
          if (!this._colorIsSet) {
            newData.color = color
          }
          if (!this._sizeIsSet) {
            newData.size = size
          }
          this.setData(newData)
        }
      }
    }
  },
  observers: {
    variant() {
      this._variantIsSet = true
    },
    color() {
      this._colorIsSet = true
    },
    size() {
      this._sizeIsSet = true
    },
  },
  options: {
    // virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
