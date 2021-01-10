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

Component({
  behaviors: [muiBase, muiController, checkController],
  properties: {
    icon: {
      type: Object,
      value: {checked: 'radio-box', unchecked: 'round'},
    },
  },
  data: {
    _pureOneWay: true,
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
