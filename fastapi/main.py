from fastapi import FastAPI

app = FastAPI()

#요청 데이터 모델
import uvicorn
from typing import Optional

from fastapi import FastAPI
from pydantic import BaseModel, HttpUrl

app = FastAPI()

class UserCreate(BaseModel):
    name: str
    password: str
    avatar_url: Optional[HttpUrl] = None

@app.post("/user_info")
def create_user(user: UserCreate):
    return user



# 응답 데이터 모델

# from typing import Optional

# from fastapi import FastAPI
# from pydantic import BaseModel, HttpUrl


# app = FastAPI()

# 요청 모델
class UserCreate(BaseModel):
    name: str
    password: str
    avatar_url: Optional[HttpUrl] = None
    
# 응답 모델
class UserResponse(BaseModel):
    name: str
    avatar_url: str

#... 생략 ...

# 요청 API
# @app.post("/user_info")
# def createUser(user: UserCreate):
#     # 비즈니스 로직처리
#     return user


# 응답 데이터 모델
# @app.get("/user_info/me", response_model=UserResponse)
# def getUser(user: UserCreate):
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











# # http://127.0.0.1:8000/
# @app.get("/")
# def read_root():
#     word = '안녕'
#     # return {"Hello": "World"}
#     # 비즈니스 로직 처리
#     # DB조회
#     # AI와 통신한 결과
#     return {"Hello": word}

# #경로 매개 변수
# # http://127.0.0.1:8000/items/1
# # http://127.0.0.1:8000/items/2
# # http://127.0.0.1:8000/items/3
# # http://127.0.0.1:8000/items/4
# # http://127.0.0.1:8000/items/6

# @app.post("/items/{item_id}")
# def read_item(item_id, q: str | None = None):
#     # 비즈니스 로직 처리
#     print(f'item_id: {item_id}, q:{q}' )
#     return {"item_id": item_id, "q": q}

# # @app.get("/items/{item_id}")
# # def read_item(item_id: int, q: str | None = None):
# #     return {"item_id": item_id, "q": q}