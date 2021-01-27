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

const defaultIcon = {checked: 'radiobox-marked', unchecked: 'radiobox-blank'}

Component({
  behaviors: [muiBase, muiController, checkController],
  data: {
    _pureOneWay: true,
  },
  lifetimes: {
    created() {
      this.defaultIcon = defaultIcon
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
    '../radio-group/radio-group': {
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
  },
  methods: {
    _ReRenderControlledProps() {
      const target = this._formControlLabelComp
      if (target && Array.isArray(controlledProps)) {
        const newData = {}
        controlledProps.forEach(item => {
          if (!this._propIsSet || !this._propIsSet[item]) {
            if (item === 'value' && this._group) {
              this._group._Linked(this, target.data[item])
            }
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
    ...ObserversForControlledPropsByAncestor(controlledProps),
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  }
})
