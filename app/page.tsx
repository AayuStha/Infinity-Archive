"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import Masonry from "react-masonry-css"
import { Search, Moon, Sun, Gamepad2, Clock, Film, Quote, Map } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTheme } from "next-themes"
import CharacterCard from "@/components/character-card"
import CharacterModal from "@/components/character-modal"
import ComicQuotesCarousel from "@/components/comic-quotes-carousel"
import MarvelUniverseMap from "@/components/marvel-universe-map"
import GuessTheHeroGame from "@/components/guess-the-hero-game"
import TimelineComponent from "@/components/timeline-component"
import MCUMoviesPanel from "@/components/mcu-movies-panel"
import LoadingSpinner from "@/components/loading-spinner"

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

interface ApiResponse {
  characters: Character[]
  total: number
  offset: number
  limit: number
}

export default function HomePage() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentOffset, setCurrentOffset] = useState(0)
  const [totalCharacters, setTotalCharacters] = useState(0)
  const [searchInput, setSearchInput] = useState("")
  const { theme, setTheme } = useTheme()

  const limit = 20

  const fetchCharacters = useCallback(
    async (search = "", offset = 0) => {
      setLoading(true)
      setError(null)

      try {
        const params = new URLSearchParams({
          offset: offset.toString(),
          limit: limit.toString(),
        })

        if (search) {
          params.append("search", search)
        }

        const response = await fetch(`/api/marvel/characters?${params}`)

        if (!response.ok) {
          throw new Error("Failed to fetch characters")
        }

        const data: ApiResponse = await response.json()

        if (offset === 0) {
          setCharacters(data.characters || [])
        } else {
          setCharacters((prev) => [...prev, ...(data.characters || [])])
        }

        setTotalCharacters(data.total || 0)
        setCurrentOffset(data.offset || 0)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    },
    [limit],
  )

  useEffect(() => {
    fetchCharacters()
  }, [fetchCharacters])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchTerm(searchInput)
    setCurrentOffset(0)
    fetchCharacters(searchInput, 0)
  }

  const handleMoreInfo = (character: Character) => {
    setSelectedCharacter(character)
    setIsModalOpen(true)
  }

  const loadMore = () => {
    const newOffset = currentOffset + limit
    fetchCharacters(searchTerm, newOffset)
  }

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Header */}
      <header className="relative bg-gradient-to-r from-marvel-black via-gray-900 to-marvel-black text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFydmVsfGVufDB8fDB8fHww)] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-marvel-red/20 to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="font-bebas text-6xl md:text-8xl lg:text-9xl text-marvel-red mb-4 tracking-wider drop-shadow-lg">
              MARVEL
            </h1>
            <p className="font-roboto text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Explore the Ultimate Universe of Heroes, Villains, and Epic Adventures
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  type="text"
                  placeholder="Search heroes and villains..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="pl-10 font-roboto border-2 border-marvel-red/50 focus:border-marvel-red bg-white/10 text-white placeholder:text-gray-400"
                />
              </div>
              <Button
                type="submit"
                className="bg-marvel-red hover:bg-red-700 text-white font-bebas text-lg px-6 shadow-comic hover:shadow-comic-hover transform hover:scale-105 transition-all duration-200"
              >
                SEARCH
              </Button>
            </form>
          </motion.div>
        </div>

        {/* Theme Toggle */}
        <Button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-white hover:bg-white/20"
        >
          {theme === "dark" ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </Button>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <Tabs defaultValue="characters" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 mb-8 bg-white dark:bg-gray-800 shadow-comic">
            <TabsTrigger value="characters" className="font-bebas text-sm md:text-base">
              <Search className="w-4 h-4 mr-2" />
              HEROES
            </TabsTrigger>
            <TabsTrigger value="game" className="font-bebas text-sm md:text-base">
              <Gamepad2 className="w-4 h-4 mr-2" />
              GAME
            </TabsTrigger>
            <TabsTrigger value="timeline" className="font-bebas text-sm md:text-base">
              <Clock className="w-4 h-4 mr-2" />
              TIMELINE
            </TabsTrigger>
            <TabsTrigger value="movies" className="font-bebas text-sm md:text-base">
              <Film className="w-4 h-4 mr-2" />
              MCU
            </TabsTrigger>
            <TabsTrigger value="quotes" className="font-bebas text-sm md:text-base">
              <Quote className="w-4 h-4 mr-2" />
              QUOTES
            </TabsTrigger>
            <TabsTrigger value="map" className="font-bebas text-sm md:text-base">
              <Map className="w-4 h-4 mr-2" />
              UNIVERSE
            </TabsTrigger>
          </TabsList>

          {/* Characters Tab */}
          <TabsContent value="characters" className="space-y-8">
            {!loading && !error && (
              <div className="text-center mb-6">
                <p className="font-roboto text-gray-600 dark:text-gray-300 text-lg">
                  {searchTerm ? `Search results for "${searchTerm}"` : "Marvel Heroes & Villains"}
                  <span className="text-marvel-red font-bold"> ({totalCharacters} total)</span>
                </p>
              </div>
            )}

            {loading && characters.length === 0 && <LoadingSpinner />}

            {error && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
                <p className="font-roboto text-red-600 mb-4 text-lg">{error}</p>
                <Button
                  onClick={() => fetchCharacters(searchTerm, 0)}
                  className="bg-marvel-red hover:bg-red-700 text-white font-bebas text-lg px-8 shadow-comic"
                >
                  TRY AGAIN
                </Button>
              </motion.div>
            )}

            {!loading && !error && characters.length > 0 && (
              <>
                <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className="masonry-grid"
                  columnClassName="masonry-grid-column"
                >
                  {characters.map((character, index) => (
                    <CharacterCard key={character.id} character={character} onMoreInfo={handleMoreInfo} index={index} />
                  ))}
                </Masonry>

                {characters.length < totalCharacters && (
                  <div className="text-center">
                    <Button
                      onClick={loadMore}
                      disabled={loading}
                      className="bg-marvel-red hover:bg-red-700 text-white font-bebas text-xl px-12 py-3 shadow-comic hover:shadow-comic-hover transform hover:scale-105 transition-all duration-200"
                    >
                      {loading ? "LOADING..." : "LOAD MORE HEROES"}
                    </Button>
                  </div>
                )}
              </>
            )}

            {!loading && !error && characters.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <h3 className="font-bebas text-3xl text-gray-600 dark:text-gray-300 mb-4">NO HEROES FOUND</h3>
                <p className="font-roboto text-gray-500 mb-6">Try searching for a different character name</p>
                {searchTerm && (
                  <Button
                    onClick={() => {
                      setSearchTerm("")
                      setSearchInput("")
                      fetchCharacters("", 0)
                    }}
                    className="bg-marvel-red hover:bg-red-700 text-white font-bebas text-lg px-8 shadow-comic"
                  >
                    SHOW ALL HEROES
                  </Button>
                )}
              </motion.div>
            )}
          </TabsContent>

          {/* Game Tab */}
          <TabsContent value="game">
            <GuessTheHeroGame />
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline">
            <TimelineComponent />
          </TabsContent>

          {/* Movies Tab */}
          <TabsContent value="movies">
            <MCUMoviesPanel />
          </TabsContent>

          {/* Quotes Tab */}
          <TabsContent value="quotes" className="py-8">
            <div className="text-center mb-8">
              <h2 className="font-bebas text-4xl md:text-5xl text-marvel-red mb-4">LEGENDARY QUOTES</h2>
              <p className="font-roboto text-gray-600 dark:text-gray-300 text-lg">
                Iconic words from the Marvel Universe
              </p>
            </div>
            <ComicQuotesCarousel />
          </TabsContent>

          {/* Map Tab */}
          <TabsContent value="map" className="py-8">
            <div className="text-center mb-8">
              <h2 className="font-bebas text-4xl md:text-5xl text-marvel-red mb-4">MARVEL UNIVERSE MAP</h2>
              <p className="font-roboto text-gray-600 dark:text-gray-300 text-lg">
                Explore iconic locations across the Marvel Universe
              </p>
            </div>
            <MarvelUniverseMap />
          </TabsContent>
        </Tabs>
      </main>

      {/* Character Modal */}
      <CharacterModal character={selectedCharacter} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Footer */}
      <footer className="bg-marvel-black text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="font-roboto text-gray-300">© 2024 Marvel Universe Explorer. Data provided by Marvel API.</p>
          <p className="font-roboto text-sm text-gray-400 mt-2">Built with Next.js, Tailwind CSS, and Framer Motion</p>
        </div>
      </footer>
    </div>
  )
}
