from flask import render_template, flash, redirect, url_for
from app import app

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/submit-status")
def submit_status():
    return "Thanks"

@app.route("/get-status")
def get_status():
    return "Some_status"
