import { TypesLayout } from '@/types/layout-type'
import { NavbarDashboard } from './navbar-dashboard'

export default function DashboardLayout({ children }: TypesLayout) {
  return (
    <div className="grid h-screen w-full grid-rows-[auto_1fr]">
      <header className="">
        <NavbarDashboard />
      </header>

      <main className="responsive-container h-full py-5">{children}</main>
    </div>
  )
}
