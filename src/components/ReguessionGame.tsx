import React from "react";

import { Box, Stack, styled } from "@mui/material";

import { round } from "mathjs";

import {
	compare_regressions, Regression, RegressionComparison, RegressionDataset, RegressionSet, RegressionType
} from "../scripts/regressiondata";

import ReguessionChartContainer from "./RegressionChartContainer";
import { ScorePanel } from "./ScorePanel";
import SidePanel from "./SIdePanel";


const TallStack = styled(Stack)(({ theme }) => ({
	height: "100vh",
	backgroundColor: theme.palette.background.default,
}));

type ReguessionGameProps = {
	openScoreDialog(score: string, averageRsq: number): void;
}

const setLength = 8;

let hist = RegressionSet.map(() =>
	Math.floor(Math.random() * RegressionSet.length)
).slice(0, setLength);

export default function ReguessionGame({ openScoreDialog }: ReguessionGameProps) {
	// list of datasets played
	const [history, setHistory] = React.useState(hist);
	const [current_dataset_ind, set_current_dataset_ind] = React.useState<number>(0);
	const [current_dataset, change_dataset] = React.useState<RegressionDataset>(
		RegressionSet[history[current_dataset_ind]]
	);

	const [slope_guess, update_slope_guess] = React.useState(0);
	const [y_int_guess, update_y_int_guess] = React.useState(50);

	const [results_panel_vis, toggle_results_panel] = React.useState(false);

	let answer_reg: Regression<RegressionType.Answer> = { reg_type: RegressionType.Answer, slope: current_dataset.coeff, y_int: current_dataset.y_int }
	const [results, update_results] = React.useState<RegressionComparison>(compare_regressions(current_dataset, { reg_type: RegressionType.Guess, slope: slope_guess, y_int: y_int_guess }, answer_reg));

	const [score, change_score] = React.useState("00000");
	const [tot_rsq, update_tot_rsq] = React.useState(0);

	const changeGuessSlope = (event: Event, newValue: number | number[]) =>
		update_slope_guess(newValue as number);

	const changeGuessYInt = (event: Event, newValue: number | number[]) =>
		update_y_int_guess(newValue as number);

	const resetInputs = () => {
		update_slope_guess(0);
		update_y_int_guess(50);
	}

	const resetScoreandRsq = () => {
		change_score("00000");
		update_tot_rsq(0);
	}
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

		change_score(newScore);
	}

	const guessClicked = (reg_a: Regression<RegressionType>, reg_b: Regression<RegressionType>) => {
		const results = compare_regressions(current_dataset, reg_a, reg_b);

		// the score added is just the guess rsq/target rsq
		const addamount = round((results.rsq_reg_a / results.rsq_reg_b) * 1000);

		const currentrsq = tot_rsq;
		update_tot_rsq(currentrsq + results.rsq_reg_a);
		addToScore(addamount);
		update_results(results);

		toggle_results_panel(true);
	}

	/**
	 * Increments the dataset index until the end is reached, after which a new list of indices is generated 
	 */
	const nextClicked = () => {
		const new_ind = current_dataset_ind + 1;

		if (new_ind >= history.length) {
			// postgame screen
			resetInputs();

			toggle_results_panel(false);

			// generate and set new history
			let newHist = RegressionSet.map(() =>
				Math.floor(Math.random() * RegressionSet.length)
			).slice(0, setLength);
			setHistory(newHist);

			set_current_dataset_ind(0);
			change_dataset(RegressionSet[newHist[0]]);

			openScoreDialog(score, round(tot_rsq / history.length, 3));
			resetScoreandRsq();
			return;
		}

		set_current_dataset_ind(new_ind);
		change_dataset(RegressionSet[history[new_ind]]);

		resetInputs();

		toggle_results_panel(false);
	}

	/**
	 * resets user guess to default.
	 */
	const resetClicked = () => {
		resetInputs();
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
