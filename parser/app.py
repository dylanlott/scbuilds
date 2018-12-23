from flask import Flask, request
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        f = request.files['replay.mpq']
        return 'UPLOAD'
    else:
        return 'RETURN UPLOAD PAGE'
        # f = request.files['the_file']
        # f.save('/var/www/uploads/uploaded_file.txt')

