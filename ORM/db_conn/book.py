
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base, sessionmaker

Base = declarative_base()

# Define a Book table using ORM
class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True)
    title = Column(String)
    author = Column(String)

    def __repr__(self):
        return f"<Book(title='{self.title}', author='{self.author}')>"

engine = create_engine("postgresql://username:sinthu_01@localhost:5432/mydatabase")

Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()

# Insert data
book1 = Book(title="The Alchemist", author="Paulo Coelho")
book2 = Book(title="Wings of Fire", author="A.P.J. Abdul Kalam")

session.add_all([book1, book2])
session.commit()

# Query data
books = session.query(Book).all()
for book in books:
    print(book)    