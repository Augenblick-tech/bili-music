import { RouterProvider, createHashRouter } from "react-router-dom"
import App from "@/App"
import { Suspense, lazy } from "react"

const BMSearchResult = lazy(() => import("@/views/BMSearchResult"))

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "search",
        element: (
          <Suspense>
            <BMSearchResult />
          </Suspense>
        ),
      },
    ],
  },
])

export default function RouterWrapper() {
  return <RouterProvider router={router} fallbackElement={<div>Loading</div>} />
}
