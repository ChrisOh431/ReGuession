export enum RegressionType {
    AI,
    LeastSqurares,
    Guess
}

export interface Regression<RegressionType> {
    slope: number;
    y_int: number;
    reg_type: RegressionType;
}

export interface RegressionDataset {
    x_vals: number[];
    y_vals: number[];
    coeff: number;
    y_int: number;
}
