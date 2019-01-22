from flask import Flask, request, render_template
import sc2reader

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        return 'UPLOAD'
    else:
        replay = sc2reader.load_replay('testreplay.SC2Replay', load_level=4)
        print replay
        return render_template('uploader.html')
