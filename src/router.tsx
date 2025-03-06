import { lazy, Suspense } from 'react'
import Loading from '@/components/ui/loading'

const PagesLogin = lazy(() => import('./pages/login'))
const DashboardPages = lazy(() => import('./pages/dashboard'))
const CreateDocument = lazy(() => import('./pages/create-document'))
const VerifyDocument = lazy(() => import('./pages/verify-document.tsx'))
const ViewDocument = lazy(() => import('./pages/view-document.tsx'))
// const TransferDocument = lazy(() => import('./pages/transfer-document.tsx'))

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
  {
    path: '/document/create',
    element: (
      <Suspense
        fallback={
          <div className="flex h-screen w-full items-center justify-center">
            <Loading className="md:h-16 md:w-16 2xl:h-20 2xl:w-20" />
          </div>
        }
      >
        <CreateDocument />
      </Suspense>
    ),
  },
  {
    path: '/document/verify',
    element: (
      <Suspense
        fallback={
          <div className="flex h-screen w-full items-center justify-center">
            <Loading className="md:h-16 md:w-16 2xl:h-20 2xl:w-20" />
          </div>
        }
      >
        <VerifyDocument />
      </Suspense>
    ),
  },
  {
    path: '/document-viewer',
    element: (
      <Suspense
        fallback={
          <div className="flex h-screen w-full items-center justify-center">
            <Loading className="md:h-16 md:w-16 2xl:h-20 2xl:w-20" />
          </div>
        }
      >
        <ViewDocument type="invoice" />
      </Suspense>
    ),
  },
]

export default RouterPages
