import React from "react";

import ReguessionChartContainer, { ContainerPaper } from "./RegressionChartContainer";

import {
	Regression,
	RegressionDataset,
	RegressionType,
	compare_regressions,
	RegressionComparison
} from "../scripts/regressiondata";

import regressions from "../reguessiondatasets.json";

import { styled } from "@mui/material/styles";
import { Box, Button, Paper, Slider, Stack, Typography } from "@mui/material";
import { padding, textAlign } from "@mui/system";
import SidePanel from "./SIdePanel";
import { compare, round } from "mathjs";
import { ScorePanel } from "./ScorePanel";

const TallStack = styled(Stack)(({ theme }) => ({
	height: "100vh",
	backgroundColor: theme.palette.background.default,
}));

type ReguessionGameProps = {
	history: number[];
	datasets: RegressionDataset[];
	openScoreDialog(score: number): void;
}

export default function ReguessionGame({ datasets, history, openScoreDialog }: ReguessionGameProps) {
	const [current_dataset_ind, set_current_dataset_ind] = React.useState<number>(0);
	const [current_dataset, change_dataset] = React.useState<RegressionDataset>(
		datasets[history[current_dataset_ind]]
	);

	const [slope_guess, update_slope_guess] = React.useState(0);
	const [y_int_guess, update_y_int_guess] = React.useState(50);

	const [results_panel_vis, toggle_results_panel] = React.useState(false);

	let answer_reg: Regression<RegressionType.Answer> = { reg_type: RegressionType.Answer, slope: current_dataset.coeff, y_int: current_dataset.y_int }
	const [results, update_results] = React.useState<RegressionComparison>(compare_regressions(current_dataset, { reg_type: RegressionType.Guess, slope: slope_guess, y_int: y_int_guess }, answer_reg));

	const [score, changescore] = React.useState("00000");

	const changeGuessSlope = (event: Event, newValue: number | number[]) =>
		update_slope_guess(newValue as number);

	const changeGuessYInt = (event: Event, newValue: number | number[]) =>
		update_y_int_guess(newValue as number);

	/**
	 * Converts the current score string to a number then adds the amount to it
	 * @param {number} amount The amount of points to add to the score
	 * @returns Nothing, but it updates state.
	 */
	const addToScore = (amount: number) => {
		const currentAmount = parseInt(score);
		const newAmount = currentAmount + amount;

		let newScore = "";

		if (newAmount < 0) {
			newScore += '-';
		}

		newScore += `${Math.abs(newAmount)}`.padStart(5, '0');

		changescore(newScore);
	}

	const guessClicked = (reg_a: Regression<RegressionType>, reg_b: Regression<RegressionType>) => {
		const results = compare_regressions(current_dataset, reg_a, reg_b);

		// the score added is just the guess rsq/target rsq
		const addamount = round((results.rsq_reg_a / results.rsq_reg_b) * 1000);

		addToScore(addamount);
		update_results(results);

		toggle_results_panel(true);
	}

	const nextClicked = () => {
		const new_ind = current_dataset_ind + 1;

		if (new_ind >= history.length) {
			// postgame screen
			const finalScore = parseInt(score);

			openScoreDialog(finalScore);
			return;
		}

		set_current_dataset_ind(new_ind);
		change_dataset(datasets[history[new_ind]]);

		update_slope_guess(0);
		update_y_int_guess(50);

		toggle_results_panel(false);
	}

	/**
	 * resets user guess to default.
	 */
	const resetClicked = () => {
		update_slope_guess(0);
		update_y_int_guess(50);
	}

	// regression set building
	const regressions = [{
		reg_type: RegressionType.Guess,
		slope: slope_guess,
		y_int: y_int_guess,
	}];

	// post-guess
	if (results_panel_vis) {
		regressions.push({
			reg_type: RegressionType.Answer,
			slope: current_dataset.coeff,
			y_int: current_dataset.y_int
		});
	}

	return (
		<TallStack
			direction={{ xs: "column", md: "row" }}
			alignContent="flex-start"
			spacing={{ xs: 0, md: 0 }}
			py={{ xs: "2rem", md: 0 }}
		>
			<Box
				display="flex"
				flexDirection={"column"}
				justifyContent="center"
				alignItems={"center"}
				padding={{ md: "2%" }}
				width={{ xs: "100%", md: "60%" }}
			>
				<ReguessionChartContainer
					dataset={current_dataset}
					regressions={regressions}
				/>
			</Box>
			<Stack
				justifyContent={{ xs: "flex-start", md: "flex-end" }}
				alignItems={"center"}
				width={{ xs: "100%", md: "40%" }}
				spacing={{ xs: 2, md: 2 }}
			>
				<Stack
					direction={"column"}
					justifyContent={"center"}
					alignItems={"center"}
					width={{ xs: "90%", md: "80%" }}
					height={{ md: "100%" }}
					marginTop={{ xs: "2%" }}
					spacing={{ xs: 2, md: 2 }}
				>
					<ScorePanel score={score} />

					<SidePanel
						answer={answer_reg}
						guess={{ reg_type: RegressionType.Guess, slope: slope_guess, y_int: y_int_guess }}
						results={results}
						results_panel_vis={results_panel_vis}
						guessClicked={guessClicked}
						change_guess_slope={changeGuessSlope}
						change_guess_yint={changeGuessYInt}
						reset_clicked={resetClicked}
						next_clicked={nextClicked}
					/>
				</Stack>
			</Stack>
		</TallStack>
	);
}
