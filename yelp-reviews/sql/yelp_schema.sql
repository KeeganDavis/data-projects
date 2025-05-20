-- create table to hold yelp review json
CREATE OR REPLACE TABLE yelp_reviews_json (reviews_text variant);

-- load in review data from s3 bucket
COPY INTO yelp_reviews_json
FROM 's3://path'
CREDENTIALS = (
    AWS_KEY_ID = 'AWS_ID'
    AWS_SECRET_KEY = 'AWS_KEY'
)
FILE_FORMAT = (TYPE = JSON);

-- break reviews json into columns and rows
CREATE OR REPLACE TABLE yelp_reviews AS
SELECT 
    reviews_text:business_id::STRING AS business_id,
    reviews_text:review_id::STRING AS review_id,
    reviews_text:user_id::STRING AS user_id,
    reviews_text:date::DATE AS review_date,
    reviews_text:text::STRING AS user_review,
    reviews_text:stars::NUMBER AS stars,
    reviews_text:cool::NUMBER AS cool_votes,
    reviews_text:funny::NUMBER AS funny_votes,
    reviews_text:useful::NUMBER AS useful_votes
FROM yelp_reviews_json;

-- create table to hold yelp businesses json
CREATE OR REPLACE TABLE yelp_businesses_json (businesses_text variant);

-- load in businesses data from s3 bucket
COPY INTO yelp_businesses_json
FROM 's3://path'
CREDENTIALS = (
    AWS_KEY_ID = 'AWS_ID'
    AWS_SECRET_KEY = 'AWS_KEY'
)
FILE_FORMAT = (TYPE = JSON);

-- break businesses json into columns and rows
CREATE OR REPLACE TABLE yelp_businesses AS
SELECT
    businesses_text:name::STRING AS name,
    businesses_text:business_id::STRING AS business_id,
    businesses_text:is_open::NUMBER AS is_open,
    businesses_text:review_count::NUMBER AS review_count,
    businesses_text:stars::NUMBER AS stars,
    businesses_text:categories::STRING AS categories,
    businesses_text:state::STRING AS state,
    businesses_text:city::STRING AS city,
    businesses_text:postal_code::STRING AS postal_code,
    businesses_text:latitude::FLOAT AS latitude,
    businesses_text:longitude::FLOAT AS longitude
FROM yelp_businesses_json;

-- create table to hold yelp users json
CREATE OR REPLACE TABLE yelp_users_json (users_text variant);

-- load in user data from s3 bucket
COPY INTO yelp_users_json
FROM 's3://path'
CREDENTIALS = (
    AWS_KEY_ID = 'AWS_ID'
    AWS_SECRET_KEY = 'AWS_KEY'
)
FILE_FORMAT = (TYPE = JSON);

CREATE OR REPLACE TABLE yelp_users AS
SELECT
    users_text:name::STRING AS first_name,
    users_text:user_id::STRING AS user_id,
    users_text:yelping_since::DATE AS yelping_since,
    users_text:review_count::NUMBER AS review_count,
    users_text:average_stars::FLOAT AS avg_stars,
    users_text:fans::NUMBER AS fans,
    users_text:compliment_cool::NUMBER AS cool_compliments,
    users_text:compliment_cute::NUMBER AS cute_compliments,
    users_text:compliment_funny::NUMBER AS funny_compliments,
    users_text:compliment_hot::NUMBER AS hot_compliments,
    users_text:compliment_list::NUMBER AS list_compliments,
    users_text:compliment_more::NUMBER AS more_compliments,
    users_text:compliment_note::NUMBER AS note_compliments,
    users_text:compliment_photos::NUMBER AS photo_compliments,
    users_text:compliment_plain::NUMBER AS plain_compliments,
    users_text:compliment_profile::NUMBER AS profile_compliments,
    users_text:compliment_writer::NUMBER AS writer_compliments,
    users_text:cool::NUMBER AS cool_votes,
    users_text:elite::STRING AS elite,
    users_text:funny::NUMBER AS funny_votes,
    users_text:useful::NUMBER AS useful_votes
FROM yelp_users_json;

-- create table to hold yelp tips json
CREATE OR REPLACE TABLE yelp_tips_json (tips_text variant);

-- load in user data from s3 bucket
COPY INTO yelp_tips_json
FROM 's3://path'
CREDENTIALS = (
    AWS_KEY_ID = 'AWS_ID'
    AWS_SECRET_KEY = 'AWS_KEY'
)
FILE_FORMAT = (TYPE = JSON);

CREATE OR REPLACE TABLE yelp_tips AS
SELECT
    tips_text:business_id::STRING AS business_id,
    tips_text:user_id::STRING AS user_id,
    tips_text:date::DATE AS date,
    tips_text:text::STRING AS tip,
    tips_text:compliment_count::NUMBER AS compliment_count
FROM yelp_tips_json;