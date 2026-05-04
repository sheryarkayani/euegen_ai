const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY
const BASE_URL = 'https://openrouter.ai/api/v1'

export async function streamCompletion({ systemPrompt, messages, onChunk, model = 'anthropic/claude-sonnet-4-5' }) {
  const response = await fetch(`${BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://ginasai.com',
      'X-Title': "Gina's AI — Med Spa Matchmaker"
    },
    body: JSON.stringify({
      model,
      stream: true,
      max_tokens: 1500,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ]
    })
  })

  if (!response.ok) {
    throw new Error(`OpenRouter error: ${response.status}`)
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    const chunk = decoder.decode(value)
    const lines = chunk.split('\n').filter(l => l.startsWith('data: '))
    for (const line of lines) {
      const data = line.slice(6)
      if (data === '[DONE]') return
      try {
        const parsed = JSON.parse(data)
        const content = parsed.choices?.[0]?.delta?.content
        if (content) onChunk(content)
      } catch {
        // ignore parse errors
      }
    }
  }
}

export async function generateContent({ systemPrompt, userPrompt, model = 'anthropic/claude-sonnet-4-5' }) {
  const response = await fetch(`${BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://ginasai.com',
      'X-Title': "Gina's AI"
    },
    body: JSON.stringify({
      model,
      max_tokens: 2000,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ]
    })
  })
  const data = await response.json()
  return data.choices?.[0]?.message?.content
}

// Demo mode typing simulator
export function simulateTyping(text, onChunk, onDone, speed = 18) {
  let i = 0
  const interval = setInterval(() => {
    if (i >= text.length) {
      clearInterval(interval)
      if (onDone) onDone()
      return
    }
    // Type 1–3 chars at a time for more natural feel
    const chunkSize = Math.floor(Math.random() * 3) + 1
    onChunk(text.slice(i, i + chunkSize))
    i += chunkSize
  }, speed)
  return () => clearInterval(interval)
}
