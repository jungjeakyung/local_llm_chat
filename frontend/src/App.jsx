import { useEffect, useState } from 'react'
import { fetchModels, sendChatRequest } from './api/chatApi'
import SettingsPanel from './components/SettingsPanel'
import ChatWindow from './components/ChatWindow'
import { promptModes } from './api/promptModels'
import './App.css'

function App() {
  const [models, setModels] = useState([])
  const [selectedModel, setSelectedModel] = useState('')
  const [systemPrompt, setSystemPrompt] = useState(promptModes.basic.prompt)
  const [temperature, setTemperature] = useState(0.7)
  const [topP, setTopP] = useState(0.9)
  const [numPredict, setNumPredict] = useState(256)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadModels() {
      try {
        const modelsFromApi = await fetchModels()
        setModels(modelsFromApi)
        if (modelsFromApi.length > 0) {
          setSelectedModel(modelsFromApi[0])
        }
      } catch (err) {
        console.error(err)
        setError(
          '모델 목록을 가져오는 중 오류가 발생했습니다. FastAPI 서버와 Ollama 상태를 확인하세요.'
        )
      }
    }

    loadModels()
  }, [])

  const handleSend = async () => {
    if (!message.trim()) {
      alert('질문을 입력하세요.')
      return
    }

    if (!selectedModel) {
      setError('사용할 모델을 선택할 수 없습니다. /models API 응답을 확인하세요.')
      return
    }

    const userMessage = message.trim()
    setMessages((prev) => [...prev, { sender: 'user', content: userMessage }])
    setMessage('')
    setError('')
    setIsLoading(true)

    try {
      const response = await sendChatRequest({
        message: userMessage,
        model: selectedModel,
        system_prompt: systemPrompt,
        temperature,
        top_p: topP,
        num_predict: numPredict,
      })

      setMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          content: response.message || '응답 메시지가 비어 있습니다.',
          model: response.model,
          elapsedTime: response.elapsed_time,
        },
      ])
    } catch (err) {
      console.error(err)
      setError('서버 요청 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setMessages([])
    setMessage('')
    setError('')
  }

  return (
    <div className="chat-page">
      <div className="chat-shell">
        <aside className="panel-left">
          <div className="panel-card">
            <div className="panel-title">모델 설정</div>
            <SettingsPanel
              models={models}
              selectedModel={selectedModel}
              onModelChange={setSelectedModel}
              systemPrompt={systemPrompt}
              onSystemPromptChange={setSystemPrompt}
              temperature={temperature}
              onTemperatureChange={setTemperature}
              topP={topP}
              onTopPChange={setTopP}
              numPredict={numPredict}
              onNumPredictChange={setNumPredict}
              onReset={handleReset}
            />
          </div>
        </aside>

        <main className="panel-right">
          <header className="chat-header">
            <div>
              <h1>Local LLM Chat</h1>
              <p>React + FastAPI + Ollama 기반 로컬 AI 채팅 앱</p>
            </div>
            <button className="reset-button header-button" onClick={handleReset}>
              대화 초기화
            </button>
          </header>

          <ChatWindow
            messages={messages}
            message={message}
            onMessageChange={setMessage}
            onSend={handleSend}
            isLoading={isLoading}
            error={error}
            selectedModel={selectedModel}
          />
        </main>
      </div>
    </div>
  )
}

export default App
