import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import AppToolbar from '@components/AppToolbar';
import CssBaseline from '@mui/material/CssBaseline';

// Routes
import Home from '@routes/Home';
import Setting from '@routes/Setting';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<CssBaseline />
		<HashRouter>
			<AppToolbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/setting" element={<Setting />} />
			</Routes>
		</HashRouter>
	</React.StrictMode>,
);

postMessage({ payload: 'removeLoading' }, '*');
