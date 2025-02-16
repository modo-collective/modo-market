"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { DollarSign, Clock, Zap, MessageCircle } from "lucide-react"
import Chat from "./Chat"

interface ArtistPortfolioProps {
  artist: {
    id: number
    name: string
    specialization: string
    description: string
    pricePoint: string
    image: string
    lastOnline: string
    responseTime: string
    detailedWork: string
    portfolio: string[]
  }
  userType: "buyer" | "seller"
}

const PricePoint = ({ price }: { price: string }) => {
  const dollarSigns =
    {
      Low: 1,
      Medium: 2,
      High: 3,
    }[price] || 1

  return (
    <div className="flex items-center">
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <DollarSign key={i} className={`w-4 h-4 ${i < dollarSigns ? "text-blue-400" : "text-gray-300"}`} />
        ))}
    </div>
  )
}

export default function ArtistPortfolio({ artist, userType }: ArtistPortfolioProps) {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl">{artist.name}</CardTitle>
              <CardDescription className="text-xl">{artist.specialization}</CardDescription>
            </div>
            <Badge variant="secondary" className="text-sm">
              <Clock className="w-4 h-4 mr-1" />
              {artist.lastOnline}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Image
                src={artist.image || "/placeholder.svg"}
                alt={artist.name}
                width={400}
                height={400}
                className="w-full h-auto rounded-lg mb-4"
              />
              <p className="text-lg mb-4">{artist.description}</p>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span className="text-lg font-semibold mr-2">Price Point:</span>
                  <PricePoint price={artist.pricePoint} />
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Zap className="w-4 h-4 mr-1" />
                  <span>{artist.responseTime}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Detailed Work</h3>
              <p className="text-lg mb-6">{artist.detailedWork}</p>
              <Button className="w-full mb-4" onClick={() => setIsChatOpen(true)}>
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <h3 className="text-2xl font-semibold mb-4">Portfolio</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {artist.portfolio.map((item, index) => (
          <Image
            key={index}
            src={item || "/placeholder.svg"}
            alt={`Portfolio item ${index + 1}`}
            width={300}
            height={300}
            className="w-full h-64 object-cover rounded-lg"
          />
        ))}
      </div>

      {isChatOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl h-[90vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">Chat with {artist.name}</h2>
              <button onClick={() => setIsChatOpen(false)} className="text-gray-500 hover:text-gray-700">
                Close
              </button>
            </div>
            <div className="flex-grow overflow-hidden">
              <Chat userType={userType} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}