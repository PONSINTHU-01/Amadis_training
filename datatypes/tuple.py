tuple=("java","python","c","c++",".net")
print(tuple)
print(type(tuple))

tuple1 = ("apple", "banana", "cherry")
tuple2 = (1, 5, 7, 9, 3)
tuple3 = (True, False, False)

print(tuple1)
print(tuple2)
print(tuple3)

print(tuple[2])
print(tuple1[-1])

if "apple" in tuple1:
  print("apple' is in the fruits tuple")

tuple = ("apple", "banana", "cherry")
for x in tuple:
  print(x)  

tuple4=tuple1+tuple2  
print(tuple4)