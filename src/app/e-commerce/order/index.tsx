import { LazyComponents } from '@/utils/load'

const EcomerceCustomer = LazyComponents({
    importComponent: () => import('./order.view'),
    moduleSelector: (module) => module.EcomerceCustomer,
})

export { EcomerceCustomer }
