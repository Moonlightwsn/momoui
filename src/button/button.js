import rippleBehaviors from '../ripple/behaviors'

const rippleBackgroundColorMap = {
  default: null,
  primary: '#1976d2',
  secondary: '#dc004e',
}

const iconColorMap = {
  default: 'rgba(0, 0, 0, 0.87)',
  primary: '#ffffff',
  secondary: '#ffffff',
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
    color: {
      type: String,
      value: 'default',
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
      const {variant, color, size} = this.properties
      if (variant !== 'contained') {
        this.rippleBackgroundColor = rippleBackgroundColorMap[this.properties.color]
      }
      this.setData({
        iconColor: iconColorMap[color],
        iconSize: iconSizeMap[size],
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
