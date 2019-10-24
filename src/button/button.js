import rippleBehaviors from '../ripple/behaviors'

const rippleBackgroundColorMap = {
  default: null,
  primary: '#1976d2',
  secondary: '#dc004e',
}

const iconColorMap = {
  'default-contained': 'rgba(0, 0, 0, 0.87)',
  'default-outlined': 'rgba(0, 0, 0, 0.87)',
  'default-text': 'rgba(0, 0, 0, 0.87)',
  'primary-contained': '#ffffff',
  'primary-outlined': '#1976d2',
  'primary-text': '#1976d2',
  'secondary-contained': '#ffffff',
  'secondary-outlined': '#dc004e',
  'secondary-text': '#dc004e',
}

const iconSizeMap = {
  small: 18,
  medium: 20,
  large: 22,
}

Component({
  behaviors: [rippleBehaviors],
  properties: {
    disabled: {
      type: Boolean,
      value: false,
    },
    mstyle: String,
    color: {
      type: String,
      value: 'default',
    },
    shape: {
      type: String,
      value: 'normal',
    },
    icon: String,
    size: {
      type: String,
      value: 'medium',
    },
    variant: {
      type: String,
      value: 'contained',
    },
    opentype: {
      type: String,
      value: '',
    },
    appparameter: {
      type: String,
      value: '',
    },
    sessionfrom: {
      type: String,
      value: '',
    },
    sendmessagetitle: {
      type: String,
      value: ''
    },
    sendmessagepath: {
      type: String,
      value: ''
    },
    sendmessageimg: {
      type: String,
      value: ''
    },
    showmessagecard: {
      type: String,
      value: '',
    }
  },
  data: {
    variantMap: {
      text: 'mui-button-text',
      contained: 'mui-button-contained',
      outlined: 'mui-button-outlined'
    },
    colorMap: {
      default: 'mui-button-default',
      primary: 'mui-button-primary',
      secondary: 'mui-button-secondary',
    },
    sizeMap: {
      medium: 'mui-button-medium',
      small: 'mui-button-small',
      large: 'mui-button-large',
    },
    openTypeMap: {
      contact: 'contact',
      getPhoneNumber: 'getphonenumber',
      getUserInfo: 'getuserinfo',
      openSetting: 'opensetting',
      launchApp: 'launchapp',
    },
    iconSize: {
      type: Number,
      value: 20,
    },
    iconColor: {
      type: String,
      value: '#ffffff',
    }
  },
  lifetimes: {
    attached() {
      const {
        variant,
        color,
        size,
        shape
      } = this.properties
      if (variant !== 'contained') {
        this.rippleBackgroundColor = rippleBackgroundColorMap[this.properties.color]
      }
      let iconSize
      let centerripple
      if (shape === 'circle') {
        iconSize = 24
        centerripple = true
      } else {
        iconSize = iconSizeMap[size]
        centerripple = false
      }
      this.setData({
        iconColor: iconColorMap[`${color}-${variant}`],
        iconSize,
        centerripple,
      })
    }
  },
  relations: {
    '../button-group/button-group': {
      type: 'parent',
    },
  },
  methods: {
    _openTypeEvent(e) {
      if (!this.properties.disabled) {
        this.triggerEvent(this.data.openTypeMap[this.properties.opentype], e)
      }
    },
    _launchAppError(e) {
      if (!this.properties.disabled) {
        this.triggerEvent('error', e)
      }
    }
  },
  options: {
    styleIsolation: 'shared'
  }
})
