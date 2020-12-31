import muiBase from '../../behaviors/muiBase.ts'
import rippleBase from '../../behaviors/rippleBase.ts'
import openType from '../../behaviors/openType.ts'

Component({
  behaviors: [muiBase, rippleBase, openType, 'wx://form-field-button'],
  properties: {
    appParameter: {
      type: String,
      value: '',
    },
    component: {
      type: String,
      value: 'view',
    },
    disabled: {
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
    lang: {
      type: String,
      value: 'en',
    },
    openType: {
      type: String,
      value: ''
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
  },
  observers: {
  },
  options: {
    // virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  }
})
