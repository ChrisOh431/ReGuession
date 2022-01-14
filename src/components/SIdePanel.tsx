import { Paper, Stack, Typography, Slider, Button } from "@mui/material";
import { Regression, RegressionComparison, RegressionType } from "../scripts/regressiondata";
import { round } from "mathjs";

type SidePanelParams = {
    guess: Regression<RegressionType.Guess>,
    answer: Regression<RegressionType.Answer>,

    guessClicked(reg_a: Regression<RegressionType>, reg_b: Regression<RegressionType>): void,
    change_guess_slope(event: Event, newValue: number | number[]): void,
    change_guess_yint(event: Event, newValue: number | number[]): void,

    results_panel_vis: boolean,
    results: RegressionComparison,
    reset_clicked(): void,
    next_clicked(): void,
}

export default function SidePanel({ answer, guess, change_guess_slope, change_guess_yint, guessClicked, results, results_panel_vis, next_clicked, reset_clicked }: SidePanelParams) {
    if (results_panel_vis) {
        return (
            <ResultsPanel nextClicked={next_clicked} results={results} />
        )
    }

    return (
        <GuessInputPanel answer={answer} guess={guess} change_guess_slope={change_guess_slope} change_guess_yint={change_guess_yint} guessClicked={guessClicked} />
    );
};

type GuessPanelParams = {
    guess: Regression<RegressionType.Guess>,
    answer: Regression<RegressionType.Answer>,
    guessClicked(reg_a: Regression<RegressionType>, reg_b: Regression<RegressionType>): void,
    change_guess_slope(event: Event, newValue: number | number[]): void,
    change_guess_yint(event: Event, newValue: number | number[]): void,
    reset_clicked?(): void,
}
function GuessInputPanel({ answer, guess, change_guess_slope, change_guess_yint, guessClicked, reset_clicked }: GuessPanelParams) {
    return (
        <Paper variant="outlined" sx={{
            width: "100%",
            padding: "5%"
        }}>
            <Stack
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}>
                <Typography variant="h5">
                    slpe: {round(guess.slope, 2)}
                </Typography>
                <Typography variant="h5">
                    yint: {round(guess.y_int, 2)}
                </Typography>

                <Slider value={guess.slope} min={-10} max={10} step={0.01} onChange={change_guess_slope} sx={{ marginTop: "24px" }} />
                <Slider value={guess.y_int} min={0} max={100} step={0.01} onChange={change_guess_yint} sx={{ marginTop: "12px" }} />

                <Button variant="contained" sx={{ marginTop: "24px" }} onClick={() => {
                    let regression_guess: Regression<RegressionType.Guess> = { reg_type: RegressionType.Guess, slope: guess.slope, y_int: guess.y_int };
                    let regression_answer: Regression<RegressionType.Answer> = { reg_type: RegressionType.Answer, slope: answer.slope, y_int: answer.y_int };
                    guessClicked(regression_guess, regression_answer);
                }}>Guess!</Button>
            </Stack>
        </Paper>
    );
}


type ResultsPanelParams = {
    results: RegressionComparison,
    nextClicked(): void
}
function ResultsPanel({ results, nextClicked }: ResultsPanelParams) {
    const addamount = round((results.rsq_reg_a / results.rsq_reg_b) * 1000);
    return (
        <Paper variant="outlined" sx={{
            width: "100%",
            padding: "5%"
        }}>
            <Stack
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}>
                <Typography variant="h3" color={"#454bee88"}>
                    Guess
                </Typography>
                <Typography variant="h5">
                    slpe: {results.reg_a.slope}
                </Typography>
                <Typography variant="h5">
                    yint: {results.reg_a.y_int}
                </Typography>
                <Typography variant="h3" color={"#61F41688"}>
                    Target
                </Typography>
                <Typography variant="h5">
                    slpe: {results.dataset.coeff}
                </Typography>
                <Typography variant="h5">
                    yint: {results.dataset.y_int}
                </Typography>
                <Typography variant="h3">
                    pad: {addamount}
                </Typography>

                <Button variant="contained" sx={{ marginTop: "12px" }} onClick={() => {
                    nextClicked();
                }}>Next</Button>
            </Stack>
        </Paper>
    );
}