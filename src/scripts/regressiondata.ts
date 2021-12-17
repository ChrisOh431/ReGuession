import * as test_regressions from "../reguessiondatasets.json";


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
    x_vals: number[];
    y_vals: number[];
    coeff: number;
    y_int: number;
}

export function deserialize_datasets(sets: { x_vals: number[]; y_vals: number[]; coeff: number; y_int: number; }[]): RegressionDataset[] {
    let dataset_objects: RegressionDataset[] = [];
    console.log(sets);

    for (let dataset of sets) {
        let deserialized_data: RegressionDataset = {
            x_vals: [],
            y_vals: [],
            coeff: 0,
            y_int: 0,
        };

        Object.assign(deserialized_data, dataset);
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