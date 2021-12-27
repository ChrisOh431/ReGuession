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
    x = [x_coord[0] for x_coord in np.interp(x, (x.min(), x.max()), (0, 50))]
    y = [y_coord for y_coord in np.interp(y, (y.min(), y.max()), (0, 50))]

    # every regression included 0.0 and 100.0
    y_min = min(y)
    x_of_y_min = y.index(y_min)
    x.pop(x_of_y_min)
    y.remove(y_min)

    y_max = max(y)
    x_of_y_max = y.index(y_max)
    x.pop(x_of_y_max)
    y.remove(y_max)    

    return (coef.item(), 0, np.array(x), np.array(y))

def add_y_ints(dataset):
    yint = randint(0, 50)

    # numpy arrays are really nice!
    return (dataset[0], yint, dataset[2], np.array(dataset[3])+yint)

def make_negative(dataset):
    # numpy arrays save the day again!
    return (dataset[0], dataset[1], dataset[2], np.flip(dataset[3]))


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
    dataset = create_reguession_dataset(5, 10, seed)
    
    # coinflip adding a y int
    addyint = randint(0,1)
    if (addyint == 1):
        dataset = add_y_ints(dataset)

    # coinflip making the slope negative
    slope = randint(0,1)
    if (slope == 1):
        dataset = make_negative(dataset)

    dataset = (dataset[0], dataset[1], dataset[2].tolist(), dataset[3].tolist())

    outsets.append(dataset)

serialize_reguession_datasets(outsets, "./src/reguessiondatasets.json")