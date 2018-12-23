from flask import Flask, request, render_template
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        return 'UPLOAD'
    else:
        return render_template('uploader.html')
