from fastapi import FastAPI

app = FastAPI(
    title="Local LLM Chat API",
    description="Ollama 기반 로컬 LLM 채팅 백엔드 API",
    version="0.1.0",
)

@app.get("/")
def read_root():
    return {"message": "Local LLM Chat API is running"}

@app.get("/health")
def health_check():
    return {"status": "ok"}
