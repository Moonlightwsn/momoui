import muiBase from '../../behaviors/muiBase.ts'
import muiController from '../../behaviors/muiController.ts'
import {ObserversForControlledPropsByAncestor} from '../../common/utils.ts'

const controlledProps: string[] = [
  'color',
  'disabled',
  'error',
  'focus',
  'margin',
  'required',
  'variant',
]

Component({
  behaviors: [muiBase, muiController],
  properties: {
    color: {
      type: String,
      value: 'primary',
    },
    disableAnimation: {
      type: Boolean,
      value: false,
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    error: {
      type: Boolean,
      value: false,
    },
    focus: {
      type: Boolean,
      value: false,
    },
    margin: {
      type: String,
      value: 'none',
    },
    required: {
      type: Boolean,
      value: false,
    },
    shrink: {
      type: Boolean,
      value: false,
    },
    variant: {
      type: String,
      value: 'standard',
    }
  },
  data: {
    _formControl: false,
  },
  lifetimes: {
    attached() {
      this._hasAttached = true
    },
  },
  relations: {
    '../form-control/form-control': {
      type: 'ancestor',
      linked(target) {
        this._formControlComp = target
        this._ReRenderControlledProps()
        this.setData({_formControl: true})
      }
    }
  },
  methods: {
    _onBlur(params) {
      if (!this._propIsSet || !this._propIsSet.focus) {
        this.setData({focus: false, ...params})
      }
    },
    _onFocus(params) {
      if (!this._propIsSet || !this._propIsSet.focus) {
        this.setData({focus: true, ...params})
      }
    },
    _ReRenderControlledProps() {
      const target = this._formControlComp
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
    _SetShrink(params) {
      this.setData(params)
    }
  },
  observers: {
    ...ObserversForControlledPropsByAncestor(controlledProps),
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  }
})
