import { RegressionSet, least_squares_calc, Regression, RegressionDataset, RegressionType } from "./regressiondata";

it("doesn't have numbers above 100", () => {
    for (const set of RegressionSet) {
        const max = Math.max(...set.y_vals);
        expect(max).toBeLessThan(100);
    }
});

describe("least square calculation", () => {
    it("[(0, 1), (2, 4), (4, 4)]'s regression is y = 0.75x + 1.5", () => {
        let rsq_test: RegressionDataset = {
            name: "test",
            coeff: 0,
            x_vals: [0, 2, 4],
            y_vals: [1, 4, 4],
            y_int: 0,
        }

        let result = least_squares_calc(rsq_test.x_vals, rsq_test.y_vals);
        let expected = { slope: 0.75, y_int: 1.5 }

        expect(result).toEqual(expected);
    });

    it("[(1, 2), (2, 5), (3, 3), (4, 8), (5, 7)]'s regression is y = 0.75x + 1.5", () => {
        let rsq_test: RegressionDataset = {
            name: "test",
            coeff: 0,
            x_vals: [1, 2, 3, 4, 5],
            y_vals: [2, 5, 3, 8, 7],
            y_int: 0,
        }

        let result = least_squares_calc(rsq_test.x_vals, rsq_test.y_vals);
        let expected = { slope: 1.3, y_int: 1.1 }

        expect(result).toEqual(expected);
    });
});