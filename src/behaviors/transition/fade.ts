import transition from '../../behaviors/transition/transition.ts'
import {fade} from '../../common/transitionType.ts'

export default Behavior({
  behaviors: [transition],
  properties: {
    transitions: {
      type: Array,
      value: fade.transitions,
    },
  },
  data: {
    _startStyle: fade.start,
    _endStyle: fade.end,
  }
})
