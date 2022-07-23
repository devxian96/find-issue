import React, { useState } from 'react';
import { ipcRenderer } from 'electron';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import projectStatusModel from '@stores/projectStatusModel';
import issueListModel from '@stores/issueListModel';
import settingModel from '@stores/settingModel';
import { createWorkerFactory, useWorker } from '@shopify/react-web-worker';
import type { issueType } from '../types/common';
import { version } from '../../package.json';
import { Search, SearchIconWrapper, StyledInputBase } from './Search.style';

const createWorker = createWorkerFactory(() => import('@utils/worker'));

const AppToolbar: React.FC = (): JSX.Element => {
	const projectStatusStore = projectStatusModel();
	const issueListStore = issueListModel();
	const settingStore = settingModel();
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

	const focusText = (text: string, search: string): string => {
		return text.replaceAll(search, /* html */ `<strong style="color:red">${search}</strong>`);
	};

	const criticalText = (text: string): string => {
		let tmp = text;
		settingStore
			.getSetting()
			.critical.split(',')
			.forEach((keyword) => {
				tmp = tmp.replaceAll(
					keyword,
					`<span id="find-issue-critical" style="background-color:red; color: white;">${keyword}</span>`,
				);
			});
		return tmp;
	};

	const majorText = (text: string): string => {
		let tmp = text;
		settingStore
			.getSetting()
			.major.split(',')
			.forEach((keyword) => {
				tmp = tmp.replaceAll(
					keyword,
					`<span id="find-issue-major" style="background-color:yellow; color: black;">${keyword}</span>`,
				);
			});
		return tmp;
	};

	const minorText = (text: string): string => {
		let tmp = text;
		settingStore
			.getSetting()
			.minor.split(',')
			.forEach((keyword) => {
				tmp = tmp.replaceAll(
					keyword,
					`<span id="find-issue-minor" style="background-color:#333; color: white;">${keyword}</span>`,
				);
			});
		return tmp;
	};

	const getType = (text: string): number => {
		if (text.indexOf('find-issue-critical') !== -1) {
			return 3;
		}
		if (text.indexOf('find-issue-major') !== -1) {
			return 2;
		}
		if (text.indexOf('find-issue-minor') !== -1) {
			return 1;
		}
		return 0;
	};

	const startSearch = () => {
		const searchList = ipcRenderer.sendSync('synchronous-list', {
			search,
			count: settingStore.getSetting().rows,
		});
		searchList.forEach((searchProps: issueType) => {
			worker.call(searchProps).then(({ html, id }) => {
				let text = getBodyText(html);
				text = focusText(text, search);
				text = criticalText(text);
				text = majorText(text);
				text = minorText(text);
				const type = getType(text);
				issueListStore.setTypeAndContent(text, id as string, type);
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
						onKeyPress={({ key }) => {
							if (key === 'Enter') {
								Promise.all([() => projectStatusStore.setProjectStatus(true), startSearch]).then(
									(callback) => callback.forEach((func) => func()),
								);
							}
						}}
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
