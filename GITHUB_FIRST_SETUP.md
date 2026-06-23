# WSL 프로젝트를 GitHub에 처음 연결하고 업로드하기

## 개요

이 문서는 WSL(Windows Subsystem for Linux) 환경에서 개발한 프로젝트를 GitHub 저장소에 처음 연결하고 업로드하는 과정을 정리한 문서입니다.

---

# 1. Git 설치 확인

```bash
git --version
```

정상 예시:

```text
git version 2.43.0
```

설치가 안 되어 있다면:

```bash
sudo apt update
sudo apt install git -y
```

---

# 2. Git 사용자 정보 설정

최초 1회만 수행합니다.

```bash
git config --global user.name "GitHub아이디"
git config --global user.email "GitHub이메일"
```

확인:

```bash
git config --list
```

---

# 3. SSH 키 생성

GitHub와 안전하게 통신하기 위해 SSH 키를 생성합니다.

확인:

```bash
ls ~/.ssh
```

다음 파일이 없으면 생성:

```text
id_ed25519
id_ed25519.pub
```

생성:

```bash
ssh-keygen -t ed25519 -C "GitHub이메일"
```

계속 Enter를 눌러 기본값으로 생성합니다.

---

# 4. SSH 공개키 확인

```bash
cat ~/.ssh/id_ed25519.pub
```

예시:

```text
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAA...
```

출력된 내용을 모두 복사합니다.

---

# 5. GitHub SSH 키 등록

GitHub 접속

https://github.com/settings/keys

메뉴:

```text
New SSH Key
```

선택 후

* Title 입력
* Key 붙여넣기
* Save

---

# 6. SSH 연결 테스트

```bash
ssh -T git@github.com
```

처음 연결 시:

```text
Are you sure you want to continue connecting?
```

출력되면:

```text
yes
```

입력

성공 예시:

```text
Hi username! You've successfully authenticated.
```

---

# 7. 프로젝트 폴더 이동

예시:

```bash
cd ~/local_llm_app/local_llm_app_ex
```

현재 위치 확인:

```bash
pwd
```

---

# 8. Git 저장소 확인

```bash
ls -la
```

`.git` 폴더가 존재하면 이미 Git 저장소입니다.

예시:

```text
.git
.gitignore
README.md
backend/
frontend/
```

---

# 9. .gitignore 설정

업로드하지 않을 파일을 등록합니다.

예시:

```gitignore
# Python
.venv/
venv/
__pycache__/
*.pyc

# Environment
.env

# Node
node_modules/

# Build
dist/
build/

# AI Models
models/
checkpoints/

*.gguf
*.safetensors
*.bin
*.pth
*.pt

# Local DB
*.db
*.sqlite
*.sqlite3

# IDE
.vscode/
.idea/
```

---

# 10. GitHub 저장소 생성

GitHub에서 새 저장소 생성

예시:

```text
local_llm_chat
```

주의:

```text
README 생성 안 함
.gitignore 생성 안 함
```

완전히 빈 저장소로 생성합니다.

---

# 11. 원격 저장소 연결

기존 연결 제거:

```bash
git remote remove origin
```

새 저장소 연결:

```bash
git remote add origin git@github.com:USERNAME/local_llm_chat.git
```

확인:

```bash
git remote -v
```

예시:

```text
origin  git@github.com:USERNAME/local_llm_chat.git
origin  git@github.com:USERNAME/local_llm_chat.git
```

---

# 12. 현재 상태 확인

```bash
git status
```

---

# 13. 변경 파일 추가

```bash
git add .
```

확인:

```bash
git status
```

---

# 14. 커밋 생성

```bash
git commit -m "Initial commit"
```

예시:

```text
[main abc1234] Initial commit
```

---

# 15. GitHub 업로드

브랜치 확인:

```bash
git branch
```

main이 아니라면:

```bash
git branch -M main
```

업로드:

```bash
git push -u origin main
```

성공 예시:

```text
Enumerating objects...
Counting objects...
Writing objects...
To github.com:USERNAME/local_llm_chat.git
 * [new branch] main -> main
branch 'main' set up to track 'origin/main'
```

---

# 16. 이후 작업 방법

파일 수정 후:

```bash
git add .
git commit -m "작업 내용"
git push
```

예시:

```bash
git add .
git commit -m "채팅 UI 개선"
git push
```

---

# 자주 사용하는 Git 명령어

상태 확인:

```bash
git status
```

변경 내역 보기:

```bash
git diff
```

원격 저장소 확인:

```bash
git remote -v
```

최신 코드 가져오기:

```bash
git pull
```

업로드:

```bash
git push
```

---

# WSL 파일을 Windows 탐색기에서 열기

현재 폴더 열기:

```bash
explorer.exe .
```

또는 Windows 탐색기 주소창:

```text
\\wsl$
```

예시:

```text
\\wsl$\Ubuntu\home\aiuser\local_llm_app
```

---

# 권장 사항

* `.env` 파일은 업로드하지 않는다.
* AI 모델 파일은 업로드하지 않는다.
* `.venv`는 업로드하지 않는다.
* 기능 단위로 커밋한다.
* 작업 후 반드시 `git push` 한다.
* GitHub 저장소를 프로젝트 백업 용도로 활용한다.

```
``
