# data-visualization-challenge
## Description
This repository analyzes data from the fictional pharmaceutical company, Pymaceuticals Inc. The CSV files contain mouse metadata and the impact of each drug regimen on tumor volume within each mouse over the observed timepoints. The data is first cleaned to remove duplicate mouse records and then analyzed. Summary statistics — mean, median, variance, standard deviation, and SEM — are calculated for the tumor volume of each drug regimen. Bar charts and pie charts are created to display the number of observed timepoints for each drug regimen and the percentage of tested mice by sex, respectively. For the Capomulin, Ramicane, Infubinol, and Ceftamin drug regimens, upper and lower boundaries are used to identify any outliers in the final observed tumor volume. The final observed tumor volumes for these four drug regimens are then visualized using a box plot to highlight potential outliers and compare the efficacy of the drug regimens. A random mouse is selected to illustrate the change in tumor volume across all observed timepoints. Finally, we create a scatter plot of mouse weight versus tumor volume and calculate the correlation coefficient, as well as develop a linear regression model.
## Requirements
The pandas, matplotlib.pyplot, and scipy.stats modules are required for the project.
## Installation
Clone the repository: git@github.com:KeeganDavis/data-visualization-challenge.git
## Usage 
Select a python kernel and run all code blocks to generate the dataframes and figures used to analyze the dataset
## Code Sources
-Find duplicate values (https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.duplicated.html) \
-Drop values by index (https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.drop.html#pandas.DataFrame.drop) \
-Adding a top-level header to a dataframe (https://pandas.pydata.org/docs/reference/api/pandas.MultiIndex.from_product.html#pandas.MultiIndex.from_product) \
-Check to see if a value is in a series to filter a dataframe (https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.isin.html#pandas.DataFrame.isin) \
-Get first value of each group in a groupedby series (https://pandas.pydata.org/docs/reference/api/pandas.Series.first.html#pandas.Series.first) \

