import json
import numpy as np
from sklearn import datasets
from random import randint, choice, sample
# rewrite to make dataset gen end to end in py, including correcting answer 

class ReguessionDataset:
    def __init__(self, x_data, y_data):
        self.x = x_data
        self.y = y_data
        self.slope = 0
        self.y_int = 0

    @classmethod
    def from_existing(cls, x_vals, y_vals):
        return cls(np.array(x_vals), np.array(y_vals))

    @classmethod
    def generate(cls, samplecount, noise, seed):
        x, y, coef = datasets.make_regression(n_samples=samplecount+2,  # number of samples
                                              n_features=1,  # number of features
                                              n_informative=1,  # number of useful features
                                              noise=noise,  # bias and standard deviation of the guassian noise
                                              coef=True,  # true coefficient used to generated the data
                                              random_state=seed)  # set for same data points for each run
        
        x = [x_coord[0] for x_coord in np.interp(x, (x.min(), x.max()), (0, 50))]
        y = [y_coord for y_coord in np.interp(y, (y.min(), y.max()), (0, 50))]

        return cls(x, y)


    def add_y_int(self):
        yint = randint(0, 50)
        self.y += np.array(self.y)+yint

    def make_negative(self):
        self.y = np.flip(self.y)

    def finalize_reg(self):
        self.x = np.array(self.x)
        self.y = np.array(self.y)

        xy = self.x * self.y
        xsq = np.square(self.x)

        sum_xy = np.sum(xy)
        sum_xsq = np.sum(xsq)
        sum_x = np.sum(self.x)
        sum_y = np.sum(self.y)

        slope_numer = ((len(self.x)*sum_xy) - (sum_x*sum_y))
        slope_denom = ((len(self.x)*sum_xsq)-((sum_x)*(sum_x)))
        
        slope = slope_numer/slope_denom
        y_int = (sum_y-slope*sum_x)/(len(self.x))
        
        self.slope = slope
        self.y_int = y_int

    # returns a JSON string with properly calculated regressions

test_dataset = ReguessionDataset([0, 2, 4], [1, 4, 4])
test_dataset.make_negative()
test_dataset.finalize_reg()

print(test_dataset.slope, test_dataset.y_int)

class RegressionManager():
    def __init__(self, setcount, samplesize, noise):
        self.datasets = []
        self.seeds = range(setcount)

        for i in range(setcount):
            new_set = ReguessionDataset.generate(samplesize, noise, i)

            # coinflips to keep data interesting
            if (choice([True, True, True, False])):
                new_set.make_negative()

            if (choice([True, True, False])):
                new_set.add_y_int()            

            self.datasets.append(new_set)

    def write(self, location):
        outdata = []
        with open(location, "w") as datasetfile:
            for dataset in self.datasets:
                dataset.finalize_reg()

                jsondata = {
                    "x_vals": dataset.x.tolist(),
                    "y_vals": dataset.y.tolist(),
                    "coeff": dataset.slope,
                    "y_int": dataset.y_int
                }

                outdata.append(jsondata)

            json.dump(outdata, datasetfile, indent=4)
    
manager = RegressionManager(10, 20, 0)
manager.write("../src/reguessiondatasets.json")
