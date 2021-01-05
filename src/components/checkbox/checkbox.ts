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
    checkedIcon: {
      type: String,
      value: 'square-check-fill',
    },
    icon: {
      type: String,
      value: 'square',
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
        this.setData({checkedIcon: 'square-indeterminate-fill'})
      }
    }
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  }
})
