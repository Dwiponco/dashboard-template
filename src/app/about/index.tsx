import { LazyComponents } from '../../utils/load'

const About = LazyComponents({
  importComponent: () => import('./about.view'),
  moduleSelector: (module) => module.About,
})

export { About }
