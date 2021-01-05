import muiBase from '../../behaviors/muiBase.ts'
import {ObserversForControlledPropsByAncestor} from '../../common/utils.ts'

const controlledProps: string[] = [
  'color',
  'disabled',
  'error',
  'focus',
  'required',
]

Component({
  behaviors: [muiBase],
  properties: {
    color: {
      type: String,
      value: 'primary',
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    error: {
      type: Boolean,
      value: false,
    },
    filled: {
      type: Boolean,
      value: false,
    },
    focus: {
      type: Boolean,
      value: false,
    },
    required: {
      type: Boolean,
      value: false,
    },
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
        if (target) {
          this._formControlComp = target
        }
      },
      unlinked() {
        this._formControlComp = undefined
      },
    }
  },
  methods: {
    _onBlur() {
      if (!this._propIsSet || !this._propIsSet.focus) {
        this.setData({focus: false})
      }
    },
    _onFocus() {
      if (!this._propIsSet || !this._propIsSet.focus) {
        this.setData({focus: true})
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
  },
  observers: {
    ...ObserversForControlledPropsByAncestor(controlledProps),
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
