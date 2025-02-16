"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ArtistCarousel from "./ArtistCarousel"
import SellerProfile from "./SellerProfile"
import Analytics from "./Analytics"
import Chat from "./Chat"

export default function SellerView() {
  const [activeTab, setActiveTab] = useState("browse")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="browse">Browse Artists</TabsTrigger>
        <TabsTrigger value="profile">My Profile</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="chat">Chat</TabsTrigger>
      </TabsList>
      <TabsContent value="browse">
        <ArtistCarousel />
      </TabsContent>
      <TabsContent value="profile">
        <SellerProfile />
      </TabsContent>
      <TabsContent value="analytics">
        <Analytics />
      </TabsContent>
      <TabsContent value="chat">
        <Chat userType="seller" />
      </TabsContent>
    </Tabs>
  )
}