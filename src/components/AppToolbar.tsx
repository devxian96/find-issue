import React, { useState } from 'react';
import { ipcRenderer } from 'electron';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import projectStatusModel from '@stores/projectStatusModel';
import issueListModel from '@stores/issueListModel';
import { createWorkerFactory, useWorker } from '@shopify/react-web-worker';
import type { issueType } from '../types/common';
import { version } from '../../package.json';
import { Search, SearchIconWrapper, StyledInputBase } from './Search.style';

const createWorker = createWorkerFactory(() => import('@utils/worker'));

const AppToolbar: React.FC = (): JSX.Element => {
	const projectStatusStore = projectStatusModel();
	const issueListStore = issueListModel();
	const worker = useWorker(createWorker);
	const [search, setSearch] = useState<string>('');

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	};

	const getBodyText = (html: string): string => {
		const dom = document.createElement('div');
		dom.innerHTML = html.replaceAll('img', 'p');
		return (
			dom.querySelector('.se-main-container')?.innerText.replaceAll('\n', '').replace(/\s+/g, ' ').trim() ?? ''
		);
	};

	const startSearch = () => {
		projectStatusStore.setProjectStatus(true);
		const { searchList } = ipcRenderer.sendSync('synchronous-list', search);
		searchList.forEach((search: issueType) => {
			worker.call(search).then(({ html, id }) => {
				const text = getBodyText(html);
				console.log(text, id);
				issueListStore.setTypeAndContent(text, id as string, 0);
			});
		});
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
