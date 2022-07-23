import React from 'react';
import { DataGrid, GridToolbar, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

const columns: GridColDef[] = [
	{
		field: 'type',
		headerName: '유형',
		width: 50,
		editable: true,
	},
	{
		field: 'chanel1',
		headerName: '채널유형1',
		width: 150,
		editable: true,
	},
	{
		field: 'chanel2',
		headerName: '채널유형2',
		width: 150,
		editable: true,
	},
	{
		field: 'longWeek',
		headerName: '이슈발생 주차',
		width: 150,
		editable: true,
	},
	{
		field: 'update',
		headerName: '이슈 업데이트',
		width: 150,
		editable: true,
	},
	{
		field: 'title',
		headerName: '제목',
		width: 150,
		editable: true,
	},
	{
		field: 'url',
		headerName: 'URL',
		width: 150,
		editable: true,
	},
];

const Home: React.FC = (): JSX.Element => {
	const [checkboxSelection, setCheckboxSelection] = React.useState(true);

	const { data } = useDemoData({
		dataSet: 'Commodity',
		rowLength: 100,
		maxColumns: 6,
	});

	console.log(data);

	return (
		<div style={{ height: 'calc(100vh - 50px)', width: '100%' }}>
			<DataGrid
				columns={columns}
				rows={[]}
				checkboxSelection={checkboxSelection}
				components={{
					Toolbar: GridToolbar,
				}}
			/>
		</div>
	);
};

export default Home;
