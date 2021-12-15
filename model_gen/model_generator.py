import json
import numpy as np
from sklearn import datasets
from random import randint


def create_reguession_dataset(noise, count, randvar):
    x, y, coef = datasets.make_regression(n_samples=count+2,  # number of samples
                                          n_features=1,  # number of features
                                          n_informative=1,  # number of useful features
                                          noise=noise,  # bias and standard deviation of the guassian noise
                                          coef=True,  # true coefficient used to generated the data
                                          random_state=randvar)  # set for same data points for each run
    x = [x_coord[0] for x_coord in np.interp(x, (x.min(), x.max()), (0, 100))]
    y = [y_coord for y_coord in np.interp(y, (y.min(), y.max()), (0, 100))]

    # every regression included 0.0 and 100.0
    y_min = min(y)
    y_max = max(y)

    x_of_y_min = y.index(y_min)
    x_of_y_max = y.index(y_max)
    
    x.pop(x_of_y_min)
    x.pop(x_of_y_max)

    y.remove(y_min)
    y.remove(y_max)

    return (coef.item(), 0, x, y)


def serialize_reguession_datasets(datasets, location):
    outdata = []
    with open(location, "w") as datasetfile:
        for dataset in datasets:
            jsondata = {
                "x_vals": dataset[2],
                "y_vals": dataset[3],
                "coeff": dataset[0],
                "y_int": dataset[1]
            }
            outdata.append(jsondata)

        json.dump(outdata, datasetfile, indent=4)
        
    return outdata

seeds = [1, 12, 42, 64, 256]
exts = [randint(120, 550) for i in range(10)]
seeds.extend(exts)

outsets = []

for seed in seeds:
    outsets.append(create_reguession_dataset(5, 10, seed))

serialize_reguession_datasets(outsets, "./src/reguessiondatasets.json")