import time
from ollama import chat


def call_ollama_chat(
    message: str , 
    model: str = "llama3.2:latest",
    system_prompt: str = "너는 초보자를 돕는 친절한 AI 강사다.",
    temperature: float = 0.7,
    top_p: float = 0.9,
    num_predict: int = 256,
):
    """Ollama chat() 함수로 모델 응답과 소요 시간을 반환한다."""

    start_time = time.perf_counter()

    response = chat(
        model=model,
        messages=[
            {
                "role": "system",
                "content": system_prompt,
            },
            {
                "role": "user",
                "content": message,
            },
        ],
        options={
            "temperature": temperature,
            "top_p": top_p,
            "num_predict": num_predict,
        },
    )

    elapsed_time = round(time.perf_counter() - start_time, 3)

    return {
        "model": model,
        "message": response.message.content,
        "elapsed_time": elapsed_time,
    }

# 로컬 모델 목록
import requests

OLLAMA_CHAT_URL = "http://localhost:11434/api/chat"
OLLAMA_TAGS_URL = "http://localhost:11434/api/tags"

def get_ollama_models():
    """Ollama에서 사용 가능한 모델 목록을 반환한다."""

    try:
        response = requests.get(
            OLLAMA_TAGS_URL,
            timeout=30
        )
        response.raise_for_status()

        data = response.json()
        models = data.get("models", [])

        # 모델이 문자열 목록인 경우와 객체 목록인 경우 모두 처리
        model_names = []
        for model in models:
            if isinstance(model, str):
                model_names.append(model)
            elif isinstance(model, dict) and "name" in model:
                model_names.append(model["name"])

        return model_names if model_names else ["기본 모델"]
    
    except requests.exceptions.ConnectionError:
        raise Exception("Ollama 서버에 연결할 수 없습니다. Ollama가 localhost:11434에서 실행 중인지 확인하세요.")
    except requests.exceptions.Timeout:
        raise Exception("Ollama 서버 응답 시간 초과. Ollama 상태를 확인하세요.")
    except Exception as e:
        raise Exception(f"모델 목록 조회 실패: {str(e)}")









# 테스트 환경 만들기
if __name__ == "__main__":
    print(__name__)
    print("\n채팅 응답 테스트(결과를 기다려 주세요.):")

    result = call_ollama_chat(
        message="Local LLM이 무엇인지 초보자에게 설명해줘."
    )

    print("\n모델:", result["model"])
    print("소요 시간:", result["elapsed_time"], "초")
    print("응답:")
    print(result["message"])