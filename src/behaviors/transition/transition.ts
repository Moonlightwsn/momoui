import transitionTypeMap from '../../common/transitionTypeMap.ts'

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
    _startStyle: '',
    _endStyle: '',
  },
  methods: {
    _genTransitionsStyle(transitionProps) {
      this.generatedTransitionStyle = true
      const newData: any = {}
      const {
        transitions = [],
        delay: defaultDelay = 0,
        duration: defaultDuration = 225,
        type
      } = transitionProps
      const defaultTimingFunction = 'cubic-bezier(0.4, 0, 0.2, 1)'
      let realTransition = []
      if (Array.isArray(transitions) && transitions.length > 0) {
        realTransition = transitions
      } else if (type && transitionTypeMap[type]) {
        realTransition = transitionTypeMap[type].transition
        const {_startStyle, _endStyle} = this.data
        newData._startStyle = _startStyle || transitionTypeMap[type].start
        newData._endStyle = _endStyle || transitionTypeMap[type].end
      }
      realTransition.forEach(item => {
        let {
          duration = defaultDuration,
          delay = defaultDelay,
        } = item
        const {
          property,
          timingFunction = defaultTimingFunction,
        } = item
        if (property) {
          if (typeof duration === 'function') {
            duration = duration(defaultDuration)
          }
          if (typeof delay === 'function') {
            delay = delay(defaultDelay)
          }
          const thisTransition = `${property} ${duration}ms ${timingFunction} ${delay}ms`
          if (newData._transitionStyle) {
            newData._transitionStyle = `${newData._transitionStyle}, ${thisTransition}`
          } else {
            newData._transitionStyle = `transition: ${thisTransition}`
          }
        }
      })
      if (newData._transitionStyle) {
        newData._transitionStyle = `${newData._transitionStyle};`
      }
      if (Object.keys(newData).length > 0) {
        console.log(newData)
        this.setData(newData)
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
