import os
import uuid
import fitz  # PyMuPDF
from pathlib import Path
from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from openai import OpenAI

# 1. LOAD ENV (Path-proof version)
base_path = Path(__file__).resolve().parent
load_dotenv(dotenv_path=base_path / ".env")

# 2. OPENAI CLIENT
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = FastAPI()

# 3. CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def simplify_logic(text):
    try:
        prompt = f"Simplify the following text for a dyslexic student. Use short sentences, bullet points, and clear spacing:\n\n{text[:4000]}"
        
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant for dyslexic readers."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.5
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"OpenAI Error: {e}")
        return "Error: Could not simplify text."

@app.post("/simplify")
async def simplify_document(file: UploadFile = File(...)):
    output_path = f"{uuid.uuid4()}.pdf"
    
    try:
        content = await file.read()
        text = ""

        # Extract Text
        if file.content_type == "application/pdf":
            doc = fitz.open(stream=content, filetype="pdf")
            for page in doc:
                text += page.get_text()
        else:
            text = content.decode("utf-8")

        simplified_text = simplify_logic(text)

        # Create PDF with basic wrapping logic
        c = canvas.Canvas(output_path, pagesize=letter)
        c.setFont("Helvetica", 12)
        
        text_object = c.beginText(50, 750)
        lines = simplified_text.split('\n')
        
        for line in lines:
            # Basic manual wrap: if line is too long, split it
            if len(line) > 80:
                words = line.split(' ')
                temp_line = ""
                for w in words:
                    if len(temp_line + w) < 80:
                        temp_line += w + " "
                    else:
                        text_object.textLine(temp_line)
                        temp_line = w + " "
                text_object.textLine(temp_line)
            else:
                text_object.textLine(line)
            
            # Page break check
            if text_object.getY() < 50:
                c.drawText(text_object)
                c.showPage()
                text_object = c.beginText(50, 750)
                text_object.setFont("Helvetica", 12)

        c.drawText(text_object)
        c.save()

        return FileResponse(
            output_path,
            media_type="application/pdf",
            filename="simplified.pdf"
        )
    except Exception as e:   # ← indented to match try
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)