import muiBase from '../../behaviors/muiBase.ts'

const color2icon = {
  success: 'check-circle',
  info: 'info',
  warning: 'info',
  error: 'info'
}

Component({
  behaviors: [muiBase],
  properties: {
    closeText: {
      type: String,
      value: 'Close',
    },
    color: {
      type: String,
      value: 'success'
    },
    icon: {
      type: String,
      value: null,
    },
    message: {
      type: String,
    },
    onClose: {
      // @ts-ignore
      type: Function,
      value: null,
    },
    title: {
      type: String,
      value: null,
    },
    variant: {
      type: String,
      value: 'standard',
    }
  },
  lifetimes: {
    attached() {
      const {icon, color} = this.data
      if (!icon && typeof icon !== 'boolean') {
        this._setIcon(color)
      }
    },
  },
  methods: {
    _setIcon(color) {
      this.setData({icon: color2icon[color] || 'info'})
    }
  },
  observers: {
    'color, icon': function (color, icon) {
      if (!icon && typeof icon !== 'boolean') {
        this._setIcon(color)
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
