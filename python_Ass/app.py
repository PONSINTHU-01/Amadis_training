
from flask import Flask
from database import Base, engine
from routes import routes

app = Flask(__name__)
app.register_blueprint(routes)

Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    app.run(debug=True)
