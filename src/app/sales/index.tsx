import { LazyComponents } from '../../utils/load'

const Sales = LazyComponents({
    importComponent: () => import('./sales.view'),
    moduleSelector: (module) => module.Sales,
})

export { Sales }
