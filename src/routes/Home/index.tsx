import React, { useState } from 'react';
import { Link, Box } from '@mui/material';
import { DataGrid, GridToolbar, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import projectStatusModel from '@stores/projectStatusModel';
import issueListModel from '@stores/issueListModel';

const columns: GridColDef[] = [
	{
		field: 'id',
		headerName: '고유키',
		hide: true,
	},
	{
		field: 'type',
		headerName: '유형',
		width: 50,
		editable: true,
	},
	{
		field: 'chanel1',
		headerName: '채널유형1',
		width: 80,
		editable: true,
		renderCell: () => '포털 사이트',
	},
	{
		field: 'chanel2',
		headerName: '채널유형2',
		width: 90,
		editable: true,
		renderCell: () => '네이버 블로그',
	},
	{
		field: 'longWeek',
		headerName: '주차',
		width: 50,
		editable: true,
		renderCell: () => {
			const currentdate = new Date();
			const oneJan = new Date(currentdate.getFullYear(), 0, 1);
			const numberOfDays = Math.floor((currentdate.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000));
			const result = Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7);

			return <Box sx={{ textAlign: 'center', width: '100%' }}>{result.toString()}</Box>;
		},
	},
	{
		field: 'addDate',
		headerName: '이슈 업데이트',
		width: 200,
		editable: true,
		renderCell: (params: GridRenderCellParams) =>
			new Date(new Date(params.value).getTime() + 3240 * 10000)
				.toISOString()
				.replace('T', ' ')
				.replace(/\..*/, ''),
	},
	{
		field: 'noTagTitle',
		headerName: '제목',
		width: 450,
		editable: true,
		renderCell: (params: GridRenderCellParams) =>
			params.value
				.replaceAll('&amp;', '&')
				.replaceAll('&#39;', "'")
				.replaceAll('&gt;', '>')
				.replaceAll('&lt;', '<'),
	},
	{
		field: 'postUrl',
		headerName: 'URL',
		width: 450,
		editable: true,
		renderCell: (params: GridRenderCellParams) => (
			<Link target="_blank" href={params.value}>
				{params.value}
			</Link>
		),
	},
	{
		field: 'blogId',
		headerName: '블로그 아이디',
		hide: true,
	},
	{
		field: 'blogName',
		headerName: '블로그 이름',
		hide: true,
	},
	{
		field: 'contents',
		headerName: '내용',
		hide: true,
	},
	{
		field: 'nickName',
		headerName: '블로그 닉네임',
		hide: true,
	},
	{
		field: 'profileImgUrl',
		headerName: '썸네일',
		hide: true,
		renderCell: (params) => <img src={params.value} srcSet={params.value} alt="썸네일" loading="lazy" />,
	},
];

const Home: React.FC = (): JSX.Element => {
	const projectStatusStore = projectStatusModel();
	const issueListStore = issueListModel();
	const [checkboxSelection] = useState<boolean>(true);

	return (
		<div style={{ height: 'calc(100vh - 50px)', width: '100%' }}>
			<DataGrid
				loading={projectStatusStore.getProjectStatus()}
				columns={columns}
				rows={issueListStore.getIssueList()}
				checkboxSelection={checkboxSelection}
				components={{
					Toolbar: GridToolbar,
				}}
			/>
		</div>
	);
};

export default Home;
