import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, Sparkles, RefreshCw } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import toast from 'react-hot-toast'
import useChatStore from '../store/useChatStore'
import EugeneTyping from '../components/ui/EugeneTyping'
import { BookEugeneInline } from '../components/shared/BookEugeneCard'
import { simulateTyping, streamCompletion } from '../lib/openrouter'
import { ASK_EUGENE_SYSTEM_PROMPT } from '../lib/prompts/askEugene'
import { dummyAskGinaResponses } from '../data/dummyHealthScore' // Reused response mapping for compatibility
import { isAppDemoMode as DEMO_MODE } from '../lib/runtimeConfig'

const STARTER_PROMPTS = [
  "Analyze my Lumina Aesthetics payroll ratio of 45.5%.",
  "How should I structure my provider commission tiers?",
  "What EBITDA multiple can I expect for a private equity sale?",
  "What is my clinical vs admin entity flow of funds?",
  "How do I set up a compliant MSO structure in Texas?",
]

function EugeneAvatar({ size = 32 }) {
  return (
    <div
      className="rounded-full primary-gradient flex items-center justify-center flex-shrink-0 shadow-lg glow-primary"
      style={{ width: size, height: size }}
    >
      <span className="font-display font-bold text-white" style={{ fontSize: size * 0.35 }}>E</span>
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
      {!isUser && <EugeneAvatar />}
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-medium text-navy-950">You</span>
        </div>
      )}
      <div className={`max-w-2xl ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            isUser ? 'chat-message-user rounded-tr-sm' : 'chat-message-eugene rounded-tl-sm'
          }`}
        >
          {isUser ? (
            <p className="text-gray-800">{message.content}</p>
          ) : (
            <div className="prose prose-sm prose-stone max-w-none text-gray-800">
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                  strong: ({ children }) => <strong className="text-indigo-600 font-semibold">{children}</strong>,
                  ul: ({ children }) => <ul className="my-2 space-y-1">{children}</ul>,
                  li: ({ children }) => <li className="flex gap-2 text-gray-700"><span className="text-indigo-500 mt-1">·</span><span>{children}</span></li>,
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
        <span className="text-xs text-gray-400 mt-1 px-1">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
        {message.escalate && <BookEugeneInline />}
      </div>
    </motion.div>
  )
}

export default function AskEugene() {
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
    
    if (match) {
      // Rebrand the placeholder answers in demo mode on-the-fly to represent Eugene
      let customAnswer = match.answer
        .replaceAll("Gina's AI", "Eugene's AI")
        .replaceAll("Gina", "Eugene")
        .replaceAll("med spa matchmaker", "Eugene Consulting")
      return { ...match, answer: customAnswer }
    }
    
    // Default dynamic CFO answer
    return {
      question,
      answer: `### CFO Assessment — Operational Analysis

Based on your medical aesthetics practice parameters, here is a professional diagnostic:

1. **EBITDA Optimization Opportunity**: Focus on managing non-clinical overhead and restructuring provider compensation. Changing injectors from flat commission percentages to productivity tier milestones is essential to lock in a 20–25% margin floor.
2. **Provider Compensation Plan**: Ensure base levels are aligned with productivity. Maintain clinical compliance under a proper corporate structure while maximizing practice net contribution.
3. **Cash Flow & Capital Reserve**: Build a 3-month opex reserve before accelerating multi-site scaling or private equity valuations.

Let's model the direct financial pathways to optimize your EBITDA margins.

**CFO Action Item:** Audit your monthly provider payroll and ensure direct labor margins contribute at least 50% net after service consumable costs.`,
      escalate: true
    }
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
        12
      )
      setTypingCancel(() => cancel)
      return
    }

    // Real API call
    try {
      await streamCompletion({
        systemPrompt: ASK_EUGENE_SYSTEM_PROMPT,
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
          <div className="w-20 h-20 rounded-2xl primary-gradient flex items-center justify-center shadow-2xl glow-primary-strong mb-6">
            <span className="font-display font-bold text-white text-3xl">E</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-navy-950 mb-2">Ask Eugene</h2>
          <p className="text-gray-500 max-w-md leading-relaxed mb-8 text-sm font-body">
            Strategic aesthetics CFO and operational Due Diligence advisor, available 24/7. 
            Ask about provider compensation models, EBITDA maximization, cash flow forecasting, and MSO compliance.
          </p>

          <div className="grid grid-cols-1 gap-2.5 w-full max-w-lg">
            {STARTER_PROMPTS.map((prompt, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                onClick={() => sendMessage(prompt)}
                className="text-left px-4 py-3 rounded-xl text-sm text-gray-700 transition-all duration-200 hover:text-navy-950 hover:bg-indigo-50/50"
                style={{
                  background: 'rgba(99, 102, 241, 0.04)',
                  border: '1px solid rgba(99, 102, 241, 0.08)',
                }}
              >
                <Sparkles size={13} className="inline mr-2 text-indigo-500 opacity-70" />
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
              <EugeneAvatar />
              <div className="max-w-2xl">
                <div className="chat-message-eugene rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed">
                  <div className="prose prose-sm prose-stone max-w-none text-gray-800">
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                        strong: ({ children }) => <strong className="text-indigo-600 font-semibold">{children}</strong>,
                        ul: ({ children }) => <ul className="my-2 space-y-1">{children}</ul>,
                        li: ({ children }) => <li className="flex gap-2 text-gray-700"><span className="text-indigo-500 mt-1">·</span><span>{children}</span></li>,
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
              <EugeneAvatar />
              <EugeneTyping />
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      )}

      {/* Input area */}
      <div className="py-4 border-t border-gray-200">
        {messages.length > 0 && (
          <div className="flex items-center justify-end mb-2">
            <button
              onClick={clearMessages}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-400 transition-colors"
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
              placeholder="Ask Eugene about compensation, EBITDA, MSO structures..."
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
            <div className="absolute right-3 bottom-3 text-xs text-gray-400">
              ↵ send
            </div>
          </div>
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isStreaming}
            className="w-12 h-12 rounded-xl btn-primary flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
          >
            <Send size={16} className="text-white" />
          </button>
        </div>
        <p className="text-xs text-gray-400 text-center mt-2 font-body">
          {DEMO_MODE ? '🔮 Demo mode — using pre-written CFO responses. Add your OpenRouter key for live AI.' : 'Powered by Claude Sonnet · Responses in seconds'}
        </p>
      </div>
    </div>
  )
}
