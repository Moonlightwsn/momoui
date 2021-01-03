import muiBase from '../../behaviors/muiBase.ts'

Component({
  behaviors: [muiBase],
  properties: {
    onChange: {
      // @ts-ignore
      type: Function,
      value: null,
    },
    showLabels: {
      type: Boolean,
      value: false,
    },
    value: {
      type: String,
      optionalTypes: [Number, Array, Object],
      value: null,
    },
  },
  lifetimes: {
    ready() {
      if (this._actions) {
        this._actions.forEach(item => {
          item._ReRenderControlledProps()
        })
      }
    }
  },
  relations: {
    '../bottom-navigation-action/bottom-navigation-action': {
      type: 'descendant',
      linked(target) {
        if (target) {
          if (!this._actions) {
            this._actions = []
          }
          this._actions.push(target)
          target._defaultValue = this._actions.length - 1
          if (this._actions.length > 3) {
            this._hideInactiveAction = true
          }
        }
      },
    },
  },
  methods: {
    _onChange(e, value) {
      const {onChange} = this.data
      if (onChange && typeof onChange === 'function') {
        onChange(e, value)
      }
    },
  },
  observers: {
    'showLabels, value': function () {
      if (this._actions) {
        this._actions.forEach(item => {
          item._ReRenderControlledProps()
        })
      }
    }
  },
  options: {
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
