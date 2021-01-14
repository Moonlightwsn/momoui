import muiBase from '../../behaviors/muiBase.ts'
import {debounce} from '../../common/utils.ts'

Component({
  behaviors: [muiBase],
  properties: {
    centered: {
      type: Boolean,
      value: false,
    },
    indicatorColor: {
      type: String,
      value: 'secondary',
    },
    onChange: {
      // @ts-ignore
      type: Function,
      value: null,
    },
    orientation: {
      type: String,
      value: 'horizontal',
    },
    textColor: {
      type: String,
      value: 'inherit',
    },
    value: {
      type: String,
      optionalTypes: [Number, Array, Object],
      value: null,
    },
    variant: {
      type: String,
      value: 'standard',
    },
  },
  data: {
    _pureTabs: [],
    _indicatorStyle: '',
    _translateX: 0,
  },
  lifetimes: {
    created() {
      if (!this._ArrangeTabs) {
        this._ArrangeTabs = debounce(() => {
          const newTabs = this.data._pureTabs
          if (newTabs.length > 0) {
            newTabs.forEach((item, index) => {
              item._defaultValue = index
              item._ReRenderControlledProps()
            })
          }
        }, 50)
      }
    },
  },
  relations: {
    '../tab/tab': {
      type: 'descendant',
      linked(target) {
        if (target) {
          this.data._pureTabs.push(target)
          this.setData({_pureTabs: this.data._pureTabs})
        }
      },
      unlinked(target) {
        const _targetIndex = this.data._pureTabs.findIndex(item => item === target)
        this.data._pureTabs.splice(_targetIndex, 1)
        this.setData({_pureTabs: this.data._pureTabs})
      },
    },
  },
  methods: {
    _AdjustTabsOffset(activeIndex, tabsLeft, tabLeft, tabsRight, tabRight) {
      const lastActiveIndex = this._lastActiveIndex || 0
      let _translateX = 0
      if (lastActiveIndex < activeIndex && tabsRight < tabRight) {
        _translateX = this.data._translateX + (tabsRight - tabRight)
      } else if (lastActiveIndex > activeIndex && tabsLeft > tabLeft) {
        _translateX = this.data._translateX + (tabsLeft - tabLeft)
      }
      this._lastActiveIndex = activeIndex
      return _translateX
    },
    _QueryTabsScroller() {
      return new Promise((resolve) => {
        const query = this.createSelectorQuery()
        query.select('.mui-tabs-scroller').fields({
          rect: true,
        })
        // query.selectViewport().scrollOffset()
        query.exec(res => {
          const [view/* , viewPort */] = res || {}
          const {left = 0, right = 0} = view || {}
          // const {scrollLeft = 0} = viewPort || {}
          const queryRes = {left, right}
          resolve(queryRes)
        })
      })
    },
    _ComputeIndicatorPosition(activeIndex) {
      Promise.all([this._QueryTabsScroller(), this.data._pureTabs[activeIndex]._QueryTab()]).then((values: any) => {
        const [tabsView, tabView] = values
        const {left: tabsLeft = 0, right: tabsRight} = tabsView || {}
        const {left: tabLeft = 0, right: tabRight, width: tabWidth = 0} = tabView || {}
        const IndicatorOffset = tabLeft - tabsLeft
        const indicatorWidth = tabWidth
        const _translateX = this._AdjustTabsOffset(activeIndex, tabsLeft, tabLeft, tabsRight, tabRight)
        this.setData({
          _indicatorStyle: `left: ${IndicatorOffset}px; width: ${indicatorWidth}px;`,
          _translateX,
        })
      }).catch(e => console.log(e))
      /*
      Promise.all(this.data._pureTabs.map(item => item._QueryTab())).then((values: any) => {
        if (activeIndex < values.length) {
          let offset = 0
          const {width} = values[activeIndex]
          for (let i = 0; i < activeIndex; i += 1) {
            if (i === 0) {
              console.log(values[i].scrollLeft)
              offset += Number(values[i].scrollLeft)
            }
            offset += Number(values[i].width)
          }
          this.setData({
            _indicatorStyle: `left: ${offset}px; width: ${width}px;`
          })
        }
      }).catch(e => console.log(e))
      */
    },
    _onChange(e, value) {
      const {onChange} = this.data
      if (onChange && typeof onChange === 'function') {
        e.detail.current = value
        onChange(e)
      }
    },
  },
  observers: {
    'value, _pureTabs': function () {
      if (this._ArrangeTabs) {
        this._ArrangeTabs()
      }
    },
  },
  options: {
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
