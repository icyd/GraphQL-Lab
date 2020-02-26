from flask import Flask
from models import db
from api import api
from flask_cors import CORS


app = Flask(__name__)
app.config['MONGODB_SETTINGS'] = {
    'host': 'mongodb://test:1234@localhost:27017/mydb?authSource=admin'
}
app.register_blueprint(api)
CORS(app)
db.init_app(app)


@app.route('/')
def hello():
    return 'Hello world!'


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
