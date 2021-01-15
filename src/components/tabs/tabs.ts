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
    _showArrow: true,
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
      let _translateX = this.data._translateX
      let _detal = 0
      if (lastActiveIndex < activeIndex && tabsRight < tabRight) {
        _detal = tabsRight - tabRight
        _translateX += _detal
      } else if (lastActiveIndex > activeIndex && tabsLeft > tabLeft) {
        _detal = tabsLeft - tabLeft
        _translateX += _detal
      }
      this._lastActiveIndex = activeIndex
      return {_translateX, _detal}
    },
    _ComputeTabsPosition(activeIndex) {
      const {_pureTabs: Tabs, variant} = this.data
      const endTabIndex = Tabs.length - 1
      const promises = [
        this._QueryTabsScroller(),
        this._QueryTabsContainer(),
        Tabs[activeIndex]._QueryTab(),
      ]
      if (variant === 'scrollable') {
        promises.push(activeIndex === 0 ? undefined : Tabs[0]._QueryTab())
        promises.push(activeIndex === endTabIndex ? undefined : Tabs[endTabIndex]._QueryTab())
      }
      Promise.all(promises).then((values: any) => {
        const [tabsView, containerView, tabView, firstTabView, lastTabView] = values
        const {left: tabsLeft = 0, right: tabsRight = 0} = tabsView || {}
        const {left: containerLeft = 0} = containerView || {}
        const {left: tabLeft = 0, right: tabRight = 0, width: tabWidth = 0} = tabView || {}
        let _positionAtStart = false
        let _positionAtEnd = false
        let _showArrow = true
        const IndicatorOffset = tabLeft - containerLeft
        const indicatorWidth = tabWidth
        const {_translateX, _detal} = this._AdjustTabsOffset(activeIndex, tabsLeft, tabLeft, tabsRight, tabRight)
        if (variant === 'scrollable') {
          const {left: firstTabLeft = 0} = firstTabView || tabView || {}
          const {right: lastTabRight = 0} = lastTabView || tabView || {}
          if (tabsLeft <= (firstTabLeft + _detal)) {
            _positionAtStart = true
          }
          if (tabsRight >= (lastTabRight + _detal)) {
            _positionAtEnd = true
          }
          if (_positionAtEnd && _positionAtStart) {
            _showArrow = false
          }
        }
        this.setData({
          _indicatorStyle: `left: ${IndicatorOffset}px; width: ${indicatorWidth}px;`,
          _translateX,
          _positionAtEnd,
          _positionAtStart,
          _showArrow,
        })
      }).catch(e => console.log(e))
    },
    _Move(direction) {
      const {_pureTabs: Tabs, _translateX} = this.data
      const tabIndex = direction === 'left' ? 0 : Tabs.length - 1
      Promise.all([
        this._QueryTabsScroller(),
        Tabs[tabIndex]._QueryTab(),
      ]).then(values => {
        const [tabsView, tabView] = values
        const {left: tabsLeft, right: tabsRight = 0, width: tabsWidth} = tabsView
        const {left: tabLeft, right: tabRight = 0} = tabView
        let _detal = direction === 'left' ? (tabsLeft - tabLeft) : (tabsRight - tabRight)
        const newData: any = {}
        if (direction === 'left') {
          if (_detal > 0) {
            newData._positionAtEnd = false
          }
          if (_detal > tabsWidth) {
            _detal = tabsWidth
          } else {
            newData._positionAtStart = true
          }
        } else if (direction === 'right') {
          if (-_detal > 0) {
            newData._positionAtStart = false
          }
          if (-_detal > tabsWidth) {
            _detal = -tabsWidth
          } else {
            newData._positionAtEnd = true
          }
        }
        newData._translateX = _translateX + _detal
        this.setData(newData)
      }).catch(e => console.log(e))
    },
    _MoveToLeft() {
      const {_positionAtStart} = this.data
      if (!_positionAtStart) {
        this._Move('left')
      }
    },
    _MoveToRight() {
      const {_positionAtEnd} = this.data
      if (!_positionAtEnd) {
        this._Move('right')
      }
    },
    _QueryTabsContainer() {
      return new Promise((resolve) => {
        const query = this.createSelectorQuery()
        query.select('.mui-tabs-flex-container').fields({
          rect: true,
        })
        // query.selectViewport().scrollOffset()
        query.exec(res => {
          const [view/* , viewPort */] = res || {}
          const {left = 0} = view || {}
          // const {scrollLeft = 0} = viewPort || {}
          const queryRes = {left}
          resolve(queryRes)
        })
      })
    },
    _QueryTabsScroller() {
      return new Promise((resolve) => {
        const query = this.createSelectorQuery()
        query.select('.mui-tabs-scroller').fields({
          rect: true,
          size: true,
        })
        // query.selectViewport().scrollOffset()
        query.exec(res => {
          const [view/* , viewPort */] = res || {}
          const {left = 0, right = 0, width = 0} = view || {}
          // const {scrollLeft = 0} = viewPort || {}
          const queryRes = {left, right, width}
          resolve(queryRes)
        })
      })
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
