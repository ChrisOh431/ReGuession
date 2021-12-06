import numpy as np
from sklearn import datasets
import matplotlib.pyplot as plt  # for plotting

x, y, coef = datasets.make_regression(n_samples=100,  # number of samples
                                      n_features=1,  # number of features
                                      n_informative=1,  # number of useful features
                                      noise=10,  # bias and standard deviation of the guassian noise
                                      coef=True,  # true coefficient used to generated the data
                                      random_state=0)  # set for same data points for each run

x = np.interp(x, (x.min(), x.max()), (0, 40))

y = np.interp(y, (y.min(), y.max()), (20000, 150000))

plt.ion()  # interactive plot on
plt.plot(x, y, '.', label='training data')
