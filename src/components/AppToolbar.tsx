import React from 'react';
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';

const AppToolbar: React.FC = (): JSX.Element => {
	return (
		<AppBar>
			<Toolbar variant="dense" sx={{ justifyContent: 'space-between' }}>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					Find Issue
				</Typography>
				<Button color="inherit">홈</Button>
				<Button color="inherit">설정</Button>
			</Toolbar>
		</AppBar>
	);
};

export default AppToolbar;
