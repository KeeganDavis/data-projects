**Note: This is a copy of the repo found [here](https://github.com/TaylorMater/UTA-BootCamp-Final-Project)**

# Predicting Tennis Match Winners 2009-2023 
## Description
The goal of this project was to use a few of the machine learning algorithms we have been introduced to in the course on a real world data set, in this case, tennis statistics, to try to formulate conclusions about said data. After cleaning and processing the data scrupulously, these investigations led us to identify some of the most important features for determining the winner of a match. We also were able to set up a neural network that performed noticeably better than chance at predicting the winner of a match without any match statistics whatsoever, although that could be subject to overfitting. Presentation slides [here](https://docs.google.com/presentation/d/1Qq7w7HWuwbpAAd2Q-pAjcytenulVI3AKPGELWZcJQKs/edit#slide=id.p)

## Data Sources
- [tennis_atp by JeffSackman on GitHub](https://github.com/JeffSackmann/tennis_atp)
- [Huge Tennis Database by guillemservera on Kaggle](https://www.kaggle.com/datasets/guillemservera/tennis/data)
## Requirements

- Libraries:
    - pandas
    - scikit-learn
    - tensorflow
    - sqlite3
    - scikeras
 
- Git Large File Storage might be necessary to handle the sqlite database
- python version 3.10
    

## Repo Overview
- /resources - contains sqlite database and tables of model performance over different versions
- /keegan-scripts - contains data cleaning notebook and notebooks for random forest classification models
- /michael-scripts - contains linear SVC and polynomial model scripts
- /rafa-scripts - contains linear SVC model scripts
- /riley-scripts - contains Neural Network model scripts

## Installation
Clone the repository, download necessary libraries above. Download database.sqlite from [here](https://www.kaggle.com/datasets/guillemservera/tennis/data) and add to the resources directory. Run the data cleaning script in `keegan-scripts` to create the `.csv` file that all of the scripts rely on from the original sqlite database. From there, choose the script of the model you want to investigate, and run all cells from there. 

## Data Cleaning
- Filtered out lower level tournaments (Challengers, Satellites/ITFs, and Davis Cup), qualifying rounds, and matches before the 2009 season because that is when the ranking system changed.
- All set scores were in one column, so the scores for each set and each player were separated into their respective columns.
- The match winner and loser stats were located in the same column, so they needed to be split into two separate rows. 
- A column was created to indicate if the player won or lost the match.
## Model Analysis
### Random Forest Classification Model
- A random forest classification model was used to try and predict the outcomes of tennis matches from 2009-2023. The data contains both categorical and numerical features, so this model was chosen because it is able to handle both types of features. The scores for this model were: \
![model scores](/Resources/random_forest_scores.png)
- Before training the model, the numerical features were standardized, missing numerical data points were imputed using the mean, and missing categorical features were imputed using the most frequent value.
- Version 1 of the model was a basic random forest using player name, country code, rank, rank points, age, height, ID, hand, and match stats. 
- Version 2 was a random forest with grid search cv to find the best hyperparameters.
- Version 3 was a random forest with stratified k-fold cross-validation added to the grid search cv to prevent overfitting. The player ID, name, and rank points columns were dropped.
- Version 4 used the same hyperparameter tuning from version 3 and dropped the player rank and country code columns.
- Version 5 used the same hyperparameter tuning from version 3 and dropped the player height, age, and hand columns. The 'F' (Tour Finals) level tournaments were also dropped from the data because set scores only go to 4.
- This model performed well enough that it could be confidently used to predict the outcome of matches using only match stats or match and player stats. The accuracy, precision, recall, F1-score, and ROC AUC are above .8, which is a sign of good predictive power. I would recommend this model to be used in predicting match outcomes using only match stats (version 5) and using match stats and player stats (version 1).
- A future optimization would be to train the model without using the set score to see if the model can still make an accurate prediction. The set score could have caused overfitting, but if the current model is given all the match stats, it still has good predictive power.

### Support Vector Classifier (SVC)
- We handled missing values by removing rows with incomplete data. 
- Categorical variables, such as the surface type, tournament level, player country code, and match round, were one-hot encoded to convert them into a suitable format for machine learning.
- We selected several key features that we believed would impact match outcomes, including player age, minutes played, player aces, double faults, serve points, and rankings.
- We then trained a Support Vector Classifier (SVC) with a linear kernel using an 80-20 train-test split.
  ![image](https://github.com/TaylorMater/UTA-BootCamp-Final-Project/assets/153253842/9c4b1aad-555b-4454-8647-6c896243825c)


### Neural Network Model
- 6 versions of this model were created over various iterations in optimization/attempts at exploring a predictive network independent from match statistics. Their scores were \
![model scores](/Resources/neural_network_scores.png)
- Numerical features were standardized and missing values were imputed using the mean, while categorical features were one hot encoded and imputed by most frequent value.
- Version 1: Created neural network where nearly every data column was a feature. Chose to drop innocuous ID-like information or dates. GridSearchCV for hyperparameter tuning (but didn’t check many parameters)
- Version 2: Version 1 but additional columns dropped - player name and country. Tried to reduce noise. 
- Version 3: Version 2 but additional columns dropped to reduce noise - round and best_of.
- Version 4: Version 3 but dropped ‘F’ level tournaments from the data set because they arguably could skew the data. 
- Version 5: Dropped almost all categorical data/non match data. Continued to drop the ‘F’ level tournaments. Best result, but not surprising.
- Version 6: Experimental, zero match data, purely features like height, surface, etc. The most “predictive” model, but least accurate/precise. Still, noticeably better than chance.

*For more information on the neural network, please see [riley-scripts](riley-scripts/)*


## Limitations
- Time and computing power were the two biggest limitations of our models.
- It was harder to optimize the neural network when its initial metrics were >97% accuracy
- Hyperparameter tuning also found very marginal improvements, but were hampered by an incredible drain on computing power 
- Originally we were going to test 12 parameters, but cut the script execution after 2 hours straight with no results. Distributed computing/better library integration would be the solution going forward.
- Reducing noise/trying to prevent overfitting helped somewhat, but the best result without messing with layers/epochs/neurons too much was only ~98% accuracy
- Predictive capabilities of neural network, without actual match statistics, would require more data

## Contributors
- [Riley Taylor](https://github.com/TaylorMater)
- [Michael Spence](https://github.com/michael8607)
- [Rafael Realyvazquez](https://github.com/realyvazquez7)
- [Keegan Davis](https://github.com/KeeganDavis)
## Code Sources
- https://stackoverflow.com/questions/45565311/pandas-interleave-zip-two-dataframes-by-row \
- https://scikit-learn.org/stable/auto_examples/compose/plot_column_transformer_mixed_types.html \
- https://hyperskill.org/learn/step/15401
