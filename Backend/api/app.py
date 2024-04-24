from flask import Flask, request, jsonify
from flask_cors import CORS
from uploadDoc import upload_file, end_session
from chatbot import get_ai_response

app = Flask(__name__)
CORS(app)

# Define the upload folder
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Global variable to store the AI assistant's response
ai_response = ''

@app.route('/')
def home():
    return 'Hello, World!'

    
@app.route('/upload', methods=['POST'])
def upload():
    return upload_file(app.config['UPLOAD_FOLDER'])

@app.route('/geminiResponse', methods=['POST'])
def post_input():
    global ai_response
    input_text = request.json['input']
    ai_response = get_ai_response(input_text)
    return jsonify({'response': ai_response})

@app.route('/geminiResponse', methods=['GET'])
def get_response():
    global ai_response
    return jsonify({'response': ai_response})


@app.route('/endSession', methods=['POST'])
def end_session_route():
    end_session()
    return jsonify({'status': 'Session ended, uploaded document deleted.'})