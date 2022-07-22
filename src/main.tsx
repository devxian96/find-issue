import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';

// Routes
import Home from '@routes/Home';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<HashRouter>
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
		</HashRouter>
	</React.StrictMode>,
);

postMessage({ payload: 'removeLoading' }, '*');
