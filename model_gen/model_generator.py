import json
import numpy as np
from sklearn import datasets
from random import randint, choice, random, sample
import matplotlib.pyplot as plt
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
        x, y = datasets.make_regression(n_samples=samplecount+2,  # number of samples
                                              n_features=1,  # number of features
                                              n_informative=1,  # number of useful features
                                              noise=noise,  # bias and standard deviation of the guassian noise
                                              random_state=9+seed)
        
        x = [x_coord[0] for x_coord in np.interp(x, (x.min(), x.max()), (0, 100))]
        y = [y_coord for y_coord in np.interp(y, (y.min(), y.max()), (0, 100))]

        return cls(x, y)


    def add_y_int(self):
        yint = randint(0, 50)
        #self.y += np.array(self.y)+yint

    def make_negative(self):
        self.y = [y_coord for y_coord in np.interp(self.y, (min(self.y), max(self.y)), (100, 0))]

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

    def remove_extr(self):
        # every regression included 0.0 and 100.0
        y_min = min(self.y)
        x_of_y_min = self.y.index(y_min)
        self.x.pop(x_of_y_min)
        self.y.remove(y_min)
    
        y_max = max(self.y)
        x_of_y_max = self.y.index(y_max)
        self.x.pop(x_of_y_max)
        self.y.remove(y_max)   

"""
test_dataset = ReguessionDataset([0, 2, 4], [1, 4, 4])
test_dataset.make_negative()
test_dataset.finalize_reg()

print("test results: ", test_dataset.slope, test_dataset.y_int)
"""

class RegressionManager():
    def __init__(self, setcount, samplesize, noise):
        self.datasets = []
        self.seeds = range(setcount)

        for i in range(setcount):
            new_set = ReguessionDataset.generate(samplesize, noise, i)

            # coinflips to keep data interesting

            if (choice([True, True, False])):
                new_set.add_y_int()

            if (choice([True, False])):
                new_set.make_negative()

            

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
    
manager = RegressionManager(25, 80, randint(30,55))
manager.write("../src/reguessiondatasets.json")

# gen testing, for dataset conformity

"""
plotcntwidth = 5
fig, plotobjs = plt.subplots(plotcntwidth,plotcntwidth)

plots = []
for col in plotobjs:
    for row in col:
        plots.append(row)

for ind, plot in enumerate(manager.datasets[:plotcntwidth*plotcntwidth]):
    plots[ind].plot(plot.x, plot.y, '*')

for ax in fig.get_axes():
    ax.label_outer()
plt.show()
"""