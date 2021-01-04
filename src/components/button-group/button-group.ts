import muiBase from '../../behaviors/muiBase.ts'
import muiController from '../../behaviors/muiController.ts'
import {debounce} from '../../common/utils.ts'

Component({
  behaviors: [muiBase, muiController],
  properties: {
    color: {
      type: String,
      value: 'default',
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    disableElevation: {
      type: Boolean,
      value: false,
    },
    disableRipple: {
      type: Boolean,
      value: false,
    },
    fullWidth: {
      type: Boolean,
      value: false,
    },
    orientation: {
      type: String,
      value: 'horizontal',
    },
    size: {
      type: String,
      value: 'medium',
    },
    variant: {
      type: String,
      value: 'outlined',
    },
  },
  data: {
    _pureButtons: [],
  },
  lifetimes: {
    created() {
      if (!this._ArrangeButtons) {
        this._ArrangeButtons = debounce(() => {
          const newButtons = this.data._pureButtons
          if (newButtons.length > 0) {
            newButtons.forEach(item => {
              item._ReRenderControlledProps()
            })
          }
        }, 50)
      }
    }
  },
  relations: {
    '../button/button': {
      type: 'child',
      linked(target) {
        if (target) {
          this.data._pureButtons.push(target)
          this.setData({_pureButtons: this.data._pureButtons})
        }
      },
      unlinked(target) {
        const _targetIndex = this.data._pureButtons.findIndex(item => item === target)
        this.data._pureButtons.splice(_targetIndex, 1)
        this.setData({_pureButtons: this.data._pureButtons})
      },
    }
  },
  observers: {
    'color, disabled, disableElevation, disableRipple, size, variant, _pureButtons': function () {
      if (this._ArrangeButtons) {
        this._ArrangeButtons()
      }
    }
  },
  options: {
    // virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
