import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import RouterPages from './router'
import '@/styles/globals.css'
import { WrapperLogin } from './pages/wrapper.tsx'
import NotFound from './not-found'

export default function App() {
  const [token, setToken] = useState<string>('')
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const storedToken = localStorage.getItem('token') ?? ''
    setToken(storedToken)
  }, [])

  useEffect(() => {
    const protectedRoutes = [
      '/dashboard',
      '/document/create',
      '/document/verify',
      '/document-viewer',
    ]

    if (
      !token &&
      protectedRoutes.some((route) => location.pathname.startsWith(route))
    ) {
      navigate('/authentication/login', { replace: true })
    }
  }, [token, navigate, location])

  const routes = RouterPages({ token, setToken })

  return (
    <Routes>
      <Route
        path="/authentication/login"
        element={<WrapperLogin token={token} setToken={setToken} />}
      />

      {token ? (
        <>
          {routes.map((route, i) => (
            <Route key={i} path={route.path} element={route.element} />
          ))}
          <Route path="*" element={<NotFound />} />
        </>
      ) : (
        <>
          <Route path="*" element={<NotFound />} />
        </>
      )}
    </Routes>
  )
}
