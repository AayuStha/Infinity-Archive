"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import locationsData from "@/data/marvel-locations.json"

interface Location {
  id: number
  name: string
  description: string
  coordinates: { x: number; y: number }
  realCoordinates: { lat: number; lng: number }
  characters: string[]
  firstAppearance: string
  image: string
}

export default function MarvelUniverseMap() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [hoveredLocation, setHoveredLocation] = useState<number | null>(null)

  const locations: Location[] = locationsData.locations

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="relative bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 rounded-2xl overflow-hidden shadow-2xl">
        {/* Accurate World Map SVG */}
        <svg
          viewBox="0 0 800 400"
          className="w-full h-[400px] md:h-[500px]"
          style={{ background: "linear-gradient(to bottom, #1e3a8a, #1e40af, #1e3a8a)" }}
        >
          {/* More accurate world map continents */}
          <g fill="#10b981" stroke="#059669" strokeWidth="1" opacity="0.8">
            {/* North America */}
            <path d="M80,60 L90,50 L120,45 L150,50 L180,55 L200,70 L220,80 L240,90 L250,110 L245,130 L240,150 L230,170 L220,180 L200,185 L180,190 L160,185 L140,180 L120,170 L100,160 L85,140 L80,120 L75,100 L80,80 Z" />

            {/* Greenland */}
            <path d="M200,30 L220,25 L240,30 L245,50 L240,70 L220,75 L200,70 L195,50 Z" />

            {/* South America */}
            <path d="M180,200 L200,195 L220,200 L235,220 L240,250 L245,280 L240,310 L230,330 L220,340 L200,345 L180,340 L170,320 L165,300 L160,280 L165,260 L170,240 L175,220 Z" />

            {/* Europe */}
            <path d="M380,80 L400,75 L420,80 L440,85 L450,100 L445,120 L440,135 L430,145 L410,150 L390,145 L380,130 L375,115 L380,100 Z" />

            {/* Africa */}
            <path d="M400,150 L420,145 L440,150 L460,160 L470,180 L475,210 L470,240 L465,270 L455,290 L445,300 L425,305 L405,300 L390,290 L385,270 L390,240 L395,210 L400,180 Z" />

            {/* Asia */}
            <path d="M480,70 L520,65 L560,70 L600,75 L640,80 L670,90 L690,110 L685,130 L680,150 L670,170 L650,180 L620,185 L590,180 L560,175 L530,170 L500,160 L480,140 L475,120 L480,100 Z" />

            {/* Australia */}
            <path d="M580,280 L610,275 L640,280 L655,290 L650,305 L635,315 L610,320 L585,315 L575,300 Z" />

            {/* Antarctica */}
            <path d="M100,350 L200,345 L300,350 L400,355 L500,350 L600,345 L700,350 L700,380 L100,380 Z" />
          </g>

          {/* Ocean effects */}
          <defs>
            <radialGradient id="oceanGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#1e40af" stopOpacity="0.1" />
            </radialGradient>
            <radialGradient id="asgardGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#FFA500" />
            </radialGradient>
          </defs>

          {/* Ocean texture */}
          <circle cx="200" cy="200" r="50" fill="url(#oceanGradient)" />
          <circle cx="600" cy="150" r="40" fill="url(#oceanGradient)" />
          <circle cx="400" cy="300" r="60" fill="url(#oceanGradient)" />

          {/* Location markers with accurate positioning */}
          {locations.map((location) => (
            <g key={location.id}>
              <motion.circle
                cx={location.coordinates.x}
                cy={location.coordinates.y}
                r={hoveredLocation === location.id ? 12 : 8}
                fill="#ED1D24"
                stroke="#ffffff"
                strokeWidth="3"
                className="cursor-pointer drop-shadow-lg"
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.9 }}
                onMouseEnter={() => setHoveredLocation(location.id)}
                onMouseLeave={() => setHoveredLocation(null)}
                onClick={() => setSelectedLocation(location)}
                style={{ filter: "drop-shadow(0 0 6px rgba(237, 29, 36, 0.8))" }}
              />

              {/* Pulsing effect */}
              <motion.circle
                cx={location.coordinates.x}
                cy={location.coordinates.y}
                r="15"
                fill="none"
                stroke="#ED1D24"
                strokeWidth="2"
                opacity="0.6"
                animate={{ r: [15, 25, 15], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />

              {/* Location name on hover */}
              <AnimatePresence>
                {hoveredLocation === location.id && (
                  <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
                    <rect
                      x={location.coordinates.x - 50}
                      y={location.coordinates.y - 40}
                      width="100"
                      height="25"
                      fill="rgba(0,0,0,0.9)"
                      rx="12"
                      stroke="#ED1D24"
                      strokeWidth="1"
                    />
                    <text
                      x={location.coordinates.x}
                      y={location.coordinates.y - 22}
                      textAnchor="middle"
                      fill="white"
                      fontSize="12"
                      fontFamily="Bebas Neue"
                      fontWeight="bold"
                    >
                      {location.name}
                    </text>
                  </motion.g>
                )}
              </AnimatePresence>
            </g>
          ))}

          {/* Special floating Asgard */}
          <motion.g
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <circle
              cx="400"
              cy="50"
              r="18"
              fill="url(#asgardGradient)"
              stroke="#FFD700"
              strokeWidth="3"
              className="cursor-pointer drop-shadow-lg"
              onClick={() => setSelectedLocation(locations.find((l) => l.name === "Asgard") || null)}
              style={{ filter: "drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))" }}
            />
            <text
              x="400"
              y="55"
              textAnchor="middle"
              fill="#8B4513"
              fontSize="10"
              fontFamily="Bebas Neue"
              fontWeight="bold"
            >
              ⚡
            </text>
          </motion.g>
        </svg>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-black/80 text-white p-4 rounded-lg backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-2">
            <Globe className="w-5 h-5 text-marvel-red" />
            <span className="font-bebas text-lg">MARVEL UNIVERSE</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 bg-marvel-red rounded-full"></div>
            <span>Click markers to explore locations</span>
          </div>
        </div>
      </div>

      {/* Location Details Modal */}
      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedLocation(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl"
            >
              <Card className="comic-border bg-white dark:bg-gray-900">
                <CardHeader className="relative">
                  <Button
                    onClick={() => setSelectedLocation(null)}
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                  <CardTitle className="font-bebas text-3xl text-marvel-red pr-8">{selectedLocation.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Location Image */}
                    <div className="relative aspect-video rounded-lg overflow-hidden shadow-comic bg-gradient-to-br from-blue-500 to-blue-700">
                      <Image
                        src={selectedLocation.image || "/placeholder.svg"}
                        alt={selectedLocation.name}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          // Fallback to a gradient background with location name
                          const target = e.target as HTMLImageElement
                          target.style.display = "none"
                        }}
                      />
                      {/* Fallback content */}
                      <div className="absolute inset-0 flex items-center justify-center text-white">
                        <div className="text-center">
                          <h3 className="font-bebas text-2xl mb-2">{selectedLocation.name}</h3>
                          <div className="text-4xl">🌍</div>
                        </div>
                      </div>
                    </div>

                    {/* Location Details */}
                    <div className="space-y-4">
                      <p className="font-roboto text-gray-700 dark:text-gray-300 leading-relaxed">
                        {selectedLocation.description}
                      </p>

                      <div>
                        <h4 className="font-bebas text-lg mb-2 text-marvel-black dark:text-white">COORDINATES:</h4>
                        <p className="font-roboto text-sm text-gray-600 dark:text-gray-400">
                          {selectedLocation.realCoordinates.lat}°N, {Math.abs(selectedLocation.realCoordinates.lng)}°
                          {selectedLocation.realCoordinates.lng >= 0 ? "E" : "W"}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-bebas text-lg mb-2 text-marvel-black dark:text-white">
                          NOTABLE CHARACTERS:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedLocation.characters.map((character, index) => (
                            <Badge key={index} className="bg-marvel-red text-white font-roboto">
                              {character}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bebas text-lg mb-1 text-marvel-black dark:text-white">FIRST APPEARANCE:</h4>
                        <p className="font-roboto text-sm text-gray-600 dark:text-gray-400">
                          {selectedLocation.firstAppearance}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
