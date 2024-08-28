import { lazy, Suspense } from 'react'

interface LazyComponentsProps {
  importComponent: () => Promise<any>
  moduleSelector: (module: any) => any
}

// const ErrorLoadComponent = () => {
//   return (
//     <Alert>
//       <AlertTitle>An Error Occured</AlertTitle>
//       <AlertDescription>Error Import Element</AlertDescription>
//     </Alert>
//   )
// }

const LazyComponents = ({
  importComponent,
  moduleSelector,
}: LazyComponentsProps) => {
  const lazyInvoke = () =>
    importComponent()
      .then((module) => {
        return {
          default: moduleSelector(module),
        }
      })
      .catch(() => {
        return {
          default: <p>Error Loading Component</p>,
        }
      })
  const LazyComponent = lazy(lazyInvoke)
  return (props: any) => (
    <Suspense fallback={<p>Loading...</p>}>
      <LazyComponent {...props} />
    </Suspense>
  )
}

export { LazyComponents }
