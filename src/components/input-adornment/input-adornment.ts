import muiBase from '../../behaviors/muiBase.ts'

Component({
  behaviors: [muiBase],
  properties: {
    text: {
      type: String,
      value: null,
    },
    position: {
      type: String,
      value: 'none',
    },
  },
  relations: {
    '../input/input': {
      type: 'ancestor',
      linked(target) {
        if (target) {
          this._inputComp = target
        }
      },
      unlinked() {
        this._inputComp = undefined
      },
    },
    '../select/select': {
      type: 'ancestor',
      linked(target) {
        if (target) {
          this._inputComp = target._GetSelectInput()
        }
      },
      unlinked() {
        this._inputComp = undefined
      },
    },
  },
  observers: {
    position(position) {
      if (this._inputComp && this._inputComp._hasLinkedToInputAdornment) {
        this._inputComp._permanentShrink = position === 'start'
        const shrink = !!this._inputComp.data.value
        this._inputComp._SetInputLabelShrink(shrink)
      }
    },
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  }
})
