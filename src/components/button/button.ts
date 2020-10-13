import muiController from '../../behaviors/muiController.ts'
import rippleBase from '../../behaviors/rippleBase.ts'

Component({
  behaviors: [muiController, rippleBase],
  properties: {
    disabled: {
      type: Boolean,
      value: false
    },
    loading: {
      type: Boolean,
      value: false,
    },
    inline: {
      type: Boolean,
      value: true
    },
    color: {
      type: String,
      value: 'default'
    },
    variant: {
      type: String,
      value: 'contained'
    },
    size: {
      type: String,
      value: 'medium'
    },
    shape: {
      type: String,
      value: 'normal'
    },
    formType: {
      type: String,
      value: ''
    },
    openType: {
      type: String,
      value: ''
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
  },
  observers: {
    shape(shape) {
      this.setData({
        _pure_center: shape === 'circle',
      })
    }
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure_/,
    styleIsolation: 'apply-shared',
  },
})
