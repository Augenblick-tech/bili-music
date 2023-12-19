import React from 'react'
import ReactDOM from 'react-dom/client'
import RouterWrapper from '@/router'

import '@/assets/main.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterWrapper />
	</React.StrictMode>
)
