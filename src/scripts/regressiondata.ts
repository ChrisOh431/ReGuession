enum RegressionType {
    AI,
    LeastSqurares,
    Guess
}

export interface Regression<RegressionType> {
    slope: number;
    y_int: number;
    reg_type: RegressionType;
}

let regression: Regression<RegressionType.Guess>

