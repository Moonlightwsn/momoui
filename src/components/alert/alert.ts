import muiBase from '../../behaviors/muiBase.ts'

const severity2icon = {
  success: 'checkbox-marked-circle-outline',
  info: 'info-outline',
  warning: 'alert-outline',
  error: 'alert-circle-outline'
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
      optionalTypes: [Object],
      value: null,
    },
    color: {
      type: String,
      value: null,
    },
    icon: {
      type: Boolean,
      optionalTypes: [String, Object],
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
    severity: {
      type: String,
      value: 'success',
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
    _showIconStyle: '',
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
    _setIcon(severity) {
      this.setData({icon: severity2icon[severity] || 'success'})
    },
    _close(e) {
      const {onClose} = this.data
      if (onClose && typeof onClose === 'function') {
        onClose(e, this.dataset)
      }
    }
  },
  observers: {
    'icon, severity': function (icon, severity) {
      if (typeof icon !== 'boolean' && !icon) {
        this._setIcon(severity)
      }
      if (typeof icon === 'boolean' && !icon) {
        this.setData({_showIconStyle: 'display: none;'})
      }
    },
    'onClose, closeText': function (onClose, closeText) {
      if (onClose || closeText) {
        this.setData({_hasAction: true})
      } else {
        this.setData({_hasAction: false})
      }
    },
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
    multipleSlots: true,
  },
})
