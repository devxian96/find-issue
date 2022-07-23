import React from 'react';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Typography,
	Box,
	Link,
	Divider,
	TextField,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Setting: React.FC = (): JSX.Element => {
	const [expanded, setExpanded] = React.useState<string | false>(false);

	const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
		setExpanded(isExpanded ? panel : false);
	};

	return (
		<>
			<Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
				<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
					<Typography sx={{ width: '33%', flexShrink: 0 }}>예외 검색어</Typography>
					<Typography sx={{ color: 'text.secondary' }}>
						검색 결과물에서 제외할 키워드를 설정하세요.
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<TextField
						helperText="키워드마다 반점(,)으로 구분하여 작성해 주세요."
						multiline
						fullWidth
						rows={7}
						variant="filled"
					/>
				</AccordionDetails>
			</Accordion>
			<Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
				<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header">
					<Typography sx={{ width: '33%', flexShrink: 0 }}>크리티컬 이슈</Typography>
					<Typography sx={{ color: 'text.secondary' }}>키워드별 이슈를 설정하세요.</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<TextField
						helperText="키워드마다 반점(,)으로 구분하여 작성해 주세요."
						multiline
						fullWidth
						rows={7}
						variant="filled"
					/>
				</AccordionDetails>
			</Accordion>
			<Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
				<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3bh-content" id="panel3bh-header">
					<Typography sx={{ width: '33%', flexShrink: 0 }}>메이저 이슈</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<TextField
						helperText="키워드마다 반점(,)으로 구분하여 작성해 주세요."
						multiline
						fullWidth
						rows={7}
						variant="filled"
					/>
				</AccordionDetails>
			</Accordion>
			<Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
				<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4bh-content" id="panel4bh-header">
					<Typography sx={{ width: '33%', flexShrink: 0 }}>마이너 이슈</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<TextField
						helperText="키워드마다 반점(,)으로 구분하여 작성해 주세요."
						multiline
						fullWidth
						rows={7}
						variant="filled"
					/>
				</AccordionDetails>
			</Accordion>

			<Box sx={{ textAlign: 'center', position: 'absolute', width: '100%', bottom: 0 }}>
				<Divider />
				<Link
					target="_blank"
					href="https://github.com/devxian96/find-issue/blob/main/LICENSE"
					sx={{ marginRight: '1rem' }}
					underline="hover"
				>
					MIT License
				</Link>
				<Link target="_blank" href="https://github.com/devxian96/find-issue" underline="hover">
					Github
				</Link>
			</Box>
		</>
	);
};

export default Setting;
