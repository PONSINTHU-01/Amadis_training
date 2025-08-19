def my_func(name="selvi"):
    print("hello:"+name)
my_func("babu")  
my_func("siva") 
my_func()  

def fruits(name,color):
    print(name +" "+color)
fruits("apple","red")
fruits("mango","yellow")    
fruits("guva","green")

def print_fruits(*fruits):
    for fruit in fruits:
        print(fruit)

print_fruits("apple", "banana", "mango")

