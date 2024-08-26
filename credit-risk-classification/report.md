# Credit Risk Report

## Overview of the Analysis
- This analysis was done to classify the loans in question into a high risk or a healthy loan category. The data consisted of the agreement of the loan and financial information of the person requesting the loan to try and predict if the loans would be healthy or high risk. This analysis was trying to predict whether a loan would be a risky or smart decision for the financial institution to take. 
- In order to predict the riskiness of a loan, the loan status was assigned as the target variable and the rest of the columns were the features. The data was then split into training and testing data. A logistic regression model was initialized and the testing data was used to train the model. Our model was used to predict whether the loan would be healthy or high risk by using the features testing data. A confusion matrix and classification report were generated using the loan status testing values and the predictions from our model. 

## Results
* Logistic Regression Model:
    - Healthy loan predictions have a precision of 100%, recall of 99%, and the accuracy is 99%.
    - High-Risk loan predictions have a precision of 85%, recall of 91%, and the accuracy is 99%.

## Summary
The machine learning model is almost perfect at predicting healthy loans and is pretty good at predicting high-risk loans, but still needs some optimizing. The precision and f1 score of the healthy predictions are 100% and the recall is 99%, so the model performs best for predicting healthy loans. In this case, it is important to make good predictions for healthy loans and high-risk loans. As a financial institution giving out loans, it is important to avoid false positives and false negatives. Having a low performing model could mean that loans are given out to high-risk customers and loans are not given out to low-risk customers, which could have a big impact on the company's financial standing. The model could definitely be used to predict a healthy loan, but still needs to be further optimized to be able to predict high-risk loans without the risk of false positives or false negatives. 