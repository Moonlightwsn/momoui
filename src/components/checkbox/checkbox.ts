import muiBase from '../../behaviors/muiBase.ts'
import muiController from '../../behaviors/muiController.ts'
import checkController from '../../behaviors/checkController.ts'

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
      value: {checked: 'square-check-fill', unchecked: 'square'},
    },
    indeterminate: {
      type: Boolean,
      value: false,
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
        }
      },
      unlinked() {
        this._formControlLabelComp = undefined
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
    indeterminate(indeterminate) {
      if (indeterminate) {
        this.setData({icon: {checked: 'square-indeterminate-fill', unchecked: 'square'}})
      }
    }
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  }
})
