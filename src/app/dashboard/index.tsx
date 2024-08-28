import { LazyComponents } from '../../utils/load'

const Dashboard = LazyComponents({
  importComponent: () => import('./dashboard.view'),
  moduleSelector: (module) => module.Dashboard,
})

export { Dashboard }
