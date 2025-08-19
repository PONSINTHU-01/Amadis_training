import array

numbers = array.array('i', [1, 2, 3, 4])   #create an array
print(numbers[1])  
print()


numbers = [10, 20, 30, 40, 50]
print("List elements:")
for n in numbers:
    print(n)

print("Length:", len(numbers))
print("First element:", numbers[0])
print("Last element:", numbers[-1])

numbers.sort()
print("Sorted List:", numbers)

numbers.reverse()
print("Reversed List:", numbers)

numbers.append(60)
print("After Append:", numbers)

numbers.insert(2, 25)
print("After Insert:", numbers)

numbers.remove(25)
print("After Remove:", numbers)

#class
class Student:
    
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def display_info(self):
        print(f"Name: {self.name}, Age: {self.age}")

s1 = Student("Sinthu", 22)
s1.display_info()
