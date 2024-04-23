from flask import Flask
from uploadDoc import upload_file
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Define the upload folder
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def home():
    return 'Hello, World!'

@app.route('/about')
def about():
    return 'About'
    
@app.route('/upload', methods=['POST'])
def upload():
    return upload_file(app.config['UPLOAD_FOLDER'])
