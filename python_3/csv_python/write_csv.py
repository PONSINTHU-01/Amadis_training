import pandas as pd

data = {
    'Name': ['Geroge', 'James', 'Charlie','Amit','Rahul','Femi','Rasi'],
    'Age': [25, 30, 35,28,25,27,20],
    'City': ['Chennai', 'Mumbai', 'Delhi','Goa','chennai','Kerala','Mumbai']
}

df = pd.DataFrame(data)

df.to_csv('people.csv')

new=pd.read_csv('people.csv')

print(new)

print(new.head())

print(new.shape) 