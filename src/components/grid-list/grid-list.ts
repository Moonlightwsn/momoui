import muiBase from '../../behaviors/muiBase.ts'

Component({
  behaviors: [muiBase],
  properties: {
    cellHeight: {
      type: Number,
      optionalTypes: [String],
      value: 180,
    },
    cols: {
      type: Number,
      value: 2,
    },
    spacing: {
      type: Number,
      value: 4,
    }
  },
  relations: {
    '../grid-list-tile/grid-list-tile': {
      type: 'child',
    }
  },
  options: {
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
