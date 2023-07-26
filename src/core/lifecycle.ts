import Ele, { type ElementType } from './ele'
import { HTML, BODY, HEAD, getAssetsURL } from '@/shared'
import { rootThemeDisabledPrefix } from '@/config/page-themes'

const htmlHeadTags = [
  {
    tag: 'meta',
    attrs: {
      name: 'referrer',
      content: 'no-referrer',
    },
  },
  {
    tag: 'link',
    attrs: {
      rel: 'icon',
      type: 'image/svg+xml',
      href: getAssetsURL('images/logo-stroke.svg'),
    },
  },
]

let container: Ele<HTMLElement> = null
let showContainerRaw: boolean = true

export default {
  init(element: HTMLElement) {
    if (element) {
      container = new Ele<HTMLElement>(element)
      container.hide()
    }
    htmlHeadTags.forEach(el => HEAD.appendChild(new Ele(el.tag, el.attrs).ele))
    BODY.classList.add('md-reader')
  },
  mount(nodes: Array<ElementType | Ele>) {
    nodes.forEach(node => BODY.appendChild(Ele.from(node)))
  },
  toggleRaw(eles: Array<Ele>) {
    BODY.classList.toggle('md-reader')

    if (container) {
      container.toggle(showContainerRaw)
    }
    showContainerRaw = !showContainerRaw
    if (showContainerRaw) {
      delete HTML.dataset[rootThemeDisabledPrefix]
    } else {
      HTML.dataset[rootThemeDisabledPrefix] = ''
    }
    eles.forEach(ele => ele.toggle(showContainerRaw))
  },
}
