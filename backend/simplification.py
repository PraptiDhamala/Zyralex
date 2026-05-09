from fastapi import FastAPI, UploadFile, File
from fastapi.responses import FileResponse
import fitz  # PyMuPDF
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
import os
import io
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (fine for development)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
def simplify_logic(text):
    # This is a placeholder for your AI/Simplification logic
    # In a real app, you'd call an LLM (like OpenAI or Gemini) here
    return f"SIMPLIFIED VERSION:\n\n{text[:500]}..." 

@app.post("/simplify")
async def simplify_document(file: UploadFile = File(...)):
    content = await file.read()
    text = ""

    # Handle PDF
    if file.content_type == "application/pdf":
        doc = fitz.open(stream=content, filetype="pdf")
        for page in doc:
            text += page.get_text()
    # Handle Text
    else:
        text = content.decode("utf-8")

    simplified_text = simplify_logic(text)

    # Generate new PDF
    output_path = "simplified_output.pdf"
    c = canvas.Canvas(output_path, pagesize=letter)
    t = c.beginText(40, 750)
    t.setFont("Helvetica", 12)
    
    # Simple line wrapping for the PDF
    lines = simplified_text.split('\n')
    for line in lines:
        t.textLine(line)
    
    c.drawText(t)
    c.save()

    return FileResponse(output_path, media_type='application/pdf', filename="simplified.pdf")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)