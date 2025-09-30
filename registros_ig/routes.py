from registros_ig import app
from flask import jsonify, render_template, request
from registros_ig.modelo import *
from config import *
import sqlite3
from http import HTTPStatus

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
    try:
        registros = select_all()
        return jsonify(
        {
            "data": registros,
            "status":"OK"
        }
        ),HTTPStatus.OK
    except sqlite3.Error as ex:
        return jsonify(
        {
            "data": str(ex),
            "status":"Error"
        }
        ),HTTPStatus.BAD_REQUEST


@app.route(f"/api/{VERSION}/detail/<int:id>")
def select_by_id(id):
    registro = select_by_id(id)
    return jsonify(registro)

@app.route(f"/api/{VERSION}/new", methods=["POST"])
def create():
    datos = request.json #capturo el json recibido en la peticion
    try:
        insert([datos['date'],datos['concept'],datos['quantity']])
        return jsonify(
        {
            "status":"OK"
        }
        ),HTTPStatus.CREATED
    
    except sqlite3.Error as ex:
        return jsonify(
        {
            "data": str(ex),
            "status":"Error"
        }
        ),HTTPStatus.BAD_REQUEST

@app.route(f"/api/{VERSION}/update/<int:id>")
def update(id):
    return "Aqui se actualiza el registro con id {id}"

@app.route(f"/api/{VERSION}/delete/<int:id>")
def remove(id):
    return "Aqui se borra el registro con el id {id}"
