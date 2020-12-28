import muiBase from '../../behaviors/muiBase.ts'
import {ObserversForControlledPropsByAncestor} from '../../common/utils.ts'

const beControlledProps: string[] = [
  'color',
  'disabled',
  'error',
  'filled',
  'focus',
  'required',
]

Component({
  behaviors: [muiBase],
  properties: {
    color: {
      type: String,
      value: 'primary',
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    error: {
      type: Boolean,
      value: false,
    },
    filled: {
      type: Boolean,
      value: false,
    },
    focus: {
      type: Boolean,
      value: false,
    },
    required: {
      type: Boolean,
      value: false,
    },
  },
  relations: {
    '../form-control/form-control': {
      type: 'ancestor',
      linked(target) {
        if (target && Array.isArray(beControlledProps)) {
          const newData = {}
          beControlledProps.forEach(item => {
            if (!this._propIsSet || !this._propIsSet[item]) {
              newData[item] = target.data[item]
            }
          })
          console.log(newData)
          if (Object.keys(newData).length > 0) {
            this.setData(newData)
          }
        }
      }
    }
  },
  observers: {
    ...ObserversForControlledPropsByAncestor(beControlledProps),
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
