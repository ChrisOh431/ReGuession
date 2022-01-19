import React from 'react';

import logo from './logo.svg';
import './App.css';
import ReguessionGame from './components/ReguessionGame';
import { ThemeProvider } from '@emotion/react';
import { Box, createTheme, ModalUnstyled, styled, Typography } from '@mui/material';
import { ContainerPaper } from './components/RegressionChartContainer';
import { GreetingModal } from './components/GreetingModal';
import { RegressionSet } from './scripts/regressiondata';
import { EndScorePanel } from './components/ScorePanel';

const preTheme = {
	palette: {
		type: 'light',
		primary: {
			main: '#454bee',
		},
		secondary: {
			main: '#f50057',
		},
		background: {
			default: '#2895f1',
			paper: '#ffffff',
		},
	},
};

const theme = createTheme(preTheme)

function App() {
	const [GD_open, GD_setOpen] = React.useState(true);
	const openGreetingDialog = () => GD_setOpen(true);
	const closeGreetingDialog = () => GD_setOpen(false);

	const [endScore, setEndScore] = React.useState("00000"); // total score, shown in postgame
	const [endRsq, setEndRsq] = React.useState(0); // average r squared shown in postgame
	const [SD_open, SD_setOpen] = React.useState(false);
	const openScoreDialog = () => SD_setOpen(true);
	const closeScoreDialog = () => SD_setOpen(false);

	const endGameModal = (score: string, averageRsq: number) => {
		setEndScore(score);
		setEndRsq(averageRsq);
		openScoreDialog();
	}

	// Regenerates history and rerenders the game.
	const replayGame = () => {	
		closeGreetingDialog();
		closeScoreDialog();
	}

	return (
		<ThemeProvider theme={theme}>
			<GreetingModal open={GD_open} handleOpen={openGreetingDialog} handleClose={closeGreetingDialog} />
			<EndScorePanel open={SD_open} score={endScore} averageRsq={endRsq} replay={replayGame} />
			<ReguessionGame openScoreDialog={endGameModal} />
		</ThemeProvider>
	);
}

export default App;
