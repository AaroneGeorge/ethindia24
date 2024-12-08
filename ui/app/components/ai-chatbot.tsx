"use client"

import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { ScrollArea } from '../components/ui/scroll-area'

interface Message {
  text: string
  isUser: boolean
}

export function AIChatbot({ coinId }: { coinId: string }) {
  const [messages, setMessages] = useState<Message[]>([
    { text: `Hello! I'm here to help you with information about ${coinId.toUpperCase()}. What would you like to know?`, isUser: false },
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }])
      setInput('')
      // Simulate AI response (replace with actual AI integration in a real app)
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: `I'm sorry, I don't have real-time information about ${coinId.toUpperCase()}. In a real application, I would provide accurate details based on your query.`, 
          isUser: false 
        }])
      }, 1000)
    }
  }

  return (
    <div className="rounded-3xl border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] h-[calc(100vh-2rem)]">
      <h2 className="text-2xl font-bold mb-4">AI Assistant</h2>
      <div className="flex flex-col h-full">
        <ScrollArea className="flex-grow mb-4 pr-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${message.isUser ? 'text-right' : 'text-left'}`}
            >
              <div
                className={`inline-block p-3 rounded-xl ${
                  message.isUser
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </ScrollArea>
        <div className="flex space-x-2 mb-10">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about the coin..."
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button onClick={handleSend}>Send</Button>
        </div>
      </div>
    </div>
  )
}

