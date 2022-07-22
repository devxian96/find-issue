import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';


const Home: React.FC = (): JSX.Element => {
	const { data } = useDemoData({
		dataSet: 'Commodity',
		rowLength: 100,
		maxColumns: 6,
	});

	return (
		<div style={{ height: 'calc(100vh - 50px)', width: '100%' }}>
			<DataGrid
				{...data}
				components={{
					Toolbar: GridToolbar,
				}}
			/>
		</div>
	);
};

export default Home;
