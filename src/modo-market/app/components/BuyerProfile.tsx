"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Cropper from "react-easy-crop"
import { getCroppedImg } from "../utils/cropImage"

export default function BuyerProfile() {
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
    <Card>
      <CardHeader>
        <CardTitle>Buyer Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="profilePicture">Profile Picture</Label>
            <div className="flex items-center space-x-4">
              {croppedImage && (
                <div className="w-20 h-20 rounded-full overflow-hidden">
                  <img src={croppedImage || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
                </div>
              )}
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
            <Input id="name" defaultValue="John Doe" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="john@example.com" />
          </div>
          <Button type="submit">Update Profile</Button>
        </form>
      </CardContent>
    </Card>
  )
}