import numpy as np
from sklearn import datasets
import matplotlib.pyplot as plt  # for plotting

x, y, coef = datasets.make_regression(n_samples=100,  # number of samples
                                      n_features=1,  # number of features
                                      n_informative=1,  # number of useful features
                                      noise=10,  # bias and standard deviation of the guassian noise
                                      coef=True,  # true coefficient used to generated the data
                                      random_state=0)  # set for same data points for each run

