
import numpy as np

arr = np.array([1, 2, 3, 4, 5])
matrix = np.array([[1, 2], [3, 4]])

print("Array:", arr)
print("Matrix:\n", matrix)

print("Sum of array:", np.sum(arr))
print("Mean of array:", np.mean(arr))
print("Reshape array:", arr.reshape(5, 1))

mat1 = np.array([[1, 2], [3, 4]])
mat2 = np.array([[2, 0], [1, 2]])
result = np.dot(mat1, mat2)
print("Matrix Multiplication:\n", result)

print("First 3 elements of arr:", arr[:3])
print("Last 2 elements of arr:", arr[-2:])

identity = np.eye(3)
print("Identity Matrix:\n", identity)