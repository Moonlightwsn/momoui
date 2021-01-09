import muiBase from '../../behaviors/muiBase.ts'
import muiController from '../../behaviors/muiController.ts'
import {ObserversForControlledPropsByAncestor} from '../../common/utils.ts'

const controlledProps: string[] = [
  'color',
  'disabled',
  'disableElevation',
  'disableRipple',
  'size',
  'variant',
]

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
    sessionFrom: {
      type: String,
      value: '',
    },
    shape: {
      type: String,
      value: 'normal'
    },
    showMessageCard: {
      type: String,
      value: '',
    },
    size: {
      type: String,
      value: 'medium'
    },
    variant: {
      type: String,
      value: 'text',
    },
  },
  data: {
    _groupStyle: '',
  },
  lifetimes: {
    attached() {
      this._hasAttached = true
    },
  },
  relations: {
    '../button-group/button-group': {
      type: 'parent',
      linked(target) {
        if (target) {
          this._buttonGrouplComp = target
          this._ReRenderControlledProps()
        }
      },
      unlinked() {
        this._buttonGrouplComp = undefined
      },
    },
  },
  methods: {
    _ReRenderControlledProps() {
      const target = this._buttonGrouplComp
      if (target && Array.isArray(controlledProps)) {
        const newData = {}
        controlledProps.forEach(item => {
          if (!this._propIsSet || !this._propIsSet[item]) {
            newData[item] = target.data[item]
          }
        })
        if (Object.keys(newData).length > 0) {
          this.setData(newData)
        }
      }
    },
    _TriggerRipple(e) {
      const buttonBase = this.selectComponent('._mui-base-in-button')
      if (buttonBase) {
        buttonBase._RippleAction(e)
      }
    },
  },
  observers: {
    ...ObserversForControlledPropsByAncestor(controlledProps),
  },
  options: {
    // virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
    multipleSlots: true,
  },
})
