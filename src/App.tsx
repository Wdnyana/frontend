import { Navigate, Routes, Route } from 'react-router-dom'

import '@/styles/globals.css'
import RouterPages from './router'

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={`/authentication/login`} replace />}
      />

      {RouterPages.map((route, i) => {
        return <Route key={i} path={route.path} element={route.element} />
      })}
    </Routes>
  )
}
