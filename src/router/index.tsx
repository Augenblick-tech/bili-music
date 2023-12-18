import { createHashRouter } from 'react-router-dom'
import App from '@/App'

const router = createHashRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: 'about',
				element: <h1>About</h1>,
			},
			{
				path: 'users',
				element: <h1>Users</h1>,
			},
		],
	},
])

export default router
