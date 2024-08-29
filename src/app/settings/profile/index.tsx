import { LazyComponents } from '@/utils/load'

const SettingsProfile = LazyComponents({
    importComponent: () => import('./profile.view'),
    moduleSelector: (module) => module.SettingsProfile,
})

export { SettingsProfile }
