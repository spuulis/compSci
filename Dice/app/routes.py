from flask import render_template, flash, redirect, url_for, request
from app import app

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/submit-status", methods=["POST"])
def submit_status():
    return "Received_status"

@app.route("/get-status")
def get_status():
    return "Some_status"
