#!/usr/bin/env python
# coding: utf-8

# In[1]:


# import dependencies
import pandas as pd
import plotly.express as px


# In[2]:


# read csv into df
df = pd.read_csv('../data/processed/sales_data_final.csv')
df.head()


# ## Total Database Analysis
# - Average unit price by product category
# - Total units sold by product category
# - Total revenue by item category
# - Revenue distribution by item category
# - Distribution of payment methods used
# - Total revenue by payment method
# - Total revenue by region

# In[3]:


# average unit price by category series
avg_unit_price_category = df.groupby(by=['Product Category'])['Unit Price'].mean().sort_values(ascending=False)

avg_unit_price_category


# In[4]:


# plot bar chart of average unit price per category for entire dataset
fig = px.bar(avg_unit_price_category, x=avg_unit_price_category.index, y=avg_unit_price_category.values,
             labels={
                 'x': 'Category', 
                 'y': 'Mean Unit Price'
                 },
             title='Mean Unit Price by Item Category',
             color=avg_unit_price_category.index,
             text_auto=True
             )
fig.update_traces(textfont_size=11, textangle=0, textposition="outside", cliponaxis=False, texttemplate='%{y:.2f}')
fig.show()


# In[5]:


# total units sold per category series
total_units_sold_category = df.groupby(by=['Product Category'])['Units Sold'].sum().sort_values(ascending=False)

total_units_sold_category


# In[6]:


# plot bar chart for total units sold per category
fig = px.bar(total_units_sold_category, x=total_units_sold_category.index, y=total_units_sold_category.values,
             labels={
                 'x': 'Category', 
                 'y': 'Units Sold'
                 },
             title='Total Units Sold by Item Category',
             color=total_units_sold_category.index,
             text_auto=True
             )
fig.update_traces(textfont_size=11, textangle=0, textposition="outside", cliponaxis=False)
fig.show()


# In[7]:


# total revenue per category series
total_revenue_category = df.groupby(by=['Product Category'])['Total Revenue'].sum().sort_values(ascending=False)

total_revenue_category


# In[8]:


# plot bar chart for total revenue per category
fig = px.bar(total_revenue_category, x=total_revenue_category.index, y=total_revenue_category.values,
             labels={
                 'x': 'Category', 
                 'y': 'Total Revenue'
                 },
             title='Total Revenue by Item Category',
             color=total_revenue_category.index,
             text_auto=True
             )
fig.update_traces(textfont_size=11, textangle=0, textposition="outside", cliponaxis=False, texttemplate='%{y:.2f}')
fig.show()


# In[9]:


# plot pie chart total revenue by category
fig = px.pie(total_revenue_category, values=total_revenue_category.values, 
             names=total_revenue_category.index, title='Revenue Distribution by Item Category')
fig.show()


# In[10]:


# payment methods counts
payment_methods = df.groupby(by=['Payment Method'])['Product Category'].count().sort_values(ascending=False)

payment_methods


# In[11]:


# pie chart for distribution of payment methods
fig = px.pie(payment_methods, values=payment_methods.values, 
             names=payment_methods.index, title='Distribution of Payment Types Used')
fig.show()


# In[12]:


# total revenue per payment method series
payment_methods_revenue = df.groupby(by=['Payment Method'])['Total Revenue'].sum().sort_values(ascending=False)

payment_methods_revenue


# In[13]:


# plot bar chart for total revenue by payment method
fig = px.bar(payment_methods_revenue, x=payment_methods_revenue.index, y=payment_methods_revenue.values,
             labels={
                 'x': 'Payment Method', 
                 'y': 'Total Revenue'
                 },
             title='Total Revenue by Payment Method',
             color=payment_methods_revenue.index,
             text_auto=True
             )
fig.update_traces(textfont_size=11, textangle=0, textposition="outside", cliponaxis=False, texttemplate='%{y:.2f}')
fig.show()


# In[14]:


# total revenue by region
revenue_region_group = df.groupby(by=['Region'])['Total Revenue'].sum().sort_values(ascending=False)

revenue_region_group


# In[15]:


# plot bar chart for total revenue by region
fig = px.bar(revenue_region_group, x=revenue_region_group.index, y=revenue_region_group.values,
             labels={
                 'x': 'Payment Method', 
                 'y': 'Total Revenue'
                 },
             title='Total Revenue by Region',
             color=revenue_region_group.index,
             text_auto=True
             )
fig.update_traces(textfont_size=11, textangle=0, textposition="outside", cliponaxis=False, texttemplate='%{y:.2f}')
fig.show()


# ## Analysis by Month
# - Total revenue per category by month
# - Total units sold per category by month
# - Payment methods used by month

# In[16]:


# create monthly group df and monthly category group df
monthly_group = df.groupby(['Month'])

monthly_cat_group = df.groupby(['Month', 'Product Category'])


# In[17]:


# pivot df to create columns for the product categories
pivot_df = monthly_cat_group.sum().reset_index().pivot(index='Month', columns='Product Category', values='Total Revenue').reset_index()

pivot_df


# In[18]:


# plot stacked bar chart for total revenue per item category by month
fig = px.bar(pivot_df, x='Month', y=pivot_df.columns[::-1], title='Total Revenue per Item Category by Month')
fig.update_layout(barmode='stack', yaxis_title="Revenue")
fig.show()


# In[19]:


# plot distribution of total revenue by month
fig = px.pie(monthly_group, values=monthly_group['Total Revenue'].sum(), 
             names=monthly_group['Total Revenue'].count().index, title='Distribution of Total Revenue per Month')
fig.show()


# In[20]:


# pivot df to create columns for the product categories
pivot_df = monthly_cat_group.sum().reset_index().pivot(index='Month', columns='Product Category', values='Units Sold').reset_index()

pivot_df


# In[21]:


# plot stacked bar chart
fig = px.bar(pivot_df, x='Month', y=pivot_df.columns[::-1], title='Total Units Sold per Item Category by Month')
fig.update_layout(barmode='stack', yaxis_title="Units Sold")
fig.show()


# In[22]:


# plot distribution of units sold by month
fig = px.pie(monthly_group, values=monthly_group['Units Sold'].sum(), 
             names=monthly_group['Units Sold'].count().index, title='Distribution of Units Sold per Month')
fig.show()


# In[23]:


# group by month and payment method
monthly_payment_group = df.groupby(['Month', 'Payment Method'])


# In[24]:


# pivot df to create columns for the payment methods
pivot_df = monthly_payment_group.count().reset_index().pivot(index='Month', columns='Payment Method', values='Units Sold').reset_index()

pivot_df


# In[25]:


# plot stacked bar chart of payment methods by month
fig = px.bar(pivot_df, x='Month', y=pivot_df.columns[::-1], title='Payment Methods Used by Month')
fig.update_layout(barmode='stack', yaxis_title='Count of Payment Methods')
fig.show()

