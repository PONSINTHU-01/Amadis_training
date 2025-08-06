#

list1=["css","python","javaScript","html","python"]

list2=list(("1","apple","false","79.8"))
# print(list2)

# print(list1)   
#                                        #list are ordered changeable allow duplicate value contain diffeerent data type
# print(len(list1))

# print(type(list1))

# list1[1]=2
# print(list1)

# print(list1[2])

# print(list1[-3])

# print(list1[2:4])

# list1.insert(1,"react")
# print(list1)

# list3=list1.extend(list2)
# print(list1)

list1.remove("css")
print(list1)

list1.pop(1)
print(list1)

list1.clear()
print(list1)

thislist = ["apple", "banana", "cherry"]
i = 0
while i < len(thislist):
  print(thislist[i])
  i = i + 1