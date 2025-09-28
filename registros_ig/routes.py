from registros_ig import app
from flask import jsonify

@app.route("/")
def hello():
    datos = [
        {'id': 1, 'date': '2025-09-01', 'concept':'Sueldo', 'quantity':2100},
        {'id': 1, 'date': '2025-09-03', 'concept':'Mercado', 'quantity':-100},
        {'id': 1, 'date': '2025-09-04', 'concept':'Desayuno', 'quantity':-21}
    ]
    return jsonify(datos)