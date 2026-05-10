from fastapi import FastAPI, UploadFile, File
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware

from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from fastapi import HTTPException # Add this import
from dotenv import load_dotenv

import fitz
import uuid
import os
from openai import OpenAI

# LOAD ENV
load_dotenv()

# OPENAI
client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)
# FASTAPI
app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# AI SIMPLIFICATION
def simplify_logic(text):

    prompt = f"""
You are a dyslexia-friendly reading assistant.

Simplify the following text using:
- short sentences
- easier words
- bullet points where useful
- clear spacing
- beginner-friendly explanations
- preserve original meaning

TEXT:
{text[:4000]}
"""

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": "You simplify difficult reading for dyslexic students."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.5
    )

    return response.choices[0].message.content


# API
@app.post("/simplify")
async def simplify_document(file: UploadFile = File(...)):

    try:

        content = await file.read()

        text = ""

        # PDF
        if file.content_type == "application/pdf":

            doc = fitz.open(stream=content, filetype="pdf")

            for page in doc:
                text += page.get_text()

        # TXT
        else:
            text = content.decode("utf-8")

        # SIMPLIFY
        simplified_text = simplify_logic(text)

        # CREATE UNIQUE PDF
        output_path = f"{uuid.uuid4()}.pdf"

        # PDF
        c = canvas.Canvas(output_path, pagesize=letter)

        text_object = c.beginText(40, 750)

        text_object.setFont("Helvetica", 14)

        y = 750

        # WRAPPING
        lines = simplified_text.split("\n")

        for line in lines:

            # NEW PAGE
            if y < 50:

                c.drawText(text_object)

                c.showPage()

                text_object = c.beginText(40, 750)

                text_object.setFont("Helvetica", 14)

                y = 750

            text_object.textLine(line)

            y -= 20

        c.drawText(text_object)

        c.save()

        return FileResponse(
            output_path,
            media_type="application/pdf",
            filename="simplified.pdf"
        )

except Exception as e:

    import traceback

    traceback.print_exc()

    return {"error": str(e)}

# RUN
if __name__ == "__main__":

    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)