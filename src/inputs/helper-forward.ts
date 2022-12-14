import type { Pane } from '../pane'
import { refs } from '../refs'

export const addForwardHelperInput = (pane: Pane, object3D: THREE.Object3D) => {
  const helper = new refs.THREE.ArrowHelper()
  helper.name = 'Forward helper'
  helper.setLength(1)
  helper.userData.THREE_INSPECT_OMIT = true

  const params = {
    forwardHelper: false,
  }

  const input = pane
    .addInput(params, 'forwardHelper')
    .on('change', () => {
      if (params.forwardHelper) {
        object3D.add(helper)
      } else {
        object3D.remove(helper)
      }
    })

  return () => {
    input.dispose()
    object3D.remove(helper)
    helper.dispose()
  }
}
