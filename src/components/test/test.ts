import muiBase from '../../behaviors/muiBase.ts'
import muiController from '../../behaviors/muiController.ts'

Component({
  behaviors: [muiBase, muiController, 'wx://form-field'],
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
