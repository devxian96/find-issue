import React, { useState } from 'react';
import { ipcRenderer } from 'electron';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import projectStatusModel from '@stores/projectStatusModel';
import issueListModel from '@stores/issueListModel';
import { version } from '../../package.json';
import { Search, SearchIconWrapper, StyledInputBase } from './Search.style';

const AppToolbar: React.FC = (): JSX.Element => {
	const projectStatusStore = projectStatusModel();
	const issueListStore = issueListModel();
	const [search, setSearch] = useState<string>('');

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	};

	const startSearch = async () => {
		projectStatusStore.setProjectStatus(true);
		const { searchList } = await ipcRenderer.sendSync('synchronous-message', search);
		console.log(searchList)
		issueListStore.setIssueList(searchList);
		projectStatusStore.setProjectStatus(false);
	};

	return (
		<AppBar position="static">
			<Toolbar variant="dense" sx={{ justifyContent: 'space-between' }}>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					Find Issue {version}
				</Typography>
				<Search>
					<SearchIconWrapper>
						<SearchIcon />
					</SearchIconWrapper>
					<StyledInputBase
						placeholder="검색..."
						inputProps={{ 'aria-label': 'search', width: '100%' }}
						onChange={onChange}
						onKeyPress={({ key }) => key === 'Enter' && startSearch()}
					/>
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
