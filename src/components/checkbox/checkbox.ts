import muiBase from '../../behaviors/muiBase.ts'

Component({
  behaviors: [muiBase],
  properties: {
    checked: {
      type: Boolean,
      value: null,
    },
    checkedIcon: {
      type: String,
      value: 'square-check-fill',
    },
    color: {
      type: String,
      value: 'secondary',
    },
    defaultChecked: {
      type: Boolean,
      value: false,
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    icon: {
      type: String,
      value: 'square',
    }
  },
  data: {
    _checked: false,
  },
  lifetimes: {
    attached() {
      const {checked, defaultChecked} = this.data
      if (typeof checked !== 'boolean' && defaultChecked) {
        this.setData({
          _checked: defaultChecked,
        })
      }
    }
  },
  methods: {
    _checkControol() {
      const {checked, _checked} = this.data
      this.triggerEvent('change', {checked: !_checked})
      if (typeof checked !== 'boolean') {
        this.setData({
          _checked: !_checked,
        })
      }
    }
  },
  observers: {
    checked(checked) {
      this.setData({
        _checked: checked
      })
    }
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  }
})
