"use client"

import { useState } from "react"
import ArtistCarousel from "../components/ArtistCarousel"
import Chat from "../components/Chat"
import ProfileSettings from "../components/ProfileSettings"
import SellerAnalytics from "../components/SellerAnalytics"
import { MessageCircle, User, BarChart } from "lucide-react"

export default function SellerPage() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false)

  return (
    <div className="relative min-h-screen">
      <h1 className="text-3xl font-bold text-center py-6">Modo Marketplace</h1>

      <div className="container mx-auto px-4">
        <ArtistCarousel />
      </div>

      {/* Chat Icon */}
      <button
        className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-blue-500 text-white rounded-t-full flex items-center justify-center transition-all duration-300 hover:h-12 hover:bg-blue-600"
        onClick={() => setIsChatOpen(true)}
      >
        <MessageCircle size={24} />
      </button>

      {/* Profile Icon */}
      <button
        className="fixed top-0 right-0 w-16 h-16 bg-blue-500 text-white rounded-bl-full flex items-center justify-center transition-all duration-300 hover:w-20 hover:h-20 hover:bg-blue-600"
        onClick={() => setIsProfileOpen(true)}
      >
        <User size={24} className="transform translate-x-1/4 -translate-y-1/4" />
      </button>

      {/* Analytics Icon */}
      <button
        className="fixed bottom-0 right-0 w-20 h-20 bg-blue-500 text-white rounded-tl-full flex items-center justify-center transition-all duration-300 hover:w-24 hover:h-24 hover:bg-blue-600"
        onClick={() => setIsAnalyticsOpen(true)}
      >
        <BarChart size={28} />
      </button>

      {/* Chat Popup */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl h-[90vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">Chat</h2>
              <button onClick={() => setIsChatOpen(false)} className="text-gray-500 hover:text-gray-700">
                Close
              </button>
            </div>
            <div className="flex-grow overflow-hidden">
              <Chat userType="seller" />
            </div>
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
            <ProfileSettings userType="seller" />
          </div>
        </div>
      )}

      {/* Analytics Popup */}
      {isAnalyticsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-7xl h-[95vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">Seller Analytics</h2>
              <button onClick={() => setIsAnalyticsOpen(false)} className="text-gray-500 hover:text-gray-700">
                Close
              </button>
            </div>
            <div className="flex-grow overflow-auto p-6">
              <SellerAnalytics />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}