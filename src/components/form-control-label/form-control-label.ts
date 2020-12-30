import muiBase from '../../behaviors/muiBase.ts'

Component({
  behaviors: [muiBase],
  properties: {
    disabled: {
      type: Boolean,
      value: false,
    },
    label: {
      type: String,
      value: null,
    },
    labelPlacement: {
      type: String,
      value: 'end',
    },
    onChange: {
      // @ts-ignore
      type: Function,
      value: null,
    },
    value: {
      type: String,
      value: null,
    },
  },
  relations: {
    '../radio/radio': {
      type: 'descendant',
    }
  },
  observers: {
    'checked, disabled, onChange, value': function () {
      if (this._formItems) {
        this._formItems.forEach(item => {
          item.target._ReRenderControlledProps()
        })
      }
    }
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
    multipleSlots: true,
  },
})
