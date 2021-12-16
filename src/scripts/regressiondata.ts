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
    x_min: number;
    x_max: number;
}

export interface RegressionDataset {
    x_vals: number[];
    y_vals: number[];
    coeff: number;
    y_int: number;
}

export function deserialize_datasets(sets: RegressionDataset[]): RegressionDataset[] {
    let dataset_objects: RegressionDataset[] = [];

    for (let dataset of sets) {
        let deserialized_data: RegressionDataset = {
            x_vals: [],
            y_vals: [],
            coeff: 0,
            y_int: 0,
        };

        Object.assign(deserialized_data, dataset);
        dataset_objects.push(dataset);
    }

    return dataset_objects
}

export const test_data = deserialize_datasets(test_regressions);

export function enhance_regression(regression: Regression<RegressionType>): EnhancedRegression<RegressionType>
{
    let enhanced: EnhancedRegression<RegressionType>;

    let min = (() => {
        let xmin = Math.min(...dataset.x_vals);
        let ymin = 
        return {xmin, y}
    })();
    let max = (() => {})();

    let data = [(() => { 
        return {x: xmin, y: (regression.slope*xmin)+regression.y_int }})() }, () => {
        let xmax = Math.max(...dataset.x_vals); 
        return {x: xmax, y: (regression.slope*xmax)+regression.y_int }}()]

}