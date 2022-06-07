"""
Set-ExecutionPolicy Unrestricted -Scope Process
venv/Scripts/activate.ps1
"""
from flask import Flask, render_template


app = Flask(__name__)
#app.secret_key = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(8))

@app.route("/")
def home():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(port=5000, debug=True)