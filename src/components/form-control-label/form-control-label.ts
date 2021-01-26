import muiBase from '../../behaviors/muiBase.ts'
import {ObserversForControlledPropsByAncestor, debounce} from '../../common/utils.ts'

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
  data: {
    _pureFormItems: [],
  },
  lifetimes: {
    created() {
      if (!this._ArrangeFormItems) {
        this._ArrangeFormItems = debounce(() => {
          const newFormItems = this.data._pureFormItems
          if (newFormItems.length > 0) {
            newFormItems.forEach(item => {
              item.target._ReRenderControlledProps()
            })
          }
        }, 50)
      }
    },
    attached() {
      this._hasAttached = true
    }
  },
  relations: {
    '../checkbox/checkbox': {
      type: 'descendant',
      linked(target) {
        this._Linked(target, 'checkbox')
      },
    },
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
    },
    '../radio/radio': {
      type: 'descendant',
      linked(target) {
        this._Linked(target, 'radio')
      },
    },
    '../switch/switch': {
      type: 'descendant',
      linked(target) {
        this._Linked(target, 'switch')
      },
    },
  },
  methods: {
    _Click(e) {
      if (this.data._pureFormItems) {
        this.data._pureFormItems.forEach(item => {
          if (item.type === 'radio' || item.type === 'checkbox' || item.type === 'switch') {
            item.target._CheckControll(e)
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
        this.data._pureFormItems.push({
          target,
          type,
        })
        this.setData({_pureFormItems: this.data._pureFormItems})
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
    'checked, disabled, onChange, value, _pureFormItems': function () {
      if (this._ArrangeFormItems) {
        this._ArrangeFormItems()
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
