import { sum, square, round } from "mathjs";
import regressions from "../reguessiondatasets.json";

export interface RegressionDataset {
    name: string | number;
    x_vals: number[];
    y_vals: number[];
    coeff: number;
    y_int: number;
}

// model generator already follows schema for RegressionDataset
export const RegressionSet: RegressionDataset[] = regressions;

export enum RegressionType {
    Answer,
    Guess
}

export interface Regression<RegressionType> {
    slope: number;
    y_int: number;
    reg_type: RegressionType;
}

export interface EnhancedRegression<RegressionType> extends Regression<RegressionType> {
    min: { x: number, y: number };
    max: { x: number, y: number };
}

/**
 * Calculates and returns the R^2 of a regression for a dataset using a Least Squares algorithm.
 * @param {RegressionDataset} dataset RegressionDataset consisting of points that can be linearly regressed.
 * @param {Regression} regression The regression being used against the dataset.
 * @returns {number} The R^2 value in decimal form.
 */
function calculate_rsq(dataset: RegressionDataset, regression: Regression<RegressionType>)
{
    let y_avg = sum(dataset.y_vals) / dataset.y_vals.length;

    let total_sum_squares = 0;
    dataset.y_vals.forEach((y_val) => {
        total_sum_squares += square(y_val - y_avg);
    });

    let regression_sum_squares = 0;
    dataset.x_vals.forEach((x_val, index) => {
        regression_sum_squares += square((regression.slope * x_val + regression.y_int) - dataset.y_vals[index]);
    });

    let rsq = 1 - (regression_sum_squares / total_sum_squares);
    rsq = Math.round(rsq * 100) / 100;
    return rsq;
}

export type RegressionComparison = {
    dataset: RegressionDataset,
    reg_a: Regression<RegressionType>,
    reg_b: Regression<RegressionType>,
    rsq_reg_a: number,
    rsq_reg_b: number,
}
/**
 * Calculates and returns the R squared of two regressions against a dataset.
 * @param {RegressionDataset} dataset - The dataset both regressions are being compared against.
 * @param {Regression} reg_a - Regression A, usually the guess regression.
 * @param {Regression} reg_b - Regression B, usually the target regression.
 * @returns {RegressionComparison} Both regressions, the dataset, and the R^2 of both regressions.
 */
export function compare_regressions(dataset: RegressionDataset, reg_a: Regression<RegressionType>, reg_b: Regression<RegressionType>): RegressionComparison
{
    let a_result = round(calculate_rsq(dataset, reg_a), 2);
    let b_result = round(calculate_rsq(dataset, reg_b), 2);
    
    return {dataset: dataset, reg_a: reg_a, reg_b: reg_b, rsq_reg_a: a_result, rsq_reg_b: b_result};
}

export function least_squares_calc(x_vals: number[], y_vals: number[]): {slope: number, y_int: number}
{
    let xy: number[] = x_vals.map((value, index) => value*y_vals[index]);
    let xsq: number[] = x_vals.map((value) => value*value);

    let sum_xy: number = sum(xy);
    let sum_xsq: number = sum(xsq);
    let sum_x: number = sum(x_vals);
    let sum_y: number = sum(y_vals);

    let slope = ((x_vals.length*sum_xy)-(sum_x*sum_y))/((x_vals.length*sum_xsq)-((sum_x)*(sum_x)));
    let y_int = (sum_y-slope*sum_x)/(x_vals.length);

    return {slope, y_int}
}