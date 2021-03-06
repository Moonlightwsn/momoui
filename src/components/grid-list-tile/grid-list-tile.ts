import muiBase from '../../behaviors/muiBase.ts'

Component({
  behaviors: [muiBase],
  properties: {
    cols: {
      type: Number,
      value: 1,
    },
    rows: {
      type: Number,
      value: 1,
    },
  },
  data: {
    _innerStyles: '',
  },
  relations: {
    '../grid-list/grid-list': {
      type: 'parent',
      linked(target) {
        if (target) {
          const {cols: thisCols, rows: thisRows} = this.data
          const {data: {cols: targetCols, spacing, cellHeight} = {}} = target
          let realCellHeigth = 'height:auto'
          if (typeof cellHeight === 'number') {
            realCellHeigth = `height:${cellHeight * thisRows + spacing}px`
          }
          const padding = spacing / 2
          const _innerStyles = `width:${(thisCols / targetCols) * 100}%;${realCellHeigth};padding:${padding}px;`
          this.setData({
            _innerStyles
          })
        }
      }
    }
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
