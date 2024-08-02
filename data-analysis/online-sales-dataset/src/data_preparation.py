#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd


# In[2]:


df = pd.read_csv('../data/raw/online_sales_data.csv')
df.head()


# In[3]:


# check data types
df.info()


# In[4]:


df['Product Category'].value_counts()


# In[5]:


df['Product Name'].value_counts()


# In[6]:


df['Unit Price'].value_counts()


# In[7]:


df['Region'].value_counts()


# In[8]:


df['Payment Method'].value_counts()


# In[9]:


df['Date'].value_counts()


# In[10]:


# test splitting of date
print(df['Date'].str.split('-'))
print(df['Date'].str.split('-')[239][1])


# In[11]:


# get column names to rearrange
df.columns


# In[12]:


# extract month into a new category
df['Month'] = df['Date'].str.split('-', expand=True)[1]

df = df[['Transaction ID', 'Date', 'Month', 'Product Category', 'Product Name',
       'Units Sold', 'Unit Price', 'Total Revenue', 'Region', 'Payment Method']]

df.head()


# In[13]:


df['Month'].value_counts()


# In[14]:


# export transformed df to csv
df.to_csv('../data/processed/sales_data_final.csv', index=False, header=True)

