import { Navigate, RouterProvider, createHashRouter } from "react-router-dom"
import App from "@/App"
import { Suspense, lazy } from "react"

const SearchResult = lazy(() => import("@/views/SearchResult"))
const SideBarMusicPlaylist = lazy(() => import("@/views/UserFavFolder"))

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" />,
      },
      {
        path: "home",
        element: (
          <Suspense>
            <h1>Home</h1>
          </Suspense>
        ),
      },
      {
        path: "search",
        element: (
          <Suspense>
            <SearchResult />
          </Suspense>
        ),
      },
      {
        path: "folder-created/:id",
        element: (
          <Suspense>
            <SideBarMusicPlaylist />
          </Suspense>
        ),
      },
      {
        path: "folder-collected/:id",
        element: (
          <Suspense>
            <SideBarMusicPlaylist />
          </Suspense>
        ),
      },
    ],
  },
])

export default function RouterWrapper() {
  return <RouterProvider router={router} fallbackElement={<div>Loading</div>} />
}
