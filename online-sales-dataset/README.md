# Online Sales Dataset - Popular Marketplace Data

## Overview
This repository is an analysis of the [online sales dataset](https://www.kaggle.com/datasets/shreyanshverma27/online-sales-dataset-popular-marketplace-data) on Kaggle to uncover insights and trends using python and SQL. The analysis focuses on various aspects such as product categories, sales volume, revenue distribution, and payment methods. The goal is to provide actionable recommendations to optimize sales and marketing strategies.

[Link to Google Slides Presentation](https://docs.google.com/presentation/d/1tw-eIU5FwjinZmDZ3hHyYeQV29FJjaFbF5qL_HBBMPI/edit?usp=sharing)

## Table of Contents
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Analysis](#analysis)
- [Results](#results)
- [License](#license)

## Project Structure
```
online-sales-dataset
 ┣ data
 ┃ ┣ processed
 ┃ ┃ ┗ sales_data_final.csv
 ┃ ┗ raw
 ┃ ┃ ┗ online_sales_data.csv
 ┣ images
 ┃ ┣ avg-unit-price-by-cat.png
 ┃ ┣ payment-month.png
 ┃ ┣ payment-pie.png
 ┃ ┣ revenue-by-cat-month.png
 ┃ ┣ revenue-by-cat-pie.png
 ┃ ┣ revenue-by-cat.png
 ┃ ┣ revenue-by-payment.png
 ┃ ┣ revenue-by-region.png
 ┃ ┣ revenue-month-pie.png
 ┃ ┣ units-sold-by-cat.png
 ┃ ┣ units-sold-month-pie.png
 ┃ ┗ units-sold-month.png
 ┣ notebooks
 ┃ ┣ analysis.ipynb
 ┃ ┗ data_preparation.ipynb
 ┣ sql
 ┃ ┣ monthly_sales_queries.sql
 ┃ ┣ overall_sales_queries.sql
 ┃ ┗ sales_schema.sql
 ┣ src
 ┃ ┣ analysis.py
 ┃ ┗ data_preparation.py
 ┣ notes.md
 ┣ online-sales-dataset-slides.pdf
 ┣ README.md
 ┗ requirements.txt
 ```

## Installation

### Prerequisites
- **Python**: Ensure you have Python `3.11.5` installed. If not, you can download it from [python.org](https://www.python.org/downloads/release/python-3115/).
- **Anaconda**: Ensure you have Anaconda installed. If not, you can download it from [anaconda.com](https://www.anaconda.com/products/individual). This project was set up using Conda version `24.5.0`.
- **PostgreSQL**: Ensure you have PostgreSQL installed to run the SQL scripts.

### Setup
1. Clone the repository:
```sh
git clone git@github.com:KeeganDavis/data-projects.git
cd data-projects/online-sales-dataset
```
2. Create and activate a new Conda environment:
```sh
conda create --name online-sales python=3.11.5
conda activate online-sales
```
3. Install the required packages: 
```sh
pip install -r requirements.txt
```

## Usage

### Python Analysis
1. **Data Preparation**:
    - Run the data preparation script to clean and preprocess the raw data.
```sh
python src/data_preparation.py
```
2. **Analysis**:
    - Perform data analysis and generate visualizations to illustrate the findings using the provided script.
```sh
python src/analysis.py
```
### SQL Analysis
1. **Set Up the Database**:
    - Use the `sales_schema.sql` file to create the necessary database schema.
2. **Run the SQL Queries**:
    - Execute the queries in `overall_sales_queries.sql` and `monthly_sales_queries.sql` to analyze the data.

## Analysis
The analysis focuses on several key areas:
1. **Product Categories**:
    - Determine the highest and lowest selling categories.
    - Analyze the average sales price and units sold.
2. **Revenue Distribution**:
    - Calculate the contribution of each category to the total revenue.
    - Examine the correlation between average unit price and total revenue.
3. **Payment Methods**:
    - Assess the usage and revenue contribution of different payment methods.
4. **Monthly Trends**:
    - Identify revenue and sales trends over different months.
    - Provide recommendations for optimizing sales during low-performing months.

## Results
- **Electronic Products**:
    - Highest average sale price.
    - Contribute 43% of the total revenue.
    - Rank fourth in units sold.
- **Books**:
    - Lowest average sale price.
    - Rank second in units sold.
    - Contribute 2.31% of the total revenue.
- **Payment Methods**:
    - Credit cards are the most used and contribute the most to total revenue.
    - PayPal and debit cards follow in usage and revenue contribution.
- **Monthly Trends**:
    - The first four months account for the majority of total revenue.
    - Focused marketing efforts on low-performing months can increase overall revenue.

## License
This project is licensed under the MIT License. See the [LICENSE](/LICENSE) file for details.