import muiBase from '../../behaviors/muiBase.ts'
import muiController from '../../behaviors/muiController.ts'
import checkController from '../../behaviors/checkController.ts'

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
