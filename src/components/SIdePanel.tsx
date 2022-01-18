import { Paper, Stack, Typography, Slider, Button, Divider } from "@mui/material";
import { Regression, RegressionComparison, RegressionType } from "../scripts/regressiondata";
import { round } from "mathjs";
import { ContainerPaper } from "./RegressionChartContainer";

// icons
import CheckIcon from '@mui/icons-material/Check';
import ReplayIcon from '@mui/icons-material/Replay';


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
        <GuessInputPanel answer={answer} guess={guess} change_guess_slope={change_guess_slope} change_guess_yint={change_guess_yint} guessClicked={guessClicked} reset_clicked={reset_clicked} />
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
        <ContainerPaper variant="outlined" sx={{
            width: "80%",
            padding: "5%"
        }}>
            <Stack
                direction={"column"}
            >
                <Typography id="non-linear-slider-slope" fontSize={"1.25rem"}>
                    Slope: {round(guess.slope, 2)}
                </Typography>
                <Slider value={guess.slope} min={-10} max={10} step={0.01} onChange={change_guess_slope}
                    aria-labelledby="non-linear-slider-slope" sx={{ marginBottom: "0.75em" }} />

                <Typography id="non-linear-slider-yint" fontSize={"1.25rem"}>
                    Y-Intercept: {round(guess.y_int, 2)}
                </Typography>
                <Slider value={guess.y_int} color="primary" min={0} max={100} step={0.01} onChange={change_guess_yint}
                    aria-labelledby="non-linear-slider-yint" />

                <Divider sx={{ margin: "2.5%" }} />

                <Stack direction={"row"}
                    justifyContent={"space-evenly"}
                >
                    <Button variant="contained" color={"error"} size="large" sx={{ width: "20%" }} onClick={() => {
                        reset_clicked?.()
                    }}><ReplayIcon /></Button>

                    <Button variant="contained" color="success" size="large" sx={{ width: "75%" }} onClick={() => {
                        let regression_guess: Regression<RegressionType.Guess> = { reg_type: RegressionType.Guess, slope: guess.slope, y_int: guess.y_int };
                        let regression_answer: Regression<RegressionType.Answer> = { reg_type: RegressionType.Answer, slope: answer.slope, y_int: answer.y_int };
                        guessClicked(regression_guess, regression_answer);
                    }}><CheckIcon /></Button>
                </Stack>
            </Stack>
        </ContainerPaper>
    );
}

type RegressionStatsProps = {
    title: string,
    color: string,
    slope: number,
    yint: number,
    rsq: number,
}
const RegressionStats = ({ title, color, rsq, slope, yint }: RegressionStatsProps) => {
    return (
        <Stack
            justifyContent={"center"}
            alignItems={"center"}
        >
            <Typography variant="h5" fontSize={"2rem"} color={color}>
                {title}
            </Typography>
            <Typography variant="h5" fontSize={"1.35rem"}>
                Slope: {slope}
            </Typography>
            <Typography variant="h5" fontSize={"1.35rem"}>
                yint: {yint}
            </Typography>

            <Typography fontSize={"1.5rem"}>
                <var>R<sup>2</sup></var>: {rsq}
            </Typography>
        </Stack>
    );
}

type ResultsPanelParams = {
    results: RegressionComparison,
    nextClicked(): void
}
function ResultsPanel({ results, nextClicked }: ResultsPanelParams) {
    const addamount = round((results.rsq_reg_a / results.rsq_reg_b) * 1000);
    return (
        <Paper variant="outlined"
            sx={{
                width: "80%",
                padding: "5%"
            }}>
            <Stack
                direction={"row"}
                justifyContent={"space-around"}
                alignItems={"center"}
            >
                <RegressionStats title="Guess" color={"#454bee"} slope={results.reg_a.slope} yint={results.reg_a.y_int} rsq={results.rsq_reg_a} />
                <RegressionStats title="Target" color={"#61F416"} slope={results.dataset.coeff} yint={results.dataset.y_int} rsq={results.rsq_reg_b} />
            </Stack>
            <Divider sx={{ margin: "2.5%" }} />
            <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-evenly"}
            >
                <Stack
                    direction={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                >
                    <Typography fontSize={"1.5rem"} color={addamount >= 0 ? "green" : "red"}>
                        Points: {addamount >= 0 ? "+" : ""}{addamount}
                    </Typography>
                </Stack>

                <Button variant="contained" size="large" onClick={() => {
                    nextClicked();
                }}>Next</Button>
            </Stack>
        </Paper>
    );
}