# simplification.py
from flask import Flask, request, jsonify, send_file
import fitz  # PyMuPDF
import re
import os

app = Flask(__name__)

def extract_text_from_pdf(pdf_path: str):
    doc = fitz.open(pdf_path)
    text_pages = []
    for page in doc:
        text = page.get_text("text")
        text_pages.append(text)
    return text_pages

def simplify_text(text: str):
    # Normalize spacing and split into sentences
    text = re.sub(r'\s+', ' ', text).strip()
    sentences = re.split(r'(?<=[.!?]) +', text)
    return sentences

@app.route("/simplify", methods=["POST"])
def simplify_pdf():
    if "file" not in request.files:
        return "No file uploaded", 400
    file = request.files["file"]
    pdf_path = os.path.join("/tmp", file.filename)
    file.save(pdf_path)

    pages = extract_text_from_pdf(pdf_path)
    structured = [{"sentences": simplify_text(p)} for p in pages]

    return jsonify({"pages": structured, "title": file.filename})
