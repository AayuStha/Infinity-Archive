"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, Calendar, Film } from "lucide-react"

interface Character {
  id: number
  name: string
  description: string
  thumbnail: {
    path: string
    extension: string
  }
  comics: {
    available: number
    items: Array<{ name: string }>
  }
  series: {
    available: number
  }
  stories: {
    available: number
  }
  urls: Array<{ type: string; url: string }>
}

interface CharacterCardProps {
  character: Character
  onMoreInfo: (character: Character) => void
  index: number
}

export default function CharacterCard({ character, onMoreInfo, index }: CharacterCardProps) {
  const [imageError, setImageError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const imageUrl = `${character.thumbnail.path}.${character.thumbnail.extension}`
  const isImageAvailable = !imageUrl.includes("image_not_available") && !imageError

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="w-full"
    >
      <Card className="comic-border bg-white dark:bg-gray-900 overflow-hidden group cursor-pointer transform transition-all duration-300 hover:shadow-comic-hover">
        <CardContent className="p-0">
          <div className="relative aspect-[3/4] overflow-hidden">
            {isImageAvailable ? (
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={character.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                onError={() => setImageError(true)}
                onLoad={() => setImageError(false)}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-marvel-red via-red-600 to-red-800 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="text-center text-white relative z-10">
                  <span className="font-bebas text-2xl md:text-3xl block mb-2 transform rotate-[-5deg]">
                    {character.name}
                  </span>
                  <div className="flex justify-center">
                    <Zap className="text-yellow-400 w-8 h-8 animate-pulse" />
                  </div>
                </div>
                {/* Comic-style effects */}
                <div className="absolute top-4 right-4 text-yellow-400 text-2xl animate-bounce">⚡</div>
                <div className="absolute bottom-4 left-4 text-white text-xl opacity-50">💥</div>
              </div>
            )}

            {/* Overlay with stats */}
            <motion.div
              className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
              animate={{ opacity: isHovered ? 1 : 0 }}
            >
              <div className="text-center text-white space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{character.comics.available} Comics</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Film className="w-4 h-4" />
                  <span className="text-sm">{character.series.available} Series</span>
                </div>
              </div>
            </motion.div>

            {/* Power level indicator */}
            <div className="absolute top-2 left-2">
              <Badge className="bg-marvel-yellow text-black font-bebas text-xs animate-pulse">HERO</Badge>
            </div>
          </div>

          <div className="p-4 space-y-3">
            <h3 className="font-bebas text-xl md:text-2xl text-marvel-black dark:text-white leading-tight">
              {character.name}
            </h3>

            <p className="font-roboto text-sm text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
              {character.description ||
                "A mysterious hero with incredible powers waiting to be discovered in the Marvel Universe."}
            </p>

            <div className="flex gap-2 flex-wrap">
              {character.comics.items.slice(0, 2).map((comic, idx) => (
                <Badge key={idx} variant="outline" className="text-xs border-marvel-red text-marvel-red">
                  {comic.name.split(" ").slice(0, 3).join(" ")}
                </Badge>
              ))}
            </div>

            <Button
              onClick={() => onMoreInfo(character)}
              className="w-full bg-marvel-red hover:bg-red-700 text-white font-bebas text-lg tracking-wide transform transition-all duration-200 hover:scale-105 shadow-comic hover:shadow-comic-hover"
            >
              DISCOVER MORE
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
