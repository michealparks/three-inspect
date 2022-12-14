import { createCanvas } from './canvas'
import { createControls } from './controls'
import { createNav } from './nav'
import { initScene } from '../scene'
import { initStats } from '../pane/stats'

export const initElements = () => {
  const disposers: Disposer[] = []
  const root = document.createElement('div')
  root.className = 'absolute top-0 left-0 w-screen h-screen flex'

  const canvas = createCanvas()
  const { controls, nav, treeroot, treeview, pane } = createControls()
  const { addPane } = createNav(controls, nav)

  disposers.push(initStats(controls))
  disposers.push(initScene(treeview, treeroot, pane))

  root.append(canvas)
  root.append(controls)
  document.body.append(root)

  let width = window.innerWidth

  const handleResize = () => {
    const newWidth = window.innerWidth
    const delta = newWidth - width
    canvas.style.width = `${canvas.clientWidth + delta}px`
    width = newWidth
  }

  window.addEventListener('resize', handleResize, { passive: true })

  disposers.push(() => window.removeEventListener('resize', handleResize))

  return { addPane, disposers }
}
