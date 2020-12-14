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
      value: null,
    },
    closeIcon: {
      type: String,
      value: null,
    },
    closeIconProps: {
      type: Object,
      value: {},
    },
    color: {
      type: String,
      value: 'success'
    },
    icon: {
      type: Boolean,
      optionalTypes: [String],
      value: null,
    },
    iconProps: {
      type: Object,
      value: {},
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
  data: {
    _hasAction: false,
  },
  lifetimes: {
    attached() {
      const {icon, color} = this.data
      if (typeof icon !== 'boolean' && !icon) {
        this._setIcon(color)
      }
    },
  },
  methods: {
    _setIcon(color) {
      this.setData({icon: color2icon[color] || 'info'})
    },
    _close(e) {
      const {onClose} = this.data
      if (onClose && typeof onClose === 'function') {
        onClose(e)
      }
    }
  },
  observers: {
    'color, icon': function (color, icon) {
      if (typeof icon !== 'boolean' && !icon) {
        this._setIcon(color)
      }
    },
    'onClose, closeText': function (onClose, closeText) {
      if (onClose || closeText) {
        this.setData({_hasAction: true})
      } else {
        this.setData({_hasAction: false})
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
