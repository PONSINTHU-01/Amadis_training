
import pandas as pd

data = {
    "Title": ["The Alchemist", "Wings of Fire", "Pride and Prejudice"],
    "Author": ["Paulo Coelho", "A.P.J. Abdul Kalam", "Jane Austen"],
    "Year": [1988, 1999, 1813]
}

df = pd.DataFrame(data)

print("Books Data:\n", df)

print("\nTitles:", df["Title"])

print("\nBooks after 1900:\n", df[df["Year"] > 1900])

# Adding new column
df["Pages"] = [208, 180, 432]
print("\nDataFrame with Pages:\n", df)

# Export to CSV
df.to_csv("books.csv", index=False)
print("\nData saved to books.csv")
