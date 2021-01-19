export default Behavior({
  properties: {
    scrollX: {
      type: Boolean,
      value: false,
    },
    scrollY: {
      type: Boolean,
      value: true,
    },
    upperThreshold: {
      type: Number,
      value: 50,
    },
    lowerThreshold: {
      type: Number,
      value: 50,
    },
    scrollTop: {
      type: Number,
      value: null,
    },
    scrollLeft: {
      type: Number,
      value: null,
    },
    scrollIntoView: {
      type: String,
      value: null,
    },
    scrollWithAnimation: {
      type: Boolean,
      value: false,
    },
    enableBackToTop: {
      type: Boolean,
      value: false,
    },
    enableFlex: {
      type: Boolean,
      value: true,
    },
    scrollAnchoring: {
      type: Boolean,
      value: false,
    },
    refresherEnabled: {
      type: Boolean,
      value: false,
    },
    refresherThreshold: {
      type: Number,
      value: 45,
    },
    refresherDefaultStyle: {
      type: String,
      value: 'black',
    },
    refresherBackground: {
      type: String,
      value: '#FFF',
    },
    refresherTriggered: {
      type: Boolean,
      value: false,
    },
    enhanced: {
      type: Boolean,
      value: false,
    },
    bounces: {
      type: Boolean,
      value: true,
    },
    showScrollbar: {
      type: Boolean,
      value: true,
    },
    pagingEnabled: {
      type: Boolean,
      value: false,
    },
    fastDeceleration: {
      type: Boolean,
      value: false,
    },
  },
  methods: {
    _scroll(e) {
      this.triggerEvent('scroll', e.detail, {
        bubbles: true,
        composed: true,
        capturePhase: false,
      })
    }
  }
})
