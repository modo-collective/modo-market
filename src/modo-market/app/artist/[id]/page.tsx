"use client"

import { useParams } from "next/navigation"
import ArtistPortfolio from "../../components/ArtistPortfolio"

const artists = [
  {
    id: 1,
    name: "Alice Wonder",
    specialization: "Digital Illustration",
    description: "Specializing in vibrant character designs and fantasy landscapes.",
    pricePoint: "Medium",
    image: "/placeholder.svg?height=200&width=200",
    lastOnline: "2 hours ago",
    responseTime: "Usually responds within 24 hours",
    detailedWork:
      "I create stunning digital illustrations with a focus on character design and fantasy landscapes. My work is characterized by vibrant colors and intricate details that bring imaginary worlds to life.",
    portfolio: [
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
    ],
  },
  {
    id: 2,
    name: "Bob Artisan",
    specialization: "Traditional Watercolor",
    description: "Creating serene landscapes and delicate still life paintings.",
    pricePoint: "High",
    image: "/placeholder.svg?height=200&width=200",
    lastOnline: "5 minutes ago",
    responseTime: "Usually responds within 2 hours",
    detailedWork:
      "I specialize in traditional watercolor techniques, creating serene landscapes and delicate still life paintings. My work captures the subtle interplay of light and color in nature.",
    portfolio: [
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
    ],
  },
  {
    id: 3,
    name: "Charlie Sketch",
    specialization: "Concept Art",
    description: "Bringing imaginative characters and worlds to life for games and films.",
    pricePoint: "Medium",
    image: "/placeholder.svg?height=200&width=200",
    lastOnline: "1 day ago",
    responseTime: "Usually responds within 3 days",
    detailedWork:
      "I am a concept artist specializing in creating imaginative characters and worlds for games and films. My work focuses on translating ideas into visually compelling and functional designs.",
    portfolio: [
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
    ],
  },
]

export default function ArtistPage() {
  const params = useParams()
  const artistId = Number(params.id)
  const artist = artists.find((a) => a.id === artistId)

  if (!artist) {
    return <div>Artist not found</div>
  }

  return <ArtistPortfolio artist={artist} userType="buyer" />
}