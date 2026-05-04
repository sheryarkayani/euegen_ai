import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Sparkles, RefreshCw } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import toast from 'react-hot-toast'
import useChatStore from '../store/useChatStore'
import GinaTyping from '../components/ui/GinaTyping'
import { BookGinaInline } from '../components/shared/BookGinaCard'
import { simulateTyping, streamCompletion } from '../lib/openrouter'
import { ASK_GINA_SYSTEM_PROMPT } from '../lib/prompts/askGina'
import { dummyAskGinaResponses } from '../data/dummyHealthScore'

const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true'

const STARTER_PROMPTS = [
  "What should I do about my high payroll costs?",
  "How do I improve my consultation conversion rate?",
  "What's a good membership program structure?",
  "Should I open a second location?",
  "How should I think about marketing spend?",
]

function GinaAvatar({ size = 32 }) {
  return (
    <div
      className="rounded-full gold-gradient flex items-center justify-center flex-shrink-0 shadow-lg"
      style={{ width: size, height: size }}
    >
      <span className="font-display font-bold text-navy-950" style={{ fontSize: size * 0.35 }}>G</span>
    </div>
  )
}

function MessageBubble({ message }) {
  const isUser = message.role === 'user'
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {!isUser && <GinaAvatar />}
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-medium text-gray-300">You</span>
        </div>
      )}
      <div className={`max-w-2xl ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            isUser ? 'chat-message-user rounded-tr-sm' : 'chat-message-gina rounded-tl-sm'
          }`}
        >
          {isUser ? (
            <p className="text-gray-200">{message.content}</p>
          ) : (
            <div className="prose prose-invert prose-sm max-w-none text-gray-200">
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                  strong: ({ children }) => <strong className="text-gold-400 font-semibold">{children}</strong>,
                  ul: ({ children }) => <ul className="my-2 space-y-1">{children}</ul>,
                  li: ({ children }) => <li className="flex gap-2 text-gray-300"><span className="text-gold-500 mt-1">·</span><span>{children}</span></li>,
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
        <span className="text-xs text-gray-700 mt-1 px-1">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
        {message.escalate && <BookGinaInline />}
      </div>
    </motion.div>
  )
}

export default function AskGina() {
  const { messages, isStreaming, streamingMessage, addMessage, setStreaming, appendToStreamingMessage, finalizeStreamingMessage, clearMessages } = useChatStore()
  const [input, setInput] = useState('')
  const [typingCancel, setTypingCancel] = useState(null)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamingMessage])

  const findDemoResponse = (question) => {
    const lower = question.toLowerCase()
    const match = dummyAskGinaResponses.find(r =>
      r.question.toLowerCase().includes(lower.slice(0, 20)) ||
      lower.includes(r.question.toLowerCase().slice(0, 20))
    )
    return match || dummyAskGinaResponses[Math.floor(Math.random() * dummyAskGinaResponses.length)]
  }

  const sendMessage = async (text) => {
    if (!text.trim() || isStreaming) return

    const userMsg = { role: 'user', content: text }
    addMessage(userMsg)
    setInput('')
    setStreaming(true)

    if (DEMO_MODE) {
      const demo = findDemoResponse(text)
      const cancel = simulateTyping(
        demo.answer,
        (chunk) => appendToStreamingMessage(chunk),
        () => {
          const msg = { role: 'assistant', content: demo.answer, escalate: demo.escalate }
          useChatStore.setState(s => ({
            messages: [...s.messages, { id: Date.now().toString(), timestamp: new Date().toISOString(), ...msg }],
            streamingMessage: '',
            isStreaming: false,
          }))
        },
        15
      )
      setTypingCancel(() => cancel)
      return
    }

    // Real API call
    try {
      const { ASK_GINA_SYSTEM_PROMPT } = await import('../lib/prompts/askGina')
      const { streamCompletion } = await import('../lib/openrouter')
      await streamCompletion({
        systemPrompt: ASK_GINA_SYSTEM_PROMPT,
        messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
        onChunk: appendToStreamingMessage,
      })
      finalizeStreamingMessage()
    } catch (err) {
      toast.error('Failed to get response. Check your API key.')
      setStreaming(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem-48px)] max-w-4xl mx-auto">
      {/* Empty state */}
      {messages.length === 0 && !isStreaming && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 flex flex-col items-center justify-center p-8 text-center"
        >
          <div className="w-20 h-20 rounded-2xl gold-gradient flex items-center justify-center shadow-2xl glow-gold-strong mb-6">
            <span className="font-display font-bold text-navy-950 text-3xl">G</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-white mb-2">Ask Gina Anything</h2>
          <p className="text-gray-400 max-w-md leading-relaxed mb-8 text-sm">
            20 years of med spa expertise, available 24/7. Ask about payroll, 
            hiring, marketing, sales scripts, compliance — or anything else on your mind.
          </p>

          <div className="grid grid-cols-1 gap-2 w-full max-w-lg">
            {STARTER_PROMPTS.map((prompt, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                onClick={() => sendMessage(prompt)}
                className="text-left px-4 py-3 rounded-xl text-sm text-gray-300 transition-all duration-200 hover:text-white"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(212,168,83,0.3)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
              >
                <Sparkles size={13} className="inline mr-2 text-gold-500 opacity-70" />
                {prompt}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Messages */}
      {(messages.length > 0 || isStreaming) && (
        <div className="flex-1 overflow-y-auto py-4 space-y-4 px-2">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}

          {/* Streaming message */}
          {isStreaming && streamingMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <GinaAvatar />
              <div className="max-w-2xl">
                <div className="chat-message-gina rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed">
                  <div className="prose prose-invert prose-sm max-w-none text-gray-200">
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                        strong: ({ children }) => <strong className="text-gold-400 font-semibold">{children}</strong>,
                        ul: ({ children }) => <ul className="my-2 space-y-1">{children}</ul>,
                        li: ({ children }) => <li className="flex gap-2 text-gray-300"><span className="text-gold-500 mt-1">·</span><span>{children}</span></li>,
                      }}
                    >
                      {streamingMessage}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Typing indicator */}
          {isStreaming && !streamingMessage && (
            <div className="flex gap-3">
              <GinaAvatar />
              <GinaTyping />
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      )}

      {/* Input area */}
      <div className="py-4 border-t border-white/5">
        {messages.length > 0 && (
          <div className="flex items-center justify-end mb-2">
            <button
              onClick={clearMessages}
              className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-400 transition-colors"
            >
              <RefreshCw size={11} />
              New conversation
            </button>
          </div>
        )}
        <div className="relative flex items-end gap-2">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask Gina anything about your med spa..."
              rows={1}
              style={{
                minHeight: '48px',
                maxHeight: '120px',
                height: 'auto',
              }}
              className="form-input w-full px-4 py-3 pr-12 rounded-xl text-sm leading-relaxed overflow-hidden"
              onInput={e => {
                e.target.style.height = 'auto'
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
              }}
            />
            <div className="absolute right-3 bottom-3 text-xs text-gray-700">
              ↵ send
            </div>
          </div>
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isStreaming}
            className="w-12 h-12 rounded-xl btn-primary flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
          >
            <Send size={16} className="text-navy-950" />
          </button>
        </div>
        <p className="text-xs text-gray-700 text-center mt-2">
          {DEMO_MODE ? '🔮 Demo mode — using pre-written responses. Add your OpenRouter key for live AI.' : 'Powered by Claude Sonnet · Responses in seconds'}
        </p>
      </div>
    </div>
  )
}
