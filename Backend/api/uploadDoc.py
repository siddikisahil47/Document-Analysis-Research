# uploadDoc.py
from flask import request
from werkzeug.utils import secure_filename
import os

# Global variable to store the AI assistant's response
file_path = ''

def upload_file(upload_folder):
    global file_path
    if 'file' not in request.files:
        return 'No file part'
    file = request.files['file']
    if file.filename == '':
        return 'No selected file'
    if file:
        filename = secure_filename(file.filename)
        if not os.path.exists(upload_folder):
            os.makedirs(upload_folder)
        file_path = os.path.join(upload_folder, filename)
        file.save(file_path)
        print(f'File saved at {file_path}')
        return 'File uploaded successfully'
    
def end_session():
    global file_path
    if file_path and os.path.isfile(file_path):
        print(f'Trying to remove file at {file_path}')
        try:
            os.remove(file_path)
            print(f'Successfully removed file at {file_path}')
        except Exception as e:
            print(f'Failed to remove file at {file_path}: {e}')
    else:
        print("No file to remove.")
    return 'Session ended'
