"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Play, Search, Calendar, Users } from "lucide-react"
import mcuMoviesData from "@/data/mcu-movies.json"

interface Movie {
  id: number
  title: string
  year: number
  poster: string
  trailer: string
  characters: string[]
  trivia: string
}

export default function MCUMoviesPanel() {
  const [movies] = useState<Movie[]>(mcuMoviesData.movies)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.characters.some((character) => character.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="font-bebas text-4xl md:text-5xl text-marvel-red mb-4">MCU MOVIE UNIVERSE</h2>
        <p className="font-roboto text-gray-600 dark:text-gray-300 text-lg mb-6">
          Explore the Marvel Cinematic Universe and character connections
        </p>

        {/* Search */}
        <div className="max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Search movies or characters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 font-roboto border-2 border-marvel-red/50 focus:border-marvel-red"
            />
          </div>
        </div>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMovies.map((movie, index) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="comic-border bg-white dark:bg-gray-900 hover:shadow-comic-hover transition-all duration-300 cursor-pointer group">
              <CardContent className="p-0">
                <div className="relative aspect-[2/3] overflow-hidden rounded-t-lg">
                  <Image
                    src={movie.poster || "/placeholder.svg"}
                    alt={movie.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center">
                    <Button
                      onClick={() => setSelectedMovie(movie)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-marvel-red hover:bg-red-700 text-white font-bebas shadow-comic"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      VIEW DETAILS
                    </Button>
                  </div>

                  {/* Year Badge */}
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-marvel-red text-white font-bebas">{movie.year}</Badge>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <h3 className="font-bebas text-xl text-marvel-black dark:text-white leading-tight">{movie.title}</h3>

                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Users className="w-4 h-4" />
                    <span className="font-roboto text-sm">{movie.characters.length} Characters</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {movie.characters.slice(0, 3).map((character, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs border-marvel-red text-marvel-red">
                        {character}
                      </Badge>
                    ))}
                    {movie.characters.length > 3 && (
                      <Badge variant="outline" className="text-xs border-gray-400 text-gray-500">
                        +{movie.characters.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Movie Detail Modal */}
      {selectedMovie && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedMovie(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <Card className="comic-border bg-white dark:bg-gray-900">
              <CardHeader className="relative">
                <Button
                  onClick={() => setSelectedMovie(null)}
                  variant="ghost"
                  className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                >
                  ✕
                </Button>
                <CardTitle className="font-bebas text-3xl text-marvel-red pr-8">{selectedMovie.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Movie Poster */}
                  <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-comic">
                    <Image
                      src={selectedMovie.poster || "/placeholder.svg"}
                      alt={selectedMovie.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Movie Details */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-marvel-red" />
                        <span className="font-bebas text-xl">{selectedMovie.year}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bebas text-xl text-marvel-black dark:text-white mb-3">FEATURED CHARACTERS</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedMovie.characters.map((character, index) => (
                          <Badge key={index} className="bg-marvel-red text-white font-roboto">
                            {character}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bebas text-xl text-marvel-black dark:text-white mb-3">MOVIE TRIVIA</h4>
                      <div className="comic-bubble bg-yellow-50 dark:bg-yellow-900/20 p-4">
                        <p className="font-roboto text-gray-700 dark:text-gray-300">{selectedMovie.trivia}</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button asChild className="bg-marvel-red hover:bg-red-700 text-white font-bebas shadow-comic">
                        <a
                          href={selectedMovie.trailer}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2"
                        >
                          <Play className="w-4 h-4" />
                          WATCH TRAILER
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}

      {/* No Results */}
      {filteredMovies.length === 0 && (
        <div className="text-center py-12">
          <h3 className="font-bebas text-2xl text-gray-600 dark:text-gray-300 mb-4">NO MOVIES FOUND</h3>
          <p className="font-roboto text-gray-500">Try searching for a different movie or character name</p>
        </div>
      )}
    </div>
  )
}
