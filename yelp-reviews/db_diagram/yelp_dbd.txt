yelp_businesses as b
---
business_id string PK
name string
is_open int
review_count int
stars int
categories string
state string
city string
postal_code string
latitude float
longitude float

yelp_reviews as r
---
business_id string FK >- b.business_id
review_id string PK
user_id string FK >- u.user_id
review_date date
user_review string
stars int
cool_votes int
funny_votes int
useful_votes int

yelp_users as u
---
first_name string
user_id string PK
yelping_since date
review_count int
avg_stars float
fans int
cool_compliments int
cute_compliments int
funny_compliments int
hot_compliments int
list_compliments int
more_compliments int
note_compliments int
photo_compliments int
plain_compliments int
profile_compliments int
writer_compliments int
cool_votes int
elite string
funny_votes int
useful_votes int

yelp_tips as t
---
business_id string PK FK >- b.business_id
user_id string PK FK >- u.user_id
date date PK
tip string
compliment_count int