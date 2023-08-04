import os

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

@app.route('/upload', methods=['POST'])
def post():
    if 'file' not in request.files:
        return make_response(jsonify({ "message": "Arquivo deve ser enviado para realização do upload!" }), 500)
        
    file = request.files['file']

    filename = secure_filename(file.filename)
    file.save(os.path.join("../images_upload", filename))

    image_webp = Image.open(os.path.join("../images_upload", filename))

    file_without_extension = filename.split(".")[0]

    new_filename = f"{file_without_extension}.png"

    path_file_converted = os.path.join("../images_converted", new_filename)

    image_webp.save(path_file_converted, 'PNG')

    return make_response(jsonify({ "download_link": f"/download/{new_filename}" }), 200)

@app.route('/download/<filename>', methods=['GET', 'POST'])
def download_file(filename):
    return send_file(os.path.join("../images_converted", filename), as_attachment=True)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=3333, debug=True)