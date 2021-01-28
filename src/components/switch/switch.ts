import muiBase from '../../behaviors/muiBase.ts'
import muiController from '../../behaviors/muiController.ts'
import checkController from '../../behaviors/checkController.ts'

const controlledProps: string[] = [
  'checked',
  'disabled',
  'onChange',
  'value',
]

const defaultIcon = {checked: 'circle', unchecked: 'circle'}

Component({
  behaviors: [muiBase, muiController, checkController],
  properties: {
    value: {
      type: Boolean,
      value: false,
    }
  },
  data: {
    _pureIsSwitch: true,
  },
  lifetimes: {
    created() {
      this.defaultIcon = defaultIcon
      this.controlledProps = controlledProps
    }
  },
  relations: {
    '../form-control-label/form-control-label': {
      type: 'ancestor',
      linked(target) {
        if (target) {
          this._formControlLabelComp = target
        }
      },
      unlinked() {
        this._formControlLabelComp = undefined
      },
    },
  },
  observers: {},
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  }
})
