import { useEffect, useState } from 'react'
import { Navigate, Routes, Route, useNavigate } from 'react-router-dom'
import RouterPages from './router'
import '@/styles/globals.css'

export default function App() {
  const [token, setToken] = useState<string>('')
  const navigate = useNavigate()

  useEffect(() => {
    const storedToken = localStorage.getItem('token') ?? ''
    setToken(storedToken ?? '')
  }, [])

  useEffect(() => {
    if (!token) {
      navigate('/authentication/login', { replace: true })
    }
  }, [token, navigate])

  const routes = RouterPages({ token, setToken })

  return (
    <Routes>
      {!token ? (
        <>
          <Route
            path="/authentication/login"
            element={<Navigate to="/authentication/login" replace />}
          />
          <Route
            path="*"
            element={<Navigate to="/authentication/login" replace />}
          />
        </>
      ) : (
        <>
          {routes.map((route, i) => (
            <Route key={i} path={route.path} element={route.element} />
          ))}
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </>
      )}
    </Routes>
  )
}
