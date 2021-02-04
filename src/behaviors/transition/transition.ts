import transitionTypeMap from '../../common/transitionTypeMap.ts'

const transitionPeriod = ['enter', 'exit']

export default Behavior({
  properties: {
    transitions: {
      type: Array,
      value: [],
    },
    transitionDelay: {
      type: Number,
      optionalTypes: [Object],
      value: 0,
    },
    transitionDuration: {
      type: Number,
      optionalTypes: [Object],
      value: 225,
    },
    transitionType: {
      type: String,
      value: null,
    },
  },
  data: {
    _enterStyle: '',
    _exitStyle: '',
    _startStyle: '',
    _endStyle: '',
  },
  methods: {
    ______GenTransitionsStyle(transitionProps, keepPrevStyles) {
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
        newData._startStyle = transitionTypeMap[type].start || (keepPrevStyles ? this.data._startStyle : '')
        newData._endStyle = transitionTypeMap[type].end || (keepPrevStyles ? this.data._endStyle : '')
      }
      realTransition.forEach(item => {
        transitionPeriod.forEach(period => {
          const transitionProps = item
          const {
            property,
            duration = defaultDuration,
            delay = defaultDelay,
            timingFunction = defaultTimingFunction,
          } = transitionProps
          if (property) {
            let realProperty = property
            if (property[period]) {
              realProperty = property[period]
            }
            let realDuration = duration
            if (duration[period]) {
              realDuration = duration[period]
            }
            if (typeof realDuration === 'function') {
              realDuration = realDuration(defaultDuration)
            }
            let realDelay = delay
            if (delay[period]) {
              realDelay = delay[period]
            }
            if (typeof realDelay === 'function') {
              realDelay = realDelay(defaultDelay)
            }
            let realTimingFunction = timingFunction
            if (timingFunction[period]) {
              realTimingFunction = timingFunction[period]
            }
            const thisTransition = `${realProperty} ${realDuration}ms ${realTimingFunction} ${realDelay}ms`
            if (newData[`_${period}Style`]) {
              newData[`_${period}Style`] = `${newData._enterStyle}, ${thisTransition}`
            } else {
              newData[`_${period}Style`] = `transition: ${thisTransition}`
            }
          }
        })
      })
      transitionPeriod.forEach(period => {
        if (newData[`_${period}Style`]) {
          newData[`_${period}Style`] = `${newData[`_${period}Style`]};`
        }
      })
      if (Object.keys(newData).length > 0) {
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
        this.______GenTransitionsStyle({
          transition,
          delay: transitionDelay,
          duration: transitionDuration,
          type: transitionType || undefined,
        }, true)
      }
    }
  },
  observers: {
    'transition,transitionDelay,transitionDuration,transitionType': function (transitions, delay, duration, type) {
      this.______GenTransitionsStyle({
        transitions,
        delay,
        duration,
        type: type || undefined,
      })
    },
  },
})
