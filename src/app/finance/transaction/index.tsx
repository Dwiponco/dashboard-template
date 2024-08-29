import { LazyComponents } from '@/utils/load'

const FinanceTransaction = LazyComponents({
    importComponent: () => import('./transaction'),
    moduleSelector: (module) => module.FinanceTransaction,
})

export { FinanceTransaction }
