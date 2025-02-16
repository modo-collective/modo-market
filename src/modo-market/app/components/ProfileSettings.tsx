"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import Cropper from "react-easy-crop"
import { getCroppedImg } from "../utils/cropImage"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Globe, Twitter, Instagram, Facebook, Linkedin, Youtube } from "lucide-react"

interface ProfileSettingsProps {
  userType: "buyer" | "seller"
}

interface SocialLink {
  name: string
  icon: React.ReactNode
  placeholder: string
}

const socialLinks: SocialLink[] = [
  { name: "website", icon: <Globe className="h-5 w-5" />, placeholder: "https://yourwebsite.com" },
  { name: "twitter", icon: <Twitter className="h-5 w-5" />, placeholder: "https://twitter.com/yourusername" },
  { name: "instagram", icon: <Instagram className="h-5 w-5" />, placeholder: "https://instagram.com/yourusername" },
  { name: "facebook", icon: <Facebook className="h-5 w-5" />, placeholder: "https://facebook.com/yourusername" },
  { name: "linkedin", icon: <Linkedin className="h-5 w-5" />, placeholder: "https://linkedin.com/in/yourusername" },
  { name: "youtube", icon: <Youtube className="h-5 w-5" />, placeholder: "https://youtube.com/c/yourchannel" },
]

export default function ProfileSettings({ userType }: ProfileSettingsProps) {
  const [image, setImage] = useState<string | null>(null)
  const [croppedImage, setCroppedImage] = useState<string | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [isCropping, setIsCropping] = useState(false)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels, 0)
      setCroppedImage(croppedImage)
      setIsCropping(false)
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, image])

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener("load", () => {
        setImage(reader.result as string)
        setIsCropping(true)
      })
      reader.readAsDataURL(e.target.files[0])
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{userType === "buyer" ? "Buyer" : "Seller"} Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[70vh] pr-4">
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="profilePicture">Profile Picture</Label>
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={croppedImage || "/placeholder.svg"} alt="Profile" />
                  <AvatarFallback>{userType === "buyer" ? "JD" : "JA"}</AvatarFallback>
                </Avatar>
                <Input id="profilePicture" type="file" accept="image/*" onChange={onFileChange} />
              </div>
            </div>
            {isCropping && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-4 rounded-lg w-96 h-96">
                  <div className="relative w-full h-80">
                    <Cropper
                      image={image}
                      crop={crop}
                      zoom={zoom}
                      aspect={1}
                      onCropChange={setCrop}
                      onCropComplete={onCropComplete}
                      onZoomChange={setZoom}
                    />
                  </div>
                  <div className="flex justify-between mt-4">
                    <Button onClick={() => setIsCropping(false)}>Cancel</Button>
                    <Button onClick={showCroppedImage}>Crop</Button>
                  </div>
                </div>
              </div>
            )}
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue={userType === "buyer" ? "John Doe" : "Jane Artist"} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={`${userType}@example.com`} />
            </div>
            {userType === "seller" && (
              <>
                <div>
                  <Label htmlFor="description">Profile Description</Label>
                  <Textarea id="description" defaultValue="I'm a digital artist specializing in character design." />
                </div>
                <div>
                  <Label htmlFor="moreDetails">More Details</Label>
                  <Textarea
                    id="moreDetails"
                    defaultValue="I have 5 years of experience in digital art and illustration. I specialize in creating unique character designs for games, comics, and animations."
                  />
                </div>
              </>
            )}
            <div className="space-y-4">
              <Label>Social Links</Label>
              {socialLinks.map((link) => (
                <div key={link.name} className="flex items-center space-x-2">
                  {link.icon}
                  <Input id={link.name} placeholder={link.placeholder} />
                </div>
              ))}
            </div>
            <Button type="submit" className="w-full">
              Update Profile
            </Button>
          </form>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}