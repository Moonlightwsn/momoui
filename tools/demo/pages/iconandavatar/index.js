import {iconPathMap} from '../../components/utils/utils'

Component({
  data: {
    icons: Object.keys(iconPathMap),
  },
  lifetimes: {
    attached() {
      console.log(this.data.icons)
    }
  }
})
