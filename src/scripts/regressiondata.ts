import { sum, square, round } from "mathjs";
import regressions from "../reguessiondatasets.json";

const test_regressions: RegressionDataset[] = regressions

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

export interface RegressionDataset {
    name?: string;
    x_vals: number[];
    y_vals: number[];
    coeff: number;
    y_int: number;
}

export function deserialize_datasets(sets: RegressionDataset[]): RegressionDataset[] {
    let dataset_objects: RegressionDataset[] = [];
    console.log(sets);

    for (let index = 0; index < sets.length; index++) {
        const dataset = sets[index];

        let deserialized_data: RegressionDataset = {
            name: `${index}`,
            x_vals: [],
            y_vals: [],
            coeff: 0,
            y_int: 0,
        };

        Object.assign(deserialized_data, dataset);
        
        /*
        let updateds = least_squares_calc(deserialized_data.x_vals, deserialized_data.y_vals);

        deserialized_data.coeff = updateds.slope;
        deserialized_data.y_int = updateds.y_int;
        */
       
        dataset_objects.push(deserialized_data);    
    }

    return dataset_objects
}

export const test_data = deserialize_datasets(test_regressions);

function min_max(min_x: number, max_x: number, regression: Regression<RegressionType>): [{ x: number, y: number }, { x: number, y: number }] {
    let x_min = min_x;
    let y_min = regression.y_int;
    const min = { x: x_min, y: y_min };

    let x_max = max_x;
    let y_max = (regression.slope * x_max) + regression.y_int;
    const max = { x: x_max, y: y_max };

    return [min, max];
}

export function enhance_regression(regression: Regression<RegressionType>): EnhancedRegression<RegressionType> {
    const enhancements = min_max(0, 100, regression);

    let enhanced: EnhancedRegression<RegressionType> = { ...regression, min: enhancements[0], max: enhancements[1] };

    return enhanced;
}

function least_squares_calc(x_vals: number[], y_vals: number[]): {slope: number, y_int: number}
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
export function compare_regressions(dataset: RegressionDataset, reg_a: Regression<RegressionType>, reg_b: Regression<RegressionType>): RegressionComparison
{
    let a_result = round(calculate_rsq(dataset, reg_a), 2);
    let b_result = round(calculate_rsq(dataset, reg_b), 2);
    
    return {dataset: dataset, reg_a: reg_a, reg_b: reg_b, rsq_reg_a: a_result, rsq_reg_b: b_result};
}

let rsq_test: RegressionDataset = {
    coeff: 0,
    x_vals: [0, 2, 4],
    y_vals: [1, 4, 4],
    y_int: 0,
}

let rsq_reg_test: Regression<RegressionType.Answer> = {
    reg_type: RegressionType.Answer,
    slope: 0.75,
    y_int: 1.5
}


console.log("tes reg: "+calculate_rsq(rsq_test, rsq_reg_test));
console.log("tes ls sqr: ");
console.dir(least_squares_calc(rsq_test.x_vals, rsq_test.y_vals));

