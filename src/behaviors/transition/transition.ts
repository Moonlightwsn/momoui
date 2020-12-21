import transitionType from '../../common/transitionType.ts'

export default Behavior({
  properties: {
    transitions: {
      type: Array,
      value: [],
    },
    transitionDelay: {
      type: Number,
      value: 0,
    },
    transitionDuration: {
      type: Number,
      value: 225,
    },
    transitionType: {
      type: String,
      value: null,
    },
  },
  data: {
    _transitionStyle: '',
  },
  methods: {
    _genTransitionsStyle(transitionProps) {
      this.generatedTransitionStyle = true
      const {transitions = [], delay: defaultDelay = 0, duration: defaultDuration = 225, type} = transitionProps
      const defaultTimingFunction = 'cubic-bezier(0.4, 0, 0.2, 1)'
      let realTransition
      if (Array.isArray(transitions) && transitions.length > 0) {
        realTransition = transitions
      } else {
        realTransition = transitionType[type] ? transitionType[type].transition : []
      }
      let _transitionStyle
      realTransition.forEach(item => {
        const {
          property,
          duration = defaultDuration,
          timingFunction = defaultTimingFunction,
          delay = defaultDelay,
        } = item
        if (property) {
          const thisTransition = `${property} ${duration}ms ${timingFunction} ${delay}ms`
          if (_transitionStyle) {
            _transitionStyle = `${_transitionStyle}, ${thisTransition}`
          } else {
            _transitionStyle = `transition: ${thisTransition}`
          }
        }
      })
      if (_transitionStyle) {
        this.setData({_transitionStyle: `${_transitionStyle};`})
      }
    }
  },
  lifetimes: {
    attached() {
      if (!this.generatedTransitionStyle) {
        const {
          transition,
          transitionDelay,
          transitionDuration,
          transitionType,
        } = this.data
        this._genTransitionsStyle({
          transition,
          delay: transitionDelay,
          duration: transitionDuration,
          type: transitionType || undefined,
        })
      }
    }
  },
  observers: {
    'transition,transitionDelay,transitionDuration,transitionType': function (transitions, delay, duration, type) {
      this._genTransitionsStyle({
        transitions,
        delay,
        duration,
        type: type || undefined,
      })
    },
  },
})
