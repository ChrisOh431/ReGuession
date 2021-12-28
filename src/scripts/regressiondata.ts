import { sum } from "mathjs";
import _test_regressions from "../reguessiondatasets.json";

const test_regressions: RegressionDataset[] = _test_regressions

export enum RegressionType {
    Artif,
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
        
        let updateds = least_squares_calc(deserialized_data.x_vals, deserialized_data.y_vals);

        deserialized_data.coeff = updateds.slope;
        deserialized_data.y_int = updateds.y_int;

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

function calculate_error(guess: Regression<RegressionType.Guess>, answer: Regression<RegressionType.Answer>)
{
    
}