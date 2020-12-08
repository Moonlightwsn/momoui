import {openTypeMap} from '../common/utils.ts'

export default Behavior({
  methods: {
    _openTypeEvent(e) {
      const {openType} = this.data
      this.triggerEvent(openTypeMap[openType], e.detail, {
        bubbles: true,
        composed: true,
        capturePhase: false,
      })
    },
  },
})
