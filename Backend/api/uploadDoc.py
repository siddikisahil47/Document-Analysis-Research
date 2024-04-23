# uploadDoc.py
from flask import request
from werkzeug.utils import secure_filename
import os

def upload_file(upload_folder):
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