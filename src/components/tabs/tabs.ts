import muiBase from '../../behaviors/muiBase.ts'
import {debounce} from '../../common/utils.ts'

Component({
  behaviors: [muiBase],
  properties: {
    centered: {
      type: Boolean,
      value: false,
    },
    indicatorColor: {
      type: String,
      value: 'secondary',
    },
    onChange: {
      // @ts-ignore
      type: Function,
      value: null,
    },
    orientation: {
      type: String,
      value: 'horizontal',
    },
    textColor: {
      type: String,
      value: 'inherit',
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
  },
  data: {
    _pureTabs: [],
  },
  lifetimes: {
    created() {
      if (!this._ArrangeTabs) {
        this._ArrangeTabs = debounce(() => {
          const newTabs = this.data._pureTabs
          if (newTabs.length > 0) {
            newTabs.forEach((item, index) => {
              item._defaultValue = index
              item._ReRenderControlledProps()
            })
          }
        }, 50)
      }
    },
  },
  relations: {
    '../tab/tab': {
      type: 'descendant',
      linked(target) {
        if (target) {
          this.data._pureTabs.push(target)
          this.setData({_pureTabs: this.data._pureTabs})
        }
      },
      unlinked(target) {
        const _targetIndex = this.data._pureTabs.findIndex(item => item === target)
        this.data._pureTabs.splice(_targetIndex, 1)
        this.setData({_pureTabs: this.data._pureTabs})
      }
    }
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
    value() {
      if (this._ArrangeTabs) {
        this._ArrangeTabs()
      }
    },
  },
  options: {
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
