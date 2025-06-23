"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Calendar, Book, Film, Zap } from "lucide-react"
import mcuMoviesData from "@/data/mcu-movies.json"

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

interface CharacterModalProps {
  character: Character | null
  isOpen: boolean
  onClose: () => void
}

export default function CharacterModal({ character, isOpen, onClose }: CharacterModalProps) {
  const [imageError, setImageError] = useState(false)

  if (!character) return null

  const imageUrl = `${character.thumbnail.path}.${character.thumbnail.extension}`
  const isImageAvailable = !imageUrl.includes("image_not_available") && !imageError
  const topComics = character.comics.items.slice(0, 5)
  const wikiUrl = character.urls.find((url) => url.type === "wiki")?.url
  const detailUrl = character.urls.find((url) => url.type === "detail")?.url

  // Find related MCU movies
  const relatedMovies = mcuMoviesData.movies.filter((movie) =>
    movie.characters.some(
      (movieChar) =>
        movieChar.toLowerCase().includes(character.name.toLowerCase()) ||
        character.name.toLowerCase().includes(movieChar.toLowerCase()),
    ),
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto comic-border bg-white dark:bg-gray-900">
            <DialogHeader>
              <DialogTitle className="font-bebas text-3xl text-marvel-red pr-8">{character.name}</DialogTitle>
            </DialogHeader>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Character Image */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-comic"
              >
                {isImageAvailable ? (
                  <Image
                    src={imageUrl || "/placeholder.svg"}
                    alt={character.name}
                    fill
                    className="object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-marvel-red via-red-600 to-red-800 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <span className="text-white font-bebas text-4xl text-center px-4 relative z-10 transform rotate-[-5deg]">
                      {character.name}
                    </span>
                    <div className="absolute top-4 right-4">
                      <Zap className="text-yellow-400 w-12 h-12 animate-pulse" />
                    </div>
                  </div>
                )}

                {/* Power Stats Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/80 text-white p-3 rounded-lg backdrop-blur-sm">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <Book className="w-5 h-5 mx-auto mb-1 text-marvel-red" />
                        <div className="text-xs font-roboto">Comics</div>
                        <div className="font-bebas text-lg">{character.comics.available}</div>
                      </div>
                      <div>
                        <Film className="w-5 h-5 mx-auto mb-1 text-marvel-red" />
                        <div className="text-xs font-roboto">Series</div>
                        <div className="font-bebas text-lg">{character.series.available}</div>
                      </div>
                      <div>
                        <Calendar className="w-5 h-5 mx-auto mb-1 text-marvel-red" />
                        <div className="text-xs font-roboto">Stories</div>
                        <div className="font-bebas text-lg">{character.stories.available}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Character Details */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-6"
              >
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview" className="font-bebas">
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="comics" className="font-bebas">
                      Comics
                    </TabsTrigger>
                    <TabsTrigger value="movies" className="font-bebas">
                      Movies
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4 mt-6">
                    <div>
                      <h4 className="font-bebas text-xl text-marvel-black dark:text-white mb-3">CHARACTER PROFILE</h4>
                      <p className="font-roboto text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                        {character.description ||
                          "A mysterious figure in the Marvel Universe with incredible powers and an epic story waiting to be discovered. This hero has appeared in countless adventures and continues to inspire fans worldwide."}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h5 className="font-bebas text-lg text-marvel-red mb-2">COMIC APPEARANCES</h5>
                        <p className="font-roboto text-2xl font-bold">{character.comics.available}</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h5 className="font-bebas text-lg text-marvel-red mb-2">SERIES COUNT</h5>
                        <p className="font-roboto text-2xl font-bold">{character.series.available}</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      {wikiUrl && (
                        <Button asChild className="bg-marvel-red hover:bg-red-700 text-white font-bebas shadow-comic">
                          <a
                            href={wikiUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2"
                          >
                            <ExternalLink size={16} />
                            MARVEL WIKI
                          </a>
                        </Button>
                      )}
                      {detailUrl && (
                        <Button
                          asChild
                          variant="outline"
                          className="font-bebas border-marvel-red text-marvel-red hover:bg-marvel-red hover:text-white"
                        >
                          <a
                            href={detailUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2"
                          >
                            <ExternalLink size={16} />
                            DETAILS
                          </a>
                        </Button>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="comics" className="space-y-4 mt-6">
                    <div>
                      <h4 className="font-bebas text-xl text-marvel-black dark:text-white mb-3">FEATURED COMICS</h4>
                      {topComics.length > 0 ? (
                        <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                          {topComics.map((comic, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <Badge
                                variant="outline"
                                className="block w-full p-3 text-left border-marvel-red text-marvel-red hover:bg-marvel-red hover:text-white transition-colors cursor-pointer"
                              >
                                <div className="flex items-center gap-2">
                                  <Book className="w-4 h-4 flex-shrink-0" />
                                  <span className="font-roboto text-sm">{comic.name}</span>
                                </div>
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <p className="font-roboto text-gray-500 italic">No comic information available.</p>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="movies" className="space-y-4 mt-6">
                    <div>
                      <h4 className="font-bebas text-xl text-marvel-black dark:text-white mb-3">MCU APPEARANCES</h4>
                      {relatedMovies.length > 0 ? (
                        <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                          {relatedMovies.map((movie, index) => (
                            <motion.div
                              key={movie.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
                            >
                              <div className="flex items-center gap-3">
                                <Film className="w-5 h-5 text-marvel-red flex-shrink-0" />
                                <div>
                                  <h5 className="font-bebas text-lg">{movie.title}</h5>
                                  <p className="font-roboto text-sm text-gray-600 dark:text-gray-400">
                                    {movie.year} • {movie.trivia}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <p className="font-roboto text-gray-500 italic">
                          This character hasn't appeared in MCU movies yet, but keep watching for future appearances!
                        </p>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
