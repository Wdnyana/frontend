import { lazy, Suspense } from 'react'
import Loading from '@/components/ui/loading'

const PagesLogin = lazy(() => import('./pages/login'))
const DashboardPages = lazy(() => import('./pages/dashboard'))

const RouterPages = [
  {
    path: '/authentication/login',
    element: (
      <Suspense
        fallback={
          <div className="flex h-screen w-full items-center justify-center">
            <Loading className="md:h-16 md:w-16 2xl:h-20 2xl:w-20" />
          </div>
        }
      >
        <PagesLogin />
      </Suspense>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <Suspense
        fallback={
          <div className="flex h-screen w-full items-center justify-center">
            <Loading className="md:h-16 md:w-16 2xl:h-20 2xl:w-20" />
          </div>
        }
      >
        <DashboardPages />
      </Suspense>
    ),
  },
]

export default RouterPages
