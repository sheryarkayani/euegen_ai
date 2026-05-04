import { create } from 'zustand'

const useChatStore = create((set, get) => ({
  conversations: [],
  activeConversationId: null,
  messages: [],
  isStreaming: false,
  streamingMessage: '',

  setStreaming: (isStreaming) => set({ isStreaming }),
  setStreamingMessage: (streamingMessage) => set({ streamingMessage }),
  appendToStreamingMessage: (chunk) =>
    set((state) => ({ streamingMessage: state.streamingMessage + chunk })),

  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
          ...message,
        },
      ],
    })),

  finalizeStreamingMessage: () => {
    const { streamingMessage } = get()
    if (!streamingMessage) return
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: streamingMessage,
          timestamp: new Date().toISOString(),
        },
      ],
      streamingMessage: '',
      isStreaming: false,
    }))
  },

  clearMessages: () => set({ messages: [], streamingMessage: '', isStreaming: false }),

  setActiveConversation: (id) => set({ activeConversationId: id }),
}))

export default useChatStore
