"use client"

import { useState } from "react"
import ArtistCarousel from "./ArtistCarousel"
import Chat from "./Chat"
import ProfileSettings from "./ProfileSettings"
import { MessageCircle, User } from "lucide-react"

interface MarketplaceViewProps {
  userType: "buyer" | "seller"
}

export default function MarketplaceView({ userType }: MarketplaceViewProps) {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  return (
    <div className="relative">
      <ArtistCarousel />

      {/* Chat Icon */}
      <button
        className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-blue-500 text-white rounded-t-full flex items-center justify-center"
        onClick={() => setIsChatOpen(true)}
      >
        <MessageCircle size={24} />
      </button>

      {/* Profile Icon */}
      <button
        className="fixed top-0 right-0 w-16 h-16 bg-blue-500 text-white rounded-bl-full flex items-center justify-center"
        onClick={() => setIsProfileOpen(true)}
      >
        <User size={24} className="transform translate-x-1/4 -translate-y-1/4" />
      </button>

      {/* Chat Popup */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl h-3/4 overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">Chat</h2>
              <button onClick={() => setIsChatOpen(false)} className="text-gray-500 hover:text-gray-700">
                Close
              </button>
            </div>
            <Chat userType={userType} />
          </div>
        </div>
      )}

      {/* Profile Settings Popup */}
      {isProfileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">Profile Settings</h2>
              <button onClick={() => setIsProfileOpen(false)} className="text-gray-500 hover:text-gray-700">
                Close
              </button>
            </div>
            <ProfileSettings userType={userType} />
          </div>
        </div>
      )}
    </div>
  )
}