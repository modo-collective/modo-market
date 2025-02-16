"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock data for conversations
const initialConversations = {
  buyer: [
    { id: 1, name: "Alice (Artist)", lastMessage: "I can start your commission next week." },
    { id: 2, name: "Bob (Artist)", lastMessage: "Your artwork is ready for review!" },
    { id: 3, name: "Charlie (Artist)", lastMessage: "Can you provide more details about your request?" },
  ],
  seller: [
    { id: 1, name: "David (Client)", lastMessage: "I'm interested in commissioning a piece." },
    { id: 2, name: "Eva (Client)", lastMessage: "The artwork looks amazing!" },
    { id: 3, name: "Frank (Client)", lastMessage: "When will the commission be ready?" },
  ],
}

// Mock data for messages
const initialMessages = {
  1: [
    { id: 1, sender: "Other", content: "Hello! How can I help you today?" },
    { id: 2, sender: "You", content: "Hi! I'm interested in commissioning a piece." },
    { id: 3, sender: "Other", content: "Great! What kind of artwork are you looking for?" },
  ],
  2: [
    { id: 1, sender: "Other", content: "Your artwork is ready for review!" },
    { id: 2, sender: "You", content: "Fantastic! I can't wait to see it." },
  ],
  3: [
    { id: 1, sender: "Other", content: "Can you provide more details about your request?" },
    { id: 2, sender: "You", content: "Sure, I'm looking for a digital portrait." },
  ],
}

interface ChatProps {
  userType: "buyer" | "seller"
}

export default function Chat({ userType }: ChatProps) {
  const [conversations, setConversations] = useState<Array<{ id: number; name: string; lastMessage: string }>>([])
  const [messages, setMessages] = useState<{ [key: number]: Array<{ id: number; sender: string; content: string }> }>(
    initialMessages,
  )
  const [activeConversation, setActiveConversation] = useState<number | null>(null)
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (userType in initialConversations) {
      setConversations(initialConversations[userType])
    } else {
      console.error(`Invalid userType: ${userType}`)
      setConversations([])
    }
  }, [userType])

  const handleSendMessage = () => {
    if (message.trim() && activeConversation !== null) {
      const newMessage = {
        id: (messages[activeConversation] || []).length + 1,
        sender: "You",
        content: message.trim(),
      }

      setMessages((prevMessages) => ({
        ...prevMessages,
        [activeConversation]: [...(prevMessages[activeConversation] || []), newMessage],
      }))

      setConversations((prevConversations) =>
        prevConversations.map((conv) =>
          conv.id === activeConversation ? { ...conv, lastMessage: message.trim() } : conv,
        ),
      )

      setMessage("")
    }
  }

  if (conversations.length === 0) {
    return <div className="p-4">Loading conversations...</div>
  }

  return (
    <Card className="h-full flex">
      <div className="w-1/3 border-r">
        <ScrollArea className="h-full">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={`p-4 cursor-pointer hover:bg-gray-100 ${activeConversation === conv.id ? "bg-gray-200" : ""}`}
              onClick={() => setActiveConversation(conv.id)}
            >
              <h3 className="font-semibold">{conv.name}</h3>
              <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
            </div>
          ))}
        </ScrollArea>
      </div>
      <div className="w-2/3 flex flex-col">
        <ScrollArea className="flex-grow p-4">
          {activeConversation !== null &&
            messages[activeConversation] &&
            messages[activeConversation].map((msg) => (
              <div key={msg.id} className={`mb-4 ${msg.sender === "You" ? "text-right" : "text-left"}`}>
                <span
                  className={`inline-block p-2 rounded-lg ${msg.sender === "You" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                  {msg.content}
                </span>
              </div>
            ))}
        </ScrollArea>
        <div className="p-4 border-t flex">
          <Input
            className="flex-grow mr-2"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      </div>
    </Card>
  )
}