import muiBase from '../../behaviors/muiBase.ts'
import muiController from '../../behaviors/muiController.ts'
import checkController from '../../behaviors/checkController.ts'
import {ObserversForControlledPropsByAncestor} from '../../common/utils.ts'

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
    },
  },
  relations: {
    '../form-control-label/form-control-label': {
      type: 'ancestor',
      linked(target) {
        if (target) {
          this._formControlLabelComp = target
          const {checked} = target.data
          if (typeof checked === 'boolean') {
            this._CheckedBeControl(true)
          }
        }
      },
      unlinked() {
        this._formControlLabelComp = undefined
        this._CheckedBeControl(false)
      },
    },
  },
  observers: {
    ...ObserversForControlledPropsByAncestor(controlledProps),
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  }
})
