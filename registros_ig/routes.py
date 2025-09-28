from registros_ig import app

@app.route("/")
def hello():
    return "Esto es Flask con JS"