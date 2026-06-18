from typing import Optional

from fastapi import FastAPI
from pydantic import BaseModel, HttpUrl

app = FastAPI()

# 요청 모델
class UserCreate(BaseModel):
    name: str
    password: str
    avatar_url: Optional[HttpUrl] = None

# 응답 모델
class UserResponse(BaseModel):
    name: str
    avatar_url: Optional[HttpUrl] = None


@app.get("/")
def hello():
    return "Hello, World!"

@app.get("/users/{user_id}")
def get_user(user_id: int): # 타입 힌트 추가
    # 비즈니스 로직처리
    return {"user_id": user_id}

@app.get("/item")
def get_item(limit: int = 100): # 타입 힌트 추가
    # 비즈니스 로직처리
    return {"item_id": limit}

# 요청 API
# @app.post("/user_info")
# def createUser(user: UserCreate):
#     # 비즈니스 로직처리
#     return user


# 요청 및 응답 API
@app.post("/user_info", response_model=UserResponse)
def get_user(user: UserCreate):
    # 비즈니스 로직 처리
    # DB 저장 처리
    print("user: ", user)
    user_info = UserResponse(
        name=user.name,
        avatar_url=user.avatar_url
    )
    # Pydantic model 객체를 JSON으로 직렬화해서 응답함.
    return user_info

