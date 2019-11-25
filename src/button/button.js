import rippleBehaviors from '../ripple/behaviors'

const rippleBackgroundColorMap = {
  default: '#707070',
  primary: '#1976d2',
  secondary: '#dc004e',
}

const iconColorMap = {
  'default-contained': 'rgba(0, 0, 0, 0.87)',
  'default-outlined': 'rgba(0, 0, 0, 0.87)',
  'default-text': '#707070',
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
    mClass: String,
    mStyle: String,
    color: {
      type: String,
      value: 'default',
    },
    shape: {
      type: String,
      value: 'normal',
    },
    icon: String,
    customIconColor: String,
    customIconSize: Number,
    customIconStyle: String,
    size: {
      type: String,
      value: 'medium',
    },
    variant: {
      type: String,
      value: 'contained',
    },
    openType: {
      type: String,
      value: '',
    },
    appParameter: {
      type: String,
      value: '',
    },
    sessionFrom: {
      type: String,
      value: '',
    },
    sendMessageTitle: {
      type: String,
      value: ''
    },
    sendMessagePath: {
      type: String,
      value: ''
    },
    sendMessageImg: {
      type: String,
      value: ''
    },
    showMessageCard: {
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
        shape,
        customIconColor,
        customIconSize,
      } = this.properties
      if (variant !== 'contained') {
        this.data.rippleBackgroundColor = rippleBackgroundColorMap[this.properties.color]
      }
      let iconSize
      let centerRipple
      if (shape === 'circle') {
        iconSize = 24
        centerRipple = true
      } else {
        iconSize = iconSizeMap[size]
        centerRipple = false
      }
      if (customIconSize) {
        iconSize = customIconSize
      }
      this.setData({
        iconColor: customIconColor || iconColorMap[`${color}-${variant}`],
        iconSize,
        centerRipple,
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
        this.triggerEvent(this.data.openTypeMap[this.properties.openType], e)
      }
    },
    _launchAppError(e) {
      if (!this.properties.disabled) {
        this.triggerEvent('error', e)
      }
    }
  },
  options: {
    styleIsolation: 'shared',
  },
})
