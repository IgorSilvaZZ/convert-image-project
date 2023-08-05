import os
import zipfile
import calendar
import time

from werkzeug.utils import secure_filename
from flask import Flask, request, jsonify, make_response, send_file
from flask_restful import Resource, Api
from flask_cors import CORS

from PIL import Image

UPLOAD_FOLDER = 'images_upload'

app = Flask(__name__)
CORS(app)

api = Api(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

UPLOAD_PATH_NAME = "../images_upload"
CONVERTED_PATH_NAME = "../images_converted"

def upload_file(file):
    filename = secure_filename(file.filename)
    file.save(os.path.join(UPLOAD_PATH_NAME, filename))

    image_webp = Image.open(os.path.join(UPLOAD_PATH_NAME, filename))

    file_without_extension = filename.split(".")[0]

    new_filename = f"{file_without_extension}.png"

    path_file_converted = os.path.join(CONVERTED_PATH_NAME, new_filename)

    image_webp.save(path_file_converted, 'PNG')

    return new_filename

@app.route('/upload', methods=['POST'])
def newUpload():
    if 'file' not in request.files:
        return make_response(jsonify({ "message": "Arquivo deve ser enviado para realização do upload!" }), 400)
    
    type_file_original = request.form.typeFile
    type_file_to_converted = request.form.typeConvert
    files = request.files.getlist('files')

    print(type_file_original)
    print(type_file_to_converted)

    download_link = ""

    if len(files) == 1:
        file = request.files['file']

        new_filename = upload_file(file)

        download_link = f"/download/{new_filename}"
    else:
        for file in files:

            upload_file(file)        

            current_GMT = time.gmtime()

            time_stamp = calendar.timegm(current_GMT)

            file_zip = os.path.join('..', 'images_converted', f'{time_stamp}_files')

        with zipfile.ZipFile(file_zip, 'w', zipfile.ZIP_DEFLATED) as zip_file:
            for current_path, _, archives in os.walk(CONVERTED_PATH_NAME):
                for archive in archives:
                    directory = os.path.join(current_path, archive)
                    zip_file.write(directory, os.path.realpath(directory, CONVERTED_PATH_NAME))

        download_link = f"/download/{file_zip}"
    
    return make_response(jsonify({ "download_link": download_link }), 200)

@app.route('/download/<filename>', methods=['GET', 'POST'])
def download_file(filename):
    return send_file(os.path.join(filename), as_attachment=True)


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=3333, debug=True)