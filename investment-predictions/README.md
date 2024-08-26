# deep-learning-challenge
**This is a copy of the repo found [here](https://github.com/KeeganDavis/deep-learning-challenge)**
## Description
This repository creates a neural network model to help the fictional company Alphabet Soup predict if applicants will be successful with the funding they supply.
## Requirements 
Pandas, TensorFlow, and Scikit-Learn are required for this repository.
## Installation
Clone the repository: git@github.com:KeeganDavis/deep-learning-challenge.git
## Usage
To use the repository, navigate to funding.ipynb, select a python kernel, and run all cells.
## Analysis 
### Overview of the Analysis
- The purpose of this analysis is to use data from the applicants to be able to predict if the applicant will be successful in their ventures, which in turn would be a good investment for Alphabet Soup.
### Results
* Data Preprocessing
    - The target variable for the model is 'IS_SUCCESSFUL'
    - The feature variables are 'APPLICATION_TYPE', 'AFFILIATION', 'CLASSIFICATION', 'USE_CASE', 'ORGANIZATION', 'STATUS', 'INCOME_AMT', 'SPECIAL_CONSIDERATIONS', and 'ASK_AMT' 
    - 'EIN' and 'NAME' were removed from the input data
- Compiling, Training, and Evaluating the Model
    - The first model contained two hidden layers with 115 neurons with 3 activation functions. These parameters were chosen to try and create a high performing model with few hidden layers and not a lot of complexity.
    - The target model performance was not achieved because the highest accuracy attained was 72.92%.
    - More hidden layers, more neurons, and different activation functions were used to try and increase model performance, but the change in accuracy was negligible from the original model.
### Summary
- Overall this deep learning model failed to reach the required performance, so it should not be used by Alphabet Soup without further modifications. In order to reach the desired performance metrics, the bins for 'CLASSIFICATION' and 'APPLICATION_TYPE' could be modified to see if there is any change in performance. More feature variables could be dropped to see if the model can make better predictions. Ideally we would drop the variables with less unique values because those variables would have the least variation and may have less impact on the success of the applicants. More testing is recommended before Alphabet Soup uses the model to determine which applicants to fund.