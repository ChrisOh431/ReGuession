import json
import numpy as np
from sklearn import datasets
from random import randint


def create_reguession_dataset(noise, count):
    x, y, coef = datasets.make_regression(n_samples=count,  # number of samples
                                          n_features=1,  # number of features
                                          n_informative=1,  # number of useful features
                                          noise=noise,  # bias and standard deviation of the guassian noise
                                          coef=True,  # true coefficient used to generated the data
                                          random_state=5)  # set for same data points for each run
    x = np.interp(x, (x.min(), x.max()), (0, 100))
    y = np.interp(y, (y.min(), y.max()), (0, 100))

    x_coords = []
    y_coords = []

    for x_coord, y_coord in zip(x, y):
        x_coords.append(x_coord[0])
        y_coords.append(y_coord)

    return (coef.item(), x_coords, y_coords)


def serialize_create_reguession_dataset(dataset, location=""):
    jsondata = {
        "x_vals": dataset[1],
        "y_vals": dataset[2],
        "coeff": dataset[0],
        "y_int": 0
    };

    if location:
        with open("location", "w") as datasetfile:
            json.dump(jsondata, datasetfile, indent=4)

    return jsondata


print(create_reguession_dataset(5, 5))
