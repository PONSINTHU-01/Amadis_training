dict = {
  "name": "ram",
  "age": "24",
  "year": 1964
}

print(dict)

print(dict["name"])

print(type(dict))

print(len(dict))

x=dict.keys()
print(x)

print(dict.values())

print(dict.items())

#rename
dict["year"]=2000
print(dict)

dict.update({"name":"sree"})
print(dict)

for x in dict:              
    print(x)

#print all values
for x in dict:
    print(dict[x])

for x in dict.values():
    print(x) 

for x in dict.keys():
    print(x)       

for x,y in dict.items():
    print(x,y)
    

