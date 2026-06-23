import { useState } from 'react'

function MessageBubble({ sender, content, model, elapsedTime }) {
  const [copied, setCopied] = useState(false)
  const elapsedSeconds = Number(elapsedTime)
  const metaText =
    sender === 'assistant' && model && Number.isFinite(elapsedSeconds)
      ? `${model} · ${elapsedSeconds.toFixed(2)}초`
      : null
  const isAssistant = sender === 'assistant'

  const copyWithFallback = () => {
    const textarea = document.createElement('textarea')
    textarea.value = content
    textarea.style.position = 'fixed'
    textarea.style.left = '-9999px'
    document.body.appendChild(textarea)
    textarea.focus()
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
  }

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(content)
        } catch {
          copyWithFallback()
        }
      } else {
        copyWithFallback()
      }
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch (err) {
      console.error(err)
      alert('메시지를 복사하지 못했습니다.')
    }
  }

  return (
    <div className={`message-bubble ${sender}`}>
      <div className="message-sender">
        <span>{sender === 'user' ? '나' : 'LLM'}</span>
        <span className="message-actions">
          {metaText && <span>{metaText}</span>}
          {isAssistant && (
            <button type="button" className="copy-button" onClick={handleCopy}>
              {copied ? '복사됨' : '복사'}
            </button>
          )}
        </span>
      </div>
      <div className="message-content">{content}</div>
    </div>
  )
}

export default MessageBubble
