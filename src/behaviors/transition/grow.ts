import {grow} from '../../common/transitionType.ts'

export default Behavior({
  behaviors: [transition],
  properties: {
    transitions: {
      type: Array,
      value: grow.transitions,
    },
  },
  data: {
    _startStyle: grow.start,
    _endStyle: grow.end,
  }
})
