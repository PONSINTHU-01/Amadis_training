set={"apple", "banana", "cherry"}
print(set)

print(len(set))

set2 = {1, 5, 7, 9, 3}
print(set2)
print(len(set2))

set3 = {True, False, False}
print(type(set3))

for x in set:
    print(x)

set.add("grapes")    
print(set)

set.remove("banana")
print(set)

x=set.pop()
print(set)

print(set.clear())