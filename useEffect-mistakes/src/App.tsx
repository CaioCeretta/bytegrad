import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import MaxWidthWrapper from './components/MaxWidthWrapper'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import StateUpdatesImmediately from './pages/StateUpdatesImmediately'
import ConditionalRendering from './pages/ContitionalRendering'

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/updates",
        element: <StateUpdatesImmediately />
      },
      {
        path: "/conditional",
        element: <ConditionalRendering />
      }
    ]

  }
])

function App() {
  return (
    <MaxWidthWrapper>
      <RouterProvider router={router} />
    </MaxWidthWrapper>
  )
}

export { App }
