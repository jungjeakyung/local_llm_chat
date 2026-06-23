import { useState } from 'react'
import { promptModes } from '../api/promptModels'

function SettingsPanel({
  models,
  selectedModel,
  onModelChange,
  systemPrompt,
  onSystemPromptChange,
  temperature,
  onTemperatureChange,
  topP,
  onTopPChange,
  numPredict,
  onNumPredictChange,
  onReset,
}) {
  const [promptMode, setPromptMode] = useState('basic')

  const handlePromptModeChange = (event) => {
    const modeKey = event.target.value
    const selectedMode = promptModes[modeKey]
    if (!selectedMode) {
      return
    }
    setPromptMode(modeKey)
    onSystemPromptChange(selectedMode.prompt)
  }

  return (
    <div className="settings-panel">
      <label>
        모델
        <select
          value={selectedModel}
          onChange={(event) => onModelChange(event.target.value)}
          disabled={models.length === 0}
        >
          {models.length === 0 ? (
            <option value="">모델을 불러오는 중...</option>
          ) : (
            models.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))
          )}
        </select>
      </label>
      <label>
        프롬프트 모드
        <select value={promptMode} onChange={handlePromptModeChange}>
          {Object.entries(promptModes).map(([key, mode]) => (
            <option key={key} value={key}>
              {mode.label}
            </option>
          ))}
        </select>
      </label>
      <label>
        시스템 프롬프트
        <textarea
          value={systemPrompt}
          onChange={(event) => onSystemPromptChange(event.target.value)}
          rows={4}
        />
      </label>
      <label>
        Temperature: {temperature}
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={temperature}
          onChange={(event) => onTemperatureChange(Number(event.target.value))}
        />
      </label>
      <label>
        Top P: {topP}
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={topP}
          onChange={(event) => onTopPChange(Number(event.target.value))}
        />
      </label>
      <label>
        Num Predict
        <input
          type="number"
          min="16"
          max="2048"
          step="1"
          value={numPredict}
          onChange={(event) => onNumPredictChange(Number(event.target.value))}
        />
      </label>
      <button type="button" className="reset-button" onClick={onReset}>
        대화 초기화
      </button>
    </div>
  )
}

export default SettingsPanel
