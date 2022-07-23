import { InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

export const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	padding: theme.spacing(1, 1, 1, 0),
	paddingLeft: `calc(1em + ${theme.spacing(4)})`,
	transition: theme.transitions.create('width'),
	width: '100%',
}));
