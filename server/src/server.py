import os
import zipfile
import calendar
import time

from werkzeug.utils import secure_filename
from flask import Flask, request, jsonify, make_response, send_file
from flask_restful import Api
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


def upload_file(file, type_to_convert):
    filename = secure_filename(file.filename)
    file.save(os.path.join(UPLOAD_PATH_NAME, filename))

    image_webp = Image.open(os.path.join(UPLOAD_PATH_NAME, filename))

    file_without_extension = filename.split(".")[0]

    new_filename = f"{file_without_extension}.{str(type_to_convert).lower()}"

    path_file_converted = os.path.join(CONVERTED_PATH_NAME, new_filename)

    image_webp.save(path_file_converted, str(type_to_convert).upper())

    return new_filename


@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return make_response(jsonify({"message": "Arquivo deve ser enviado para realização do upload!"}), 400)

    type_file_to_converted = request.form.get('typeConvert')
    files = request.files.getlist('file')

    download_link = ""

    if len(files) == 1:
        file = request.files['file']

        new_filename = upload_file(file, type_file_to_converted)

        download_link = f"download/{new_filename}"
    else:
        list_files_converted = []

        for file in files:

            new_filename = upload_file(file, type_file_to_converted)
            list_files_converted.append(os.path.join(
                CONVERTED_PATH_NAME, new_filename))

        current_GMT = time.gmtime()

        time_stamp = calendar.timegm(current_GMT)

        file_zip_name = f'{time_stamp}_files.zip'

        file_zip = os.path.join(CONVERTED_PATH_NAME, file_zip_name)

        with zipfile.ZipFile(file_zip, 'w', zipfile.ZIP_DEFLATED) as zip_file:
            for file in list_files_converted:
                if os.path.exists(file):
                    zip_file.write(file, os.path.basename(file))
                else:
                    print(f"O arquivo: {file}, não encontrado!")

        download_link = f"download/{file_zip_name}"

    return make_response(jsonify({"download_link": download_link}), 200)


@app.route('/download/<filename>', methods=['GET', 'POST'])
def download_file(filename):
    return send_file(os.path.join("../images_converted", filename), as_attachment=True)


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=3333, debug=True)
