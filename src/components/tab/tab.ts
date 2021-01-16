import muiBase from '../../behaviors/muiBase.ts'
import {ObserversForControlledPropsByAncestor} from '../../common/utils.ts'

const controlledProps: string[] = [
  'value',
]

Component({
  behaviors: [muiBase],
  properties: {
    disabled: {
      type: Boolean,
      value: false,
    },
    disableRipple: {
      type: Boolean,
      value: false,
    },
    icon: {
      type: String,
      optionalTypes: [Object],
      value: null,
    },
    label: {
      type: String,
      value: null,
    },
    value: {
      type: String,
      optionalTypes: [Number, Array, Object],
      value: null,
    },
    variant: {
      type: String,
      value: 'standard',
    },
    wrapped: {
      type: Boolean,
      value: false,
    },
  },
  data: {
    _selected: false,
  },
  lifetimes: {
    attached() {
      this._hasAttached = true
    },
  },
  relations: {
    '../tabs/tabs': {
      type: 'ancestor',
      linked(target) {
        if (target) {
          this._tabsComp = target
        }
      },
      unlinked() {
        this._tabsComp = undefined
      }
    },
  },
  methods: {
    _QueryTab() {
      return new Promise((resolve) => {
        const query = this.createSelectorQuery()
        query.select('._mui-tab-root').fields({
          size: true,
          rect: true,
        })
        query.exec(res => {
          const [view] = res || {}
          const {
            width = 0,
            height = 0,
            left = 0,
            right = 0,
            top = 0,
            bottom = 0,
          } = view || {}
          const queryRes = {
            width,
            height,
            left,
            right,
            top,
            bottom,
          }
          resolve(queryRes)
        })
      })
    },
    _ReRenderControlledProps() {
      const target = this._tabsComp
      if (target) {
        const newData:any = {}
        newData._selected = false
        let currentValue = this.data.value
        if (!this._propIsSet || !this._propIsSet.value) {
          newData.value = this._defaultValue
          currentValue = newData.value
        }
        if (currentValue === target.data.value) {
          newData._selected = true
          target._ComputeTabsPosition(this._defaultValue)
        }
        this.setData(newData)
      }
    },
    _Select(e) {
      const {disabled} = this.data
      const target = this._tabsComp
      if (target && !disabled) {
        target._onChange(e, this.data.value)
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
    multipleSlots: true,
  },
})
