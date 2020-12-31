import muiBase from '../../behaviors/muiBase.ts'
import muiController from '../../behaviors/muiController.ts'

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
  relations: {
    '../button/button': {
      type: 'child',
      linked(target) {
        if (target) {
          if (!this.buttonChildren) {
            this.buttonChildren = []
          }
          this.buttonChildren.push(target)
        }
      },
    }
  },
  observers: {
    'color, disabled, disableElevation, disableRipple, size, variant': function () {
      if (this._formItems) {
        this._formItems.forEach(item => {
          item.target._ReRenderControlledProps()
        })
      }
    }
  },
  options: {
    // virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
