import { Outlet } from 'react-router-dom'

const Layout = (): JSX.Element => {
  return (
    <div className="layout">
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
