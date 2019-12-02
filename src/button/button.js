import rippleBehaviors from '../ripple/behaviors'
import {rippleBackgroundColorMap} from '../utils/utils'

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

const circleProgressSize = {
  small: 40,
  medium: 48,
  large: 56,
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
    loading: {
      type: Boolean,
      value: false,
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
    },
    formType: String,
  },
  data: {
    innerDisabled: false,
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
    iconSize: 20,
    progressSize: 20,
    iconColor: '#ffffff',
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
      let iconSize = iconSizeMap[size]
      let progressSize = iconSize
      let centerRipple

      if (shape === 'circle') {
        iconSize += 4
        progressSize = circleProgressSize[size]
        centerRipple = true
      } else {
        centerRipple = false
      }
      if (customIconSize) {
        iconSize = customIconSize
      }
      const iconColor = customIconColor || iconColorMap[`${color}-${variant}`]
      this.setData({
        iconColor,
        iconSize,
        progressSize,
        centerRipple,
      })
    }
  },
  relations: {
    '../button-group/button-group': {
      type: 'parent',
    },
    '../form/form': {
      type: 'ancestor',
      linked(target) {
        const {formType} = this.properties
        if (formType) {
          this.form = target
        }
      },
      unlinked() {
        this.form = null
      },
    },
  },
  methods: {
    _openTypeEvent(e) {
      const {disabled} = this.properties
      const {innerDisabled} = this.properties
      if (!disabled && !innerDisabled) {
        this.triggerEvent(this.data.openTypeMap[this.properties.openType], e)
      }
    },
    _launchAppError(e) {
      const {disabled} = this.properties
      const {innerDisabled} = this.properties
      if (!disabled && !innerDisabled) {
        this.triggerEvent('error', e)
      }
    },
    _tap(e) {
      const {formType} = this.properties
      if (formType) {
        if (this.form && this.form.data._targetList) {
          const formValues = {}
          this.form.data._targetList.forEach(item => {
            const {value, name} = item.data
            if (name) {
              formValues[name] = value
            }
          })
          this.triggerEvent(formType, {values: formValues}, {bubbles: true, composed: true})
        }
      }
      this.rippleClick(e)
    },
  },
  observers: {
    'color, variant, customIconColor': function (color, variant, customIconColor) {
      this.setData({
        iconColor: customIconColor || iconColorMap[`${color}-${variant}`],
      })
    },
    loading(loading) {
      this.setData({
        innerDisabled: loading,
      })
    },
  },
  options: {
    styleIsolation: 'shared',
  },
})
