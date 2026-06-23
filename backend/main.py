from fastapi import FastAPI, HTTPException

# ollama_chat 모듈의 함수 호출
from ollama_chat import call_ollama_chat,get_ollama_models
from fastapi.middleware.cors import CORSMiddleware

# from ollama_client_langchain import call_ollama_chat
from schemas import ChatRequest, ChatResponse


# FASTapi 객체 생성
app = FastAPI(
    title="Local LLM Chat API",
    description="Ollama 기반 로컬 LLM 채팅 백엔드 API",
    version="0.1.0",
)

# 브라우저는 보안상 서로 다른 출처의 요청을 제한하기 때문에 설정 필요 --------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],    
    # allow_origins=["http://localhost:5173", "https://example.com"] 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
#---------------------------------------------------------------------------


#chat API 구현
# hhtp://localhost:8000/chat
@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    
    #  #비즈니스 로직처리
    # return_value = {
    #     "model": "aaaa",
    #     "ai_massage": "ai_massage",
    #     "걸린시간": "걸린시간"
    # }

    try:
        print("start1")        
        return_value = call_ollama_chat(
                message=request.message,
                model=request.model,
                system_prompt=request.system_prompt,
                temperature=request.temperature,
                top_p=request.top_p,
                num_predict=request.num_predict,
            )
    
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"채팅 처리 중 오류가 발생했습니다: {exc}"
        ) 

    return return_value


# model 목록 가져오기
@app.get("/models")
def list_models():
    try:
        print("start")
        models = get_ollama_models()
        return {"models": models}
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"모델 목록 조회 중 오류가 발생했습니다: {exc}"
        )
