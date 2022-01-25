# Reguession

![logo](/public/android-chrome-192x192.png)

[Live Deployment](https://reguession.netlify.app) hosted on Netlify.

Fun 'lil inear statistics-centered minigame based around guessing as close as possible to a linear regression for a dataset.

Lovingly assembled using (in no particular order) [React,](https://reactjs.org/) [TypeScript,](https://www.typescriptlang.org/) [math.js,](https://mathjs.org) [Jest,](https://jestjs.io) [Material UI,](https://mui.com/) [Chart.js,](https://www.chartjs.org/) [react-chartjs-2,](https://github.com/reactchartjs/react-chartjs-2) [scikit-learn](https://scikit-learn.org/stable/index.html) and [NumPy.](https://numpy.org)

Feature complete as of 1/23/22

## Installation

Standard procedure. Clone the repo to your environment,
then run:

```$
cd reguession

npm install

npm start
```
Reguession will be live at `localhost:3000`


## Dataset Regeneration

If you wish to generate new datasets for the game, make sure you have numpy, scikit-learn, and matplotlib installed, then run:

```$
python3 model_gen/model_generator.py
```



