import { Route, Routes } from 'react-router-dom'
import Layout from './layouts/Layout'
import router from './router'

function App(): JSX.Element {
  const routes: JSX.Element[] = router.map((route) => {
    return <Route key={route.name} path={route.path} element={route.component} />
  })

  return (
    <Routes>
      <Route element={<Layout />}>{routes}</Route>
    </Routes>
  )
}

export default App
