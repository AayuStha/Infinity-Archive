"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Book, Zap } from "lucide-react"

interface TimelineEvent {
  id: number
  year: number
  character: string
  comic: string
  description: string
  significance: string
  era: "Golden Age" | "Silver Age" | "Bronze Age" | "Modern Age"
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    year: 1939,
    character: "Human Torch (Android)",
    comic: "Marvel Comics #1",
    description: "The first Marvel superhero makes his debut",
    significance: "Birth of Marvel Comics",
    era: "Golden Age",
  },
  {
    id: 2,
    year: 1941,
    character: "Captain America",
    comic: "Captain America Comics #1",
    description: "Steve Rogers becomes the First Avenger",
    significance: "Symbol of American heroism during WWII",
    era: "Golden Age",
  },
  {
    id: 3,
    year: 1962,
    character: "Spider-Man",
    comic: "Amazing Fantasy #15",
    description: "Peter Parker gains spider powers",
    significance: "Revolutionary teenage superhero",
    era: "Silver Age",
  },
  {
    id: 4,
    year: 1962,
    character: "Hulk",
    comic: "The Incredible Hulk #1",
    description: "Bruce Banner transforms into the Hulk",
    significance: "Monster as hero concept",
    era: "Silver Age",
  },
  {
    id: 5,
    year: 1963,
    character: "X-Men",
    comic: "X-Men #1",
    description: "Professor X forms his school for gifted youngsters",
    significance: "Metaphor for civil rights movement",
    era: "Silver Age",
  },
  {
    id: 6,
    year: 1963,
    character: "Iron Man",
    comic: "Tales of Suspense #39",
    description: "Tony Stark creates his first armor",
    significance: "Technology-based superhero",
    era: "Silver Age",
  },
  {
    id: 7,
    year: 1966,
    character: "Black Panther",
    comic: "Fantastic Four #52",
    description: "T'Challa, King of Wakanda, debuts",
    significance: "First mainstream Black superhero",
    era: "Silver Age",
  },
  {
    id: 8,
    year: 1974,
    character: "Wolverine",
    comic: "The Incredible Hulk #180",
    description: "Logan makes his first appearance",
    significance: "Anti-hero archetype",
    era: "Bronze Age",
  },
  {
    id: 9,
    year: 1977,
    character: "Ms. Marvel",
    comic: "Ms. Marvel #1",
    description: "Carol Danvers gains her powers",
    significance: "Feminist superhero icon",
    era: "Bronze Age",
  },
  {
    id: 10,
    year: 1982,
    character: "Daredevil (Miller Era)",
    comic: "Daredevil #158",
    description: "Frank Miller's darker take on Matt Murdock",
    significance: "Mature storytelling in comics",
    era: "Modern Age",
  },
]

export default function TimelineComponent() {
  const [selectedEra, setSelectedEra] = useState<string | null>(null)

  const eras = ["Golden Age", "Silver Age", "Bronze Age", "Modern Age"]
  const eraColors = {
    "Golden Age": "bg-yellow-500",
    "Silver Age": "bg-gray-400",
    "Bronze Age": "bg-orange-600",
    "Modern Age": "bg-purple-600",
  }

  const filteredEvents = selectedEra ? timelineEvents.filter((event) => event.era === selectedEra) : timelineEvents

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="font-bebas text-4xl md:text-5xl text-marvel-red mb-4">MARVEL TIMELINE</h2>
        <p className="font-roboto text-gray-600 dark:text-gray-300 text-lg mb-6">
          Journey through the first appearances of legendary heroes
        </p>

        {/* Era Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button
            onClick={() => setSelectedEra(null)}
            className={`px-4 py-2 rounded-full font-bebas text-sm transition-all ${
              !selectedEra
                ? "bg-marvel-red text-white shadow-comic"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            ALL ERAS
          </button>
          {eras.map((era) => (
            <button
              key={era}
              onClick={() => setSelectedEra(era)}
              className={`px-4 py-2 rounded-full font-bebas text-sm transition-all ${
                selectedEra === era
                  ? `${eraColors[era as keyof typeof eraColors]} text-white shadow-comic`
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {era}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-marvel-red"></div>

        {/* Timeline Events */}
        <div className="space-y-8">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex items-start gap-6"
            >
              {/* Timeline Dot */}
              <div className="relative z-10 flex-shrink-0">
                <div className="w-16 h-16 bg-marvel-red rounded-full flex items-center justify-center shadow-comic">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                  <Badge className={`${eraColors[event.era]} text-white font-bebas text-xs`}>{event.year}</Badge>
                </div>
              </div>

              {/* Event Card */}
              <Card className="flex-1 comic-border bg-white dark:bg-gray-900 hover:shadow-comic-hover transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="font-bebas text-2xl text-marvel-red">{event.character}</h3>
                        <Badge variant="outline" className="border-marvel-red text-marvel-red">
                          {event.era}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Book className="w-4 h-4" />
                          <span className="font-roboto text-sm font-medium">{event.comic}</span>
                        </div>

                        <p className="font-roboto text-gray-700 dark:text-gray-300 leading-relaxed">
                          {event.description}
                        </p>

                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                          <div className="flex items-start gap-2">
                            <Zap className="w-5 h-5 text-marvel-red mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="font-bebas text-lg text-marvel-black dark:text-white mb-1">
                                SIGNIFICANCE
                              </h4>
                              <p className="font-roboto text-sm text-gray-600 dark:text-gray-400">
                                {event.significance}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
