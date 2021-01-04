import muiBase from '../../behaviors/muiBase.ts'
import {ObserversForControlledPropsByAncestor} from '../../common/utils.ts'

const controlledProps: string[] = [
  'disabled',
]

Component({
  behaviors: [muiBase],
  properties: {
    checked: {
      type: Boolean,
      value: false,
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    label: {
      type: String,
      value: null,
    },
    labelPlacement: {
      type: String,
      value: 'end',
    },
    onChange: {
      // @ts-ignore
      type: Function,
      value: null,
    },
    value: {
      type: String,
      value: null,
    },
  },
  lifetimes: {
    attached() {
      this._hasAttached = true
    }
  },
  relations: {
    '../form-control/form-control': {
      type: 'ancestor',
      linked(target) {
        if (target) {
          this._formControlComp = target
          this._ReRenderControlledProps()
        }
      },
    },
    '../checkbox/checkbox': {
      type: 'descendant',
      linked(target) {
        this._Linked(target, 'checkbox')
      },
    },
    '../switch/switch': {
      type: 'descendant',
      linked(target) {
        this._Linked(target, 'switch')
      },
    },
    '../radio/radio': {
      type: 'descendant',
      linked(target) {
        this._Linked(target, 'radio')
      },
    },
  },
  methods: {
    _Click() {
      if (this._formItems) {
        this._formItems.forEach(item => {
          if (item.type === 'radio' || item.type === 'checkbox' || item.type === 'switch') {
            item.target._CheckControll()
            const buttonInFormItem = item.target.selectComponent('._mui-inner-button')
            if (buttonInFormItem) {
              buttonInFormItem._TriggerRipple({
                detail: {
                  x: 0,
                  y: 0,
                }
              })
            }
          }
        })
      }
    },
    _Linked(target, type) {
      if (target) {
        if (!this._formItems) {
          this._formItems = []
        }
        this._formItems.push({target, type})
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
    'checked, disabled, onChange, value': function () {
      if (this._formItems) {
        this._formItems.forEach(item => {
          item.target._ReRenderControlledProps()
        })
      }
    },
    ...ObserversForControlledPropsByAncestor(controlledProps),
  },
  options: {
    // virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
    multipleSlots: true,
  },
})