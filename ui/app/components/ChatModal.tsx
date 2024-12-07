"use client"

import { useState } from "react"
import { X } from 'lucide-react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { ScrollArea } from "../components/ui/scroll-area"

interface Message {
  text: string
  isUser: boolean
}

interface ChatModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Ask me about a meme coin", isUser: false },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }])
      setInput("")
      // Simulate a response (you'd replace this with actual API call in a real app)
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "Thanks for your message! I'm processing your request to mint a thing.", isUser: false }])
      }, 1000)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex justify-between items-center p-4 border-b-2 border-black">
          <h2 className="text-xl font-bold text-primary">Chat with Minter</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <ScrollArea className="h-[400px] p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${
                message.isUser ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block p-3 rounded-xl ${
                  message.isUser
                    ? "bg-primary text-black "
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </ScrollArea>
        <div className="p-4 border-t-2 border-black">
          <div className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <Button onClick={handleSend}>Send</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

