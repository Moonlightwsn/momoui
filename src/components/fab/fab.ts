import muiBase from '../../behaviors/muiBase.ts'

Component({
  behaviors: [muiBase],
  properties: {
    appParameter: {
      type: String,
      value: '',
    },
    color: {
      type: String,
      value: 'default',
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    disableRipple: {
      type: Boolean,
      value: false,
    },
    formType: {
      type: String,
      value: ''
    },
    hoverClass: {
      type: String,
      value: '',
    },
    hoverStopPropagation: {
      type: Boolean,
      value: false,
    },
    hoverStartTime: {
      type: Number,
      value: 20,
    },
    hoverStayTime: {
      type: Number,
      value: 70,
    },
    icon: {
      type: String,
      optionalTypes: [Object],
      value: null,
    },
    iconSize: {
      type: Number,
      value: null,
    },
    iconColor: {
      type: String,
      value: null,
    },
    iconPosition: {
      type: String,
      value: 'left',
    },
    iconSpin: {
      type: Boolean,
      value: false,
    },
    lang: {
      type: String,
      value: 'en',
    },
    nativeNodeClass: {
      type: String,
      value: '',
    },
    openType: {
      type: String,
      value: ''
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
    sessionFrom: {
      type: String,
      value: '',
    },
    showMessageCard: {
      type: String,
      value: '',
    },
    size: {
      type: String,
      value: 'large',
    },
    variant: {
      type: String,
      value: 'round',
    },
  },
  observers: {},
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
