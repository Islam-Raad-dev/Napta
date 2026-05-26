import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()

# Find and configure the Gemini API Key
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    # Fallback to parent directory if running in nested backend folder
    parent_env = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".env")
    if os.path.exists(parent_env):
        load_dotenv(parent_env)
        api_key = os.getenv("GEMINI_API_KEY")
        # Try checking for Vite prefixed key in parent env if normal key is missing
        if not api_key:
            api_key = os.getenv("VITE_GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY is not set. Please define it in your .env file.")

# Configure the Gemini SDK
genai.configure(api_key=api_key)

# Initialize FastAPI application
app = FastAPI(
    title="Gemini API Backend Service",
    description="A secure gateway for frontend applications to interface with the Gemini API.",
    version="1.0.0"
)

# CORS middleware configuration (allows local client to connect directly if needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the Gemini model
try:
    model = genai.GenerativeModel("gemini-1.5-flash")
except Exception as e:
    print(f"Error during generative model initialization: {e}")
    model = None

class GenerateRequest(BaseModel):
    prompt: str

@app.post("/api/generate")
async def generate_text(request: GenerateRequest):
    if not model:
        raise HTTPException(
            status_code=500,
            detail="Gemini API Model failed to initialize. Please check backend server configuration."
        )
    
    if not request.prompt.strip():
        raise HTTPException(
            status_code=400,
            detail="The prompt string cannot be empty."
        )
        
    try:
        # Call the Gemini API to generate content
        response = model.generate_content(request.prompt)
        
        # Validate that we got a valid response text
        if not response or not response.text:
            raise HTTPException(
                status_code=502,
                detail="Empty response received from the Gemini generative model."
            )
            
        return {"text": response.text}
    except Exception as e:
        print(f"Error calling Gemini API: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred while communicating with the Gemini API: {str(e)}"
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
