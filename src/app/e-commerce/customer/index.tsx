import { LazyComponents } from '@/utils/load'

const EcomerceOrder = LazyComponents({
    importComponent: () => import('./customer.view'),
    moduleSelector: (module) => module.EcomerceOrder,
})

export { EcomerceOrder }
