import React from 'react';
import { AppBar, InputBase, Toolbar, Typography, Button } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	padding: theme.spacing(1, 1, 1, 0),
	paddingLeft: `calc(1em + ${theme.spacing(4)})`,
	transition: theme.transitions.create('width'),
	width: '100%',
}));

const AppToolbar: React.FC = (): JSX.Element => {
	return (
		<AppBar position="static">
			<Toolbar variant="dense" sx={{ justifyContent: 'space-between' }}>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					Find Issue
				</Typography>
				<Search>
					<SearchIconWrapper>
						<SearchIcon />
					</SearchIconWrapper>
					<StyledInputBase placeholder="검색..." inputProps={{ 'aria-label': 'search', width: '100%' }} />
				</Search>
				<Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
					<Button color="inherit">홈</Button>
				</Link>
				<Link to="/setting" style={{ color: 'white', textDecoration: 'none' }}>
					<Button color="inherit">설정</Button>
				</Link>
			</Toolbar>
		</AppBar>
	);
};

export default AppToolbar;
