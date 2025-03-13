import { Suspense, useMemo } from 'react'
import Loading from '@/components/ui/loading'
import NotFound from './not-found.tsx'
import {
  WrapperCreateDocument,
  WrapperDashboard,
  WrapperLogin,
  WrapperVerifyDocument,
  WrapperDocumentView,
} from './pages/wrapper.tsx'

import { LoginEmailOTP } from '@/types/general-type'

export default function RouterPages({ token, setToken }: LoginEmailOTP) {
  return useMemo(() => {
    const router = [
      {
        path: '/authentication/login',
        element: <WrapperLogin token={token} setToken={setToken} />,
      },
      ...(token
        ? [
            {
              path: '/dashboard',
              element: <WrapperDashboard token={token} setToken={setToken} />,
            },
            {
              path: '/document/create',
              element: (
                <WrapperCreateDocument token={token} setToken={setToken} />
              ),
            },
            {
              path: '/document/verify',
              element: (
                <WrapperVerifyDocument token={token} setToken={setToken} />
              ),
            },
            // /document-viewer yang dibawah move sementara

            // diatas ini
          ]
        : []),
      {
        path: '/document-viewer',
        element: (
          <WrapperDocumentView
            token={token}
            setToken={setToken}
            type={{ type: 'nft' }}
          />
        ),
      },
      {
        path: '*',
        element: (
          <Suspense
            fallback={
              <div className="flex h-screen w-full items-center justify-center">
                <Loading className="md:h-16 md:w-16 2xl:h-20 2xl:w-20" />
              </div>
            }
          >
            <NotFound />
          </Suspense>
        ),
      },
    ]

    return router
  }, [token, setToken])
}
