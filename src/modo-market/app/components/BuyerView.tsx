"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ArtistCarousel from "./ArtistCarousel"
import BuyerProfile from "./BuyerProfile"
import Chat from "./Chat"

export default function BuyerView() {
  const [activeTab, setActiveTab] = useState("browse")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="browse">Browse Artists</TabsTrigger>
        <TabsTrigger value="profile">My Profile</TabsTrigger>
        <TabsTrigger value="chat">Chat</TabsTrigger>
      </TabsList>
      <TabsContent value="browse">
        <ArtistCarousel />
      </TabsContent>
      <TabsContent value="profile">
        <BuyerProfile />
      </TabsContent>
      <TabsContent value="chat">
        <Chat userType="buyer" />
      </TabsContent>
    </Tabs>
  )
}