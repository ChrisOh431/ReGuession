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
    coords: [number, number]
    coeff: number;
    y_int: number;
}
