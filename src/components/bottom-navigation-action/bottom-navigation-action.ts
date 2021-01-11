import muiBase from '../../behaviors/muiBase.ts'
import {ObserversForControlledPropsByAncestor} from '../../common/utils.ts'

const controlledProps: string[] = [
  'showLabel',
  'value',
]

Component({
  behaviors: [muiBase],
  properties: {
    icon: {
      type: String,
      optionalTypes: [Object],
      value: null,
    },
    activeIconColor: {
      type: String,
      value: null,
    },
    inactiveIconColor: {
      type: String,
      value: null,
    },
    label: {
      type: String,
      value: null,
    },
    showLabel: {
      type: Boolean,
      value: false,
    },
    value: {
      type: String,
      optionalTypes: [Number, Array, Object],
      value: null,
    },
  },
  data: {
    _selected: false,
    _iconColor: null,
    _hideInactiveAction: true,
  },
  lifetimes: {
    attached() {
      this._hasAttached = true
    },
  },
  relations: {
    '../bottom-navigation/bottom-navigation': {
      type: 'ancestor',
      linked(target) {
        if (target) {
          this._navigationComp = target
        }
      },
      unlinked() {
        this._navigationComp = undefined
      },
    }
  },
  methods: {
    _ReRenderControlledProps() {
      const target = this._navigationComp
      if (target) {
        const newData:any = {}
        newData._selected = false
        newData._iconColor = this.data.inactiveIconColor || (target._currentTheme === 'light' ? 'rgba(0, 0, 0, 0.54)' : 'rgba(255, 255, 255, 0.7)')
        newData._hideInactiveAction = !!target._hideInactiveAction
        let currentValue = this.data.value
        if (!this._propIsSet || !this._propIsSet.showLabel) {
          newData.showLabel = target.data.showLabels
        }
        if (!this._propIsSet || !this._propIsSet.value) {
          newData.value = this._defaultValue
          currentValue = newData.value
        }
        if (currentValue === target.data.value) {
          newData._selected = true
          newData._iconColor = this.data.activeIconColor || (target._currentTheme === 'light' ? '#1976d2' : '#90caf9')
        }
        this.setData(newData)
      }
    },
    _Select(e) {
      const target = this._navigationComp
      if (target) {
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
  },
})
