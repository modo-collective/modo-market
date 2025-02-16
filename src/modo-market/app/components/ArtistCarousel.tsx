import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { DollarSign, Clock, Zap } from "lucide-react"
import Link from "next/link"

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

export default function ArtistCarousel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {artists.map((artist) => (
        <Card key={artist.id} className="flex flex-col">
          <CardContent className="flex-grow flex flex-col">
            <Image
              src={artist.image || "/placeholder.svg"}
              alt={artist.name}
              width={200}
              height={200}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold mb-1">{artist.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{artist.specialization}</p>
            <p className="text-sm text-gray-600 mb-2 flex-grow">{artist.description}</p>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <span className="text-sm font-semibold mr-1">Price:</span>
                <PricePoint price={artist.pricePoint} />
              </div>
              <Badge variant="secondary" className="text-xs">
                <Clock className="w-3 h-3 mr-1" />
                {artist.lastOnline}
              </Badge>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Zap className="w-4 h-4 mr-1 flex-shrink-0" />
              <span>{artist.responseTime}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Link href={`/artist/${artist.id}`} passHref className="w-full">
              <Button className="w-full">Commission Artist</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}