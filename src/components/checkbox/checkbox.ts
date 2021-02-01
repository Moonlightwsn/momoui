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

const defaultIcon = {checked: 'checkbox-marked', unchecked: 'checkbox-blank-outline'}

Component({
  behaviors: [muiBase, muiController, checkController],
  properties: {
    indeterminate: {
      type: Boolean,
      value: false,
    }
  },
  lifetimes: {
    created() {
      this.defaultIcon = defaultIcon
      this.controlledProps = controlledProps
    }
  },
  relations: {
    '../checkbox-group/checkbox-group': {
      type: 'ancestor',
      linked(target) {
        if (target) {
          this._group = target
        }
      },
      unlinked() {
        this._group = undefined
      },
    },
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
    indeterminate(indeterminate) {
      if (indeterminate) {
        const {icon} = this.data
        this.setData({icon: {...icon, checked: 'checkbox-intermediate'}})
      }
    }
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  }
})
