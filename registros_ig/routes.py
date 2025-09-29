from registros_ig import app
from flask import jsonify, render_template
from registros_ig.modelo import *
from config import *

'''
@app.route("/")
def hello():
    datos = [
        {'id': 1, 'date': '2025-09-01', 'concept':'Sueldo', 'quantity':2100},
        {'id': 1, 'date': '2025-09-03', 'concept':'Mercado', 'quantity':-100},
        {'id': 1, 'date': '2025-09-04', 'concept':'Desayuno', 'quantity':-21}
    ]
    return jsonify(datos)
'''

@app.route("/")
def index():
    return render_template("index.html")

@app.route(f"/api/{VERSION}/all")
def all_movements():
    registros = select_all()
    return jsonify(registros)

@app.route(f"/api/{VERSION}/detail/<int:id>")
def select_by_id(id):
    registro = select_by_id(id)
    return jsonify(registro)

@app.route(f"/api/{VERSION}/new")
def create():
    return "Aqui realizamos el registro nuevo"

@app.route(f"/api/{VERSION}/update/<int:id>")
def update(id):
    return "Aqui se actualiza el registro con id {id}"

@app.route(f"/api/{VERSION}/delete/<int:id>")
def remove(id):
    return "Aqui se borra el registro con el id {id}"
