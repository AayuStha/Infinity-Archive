"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import quotesData from "@/data/comic-quotes.json"

interface QuoteType {
  id: number
  text: string
  character: string
  comic: string
  year: number
}

export default function ComicQuotesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [quotes] = useState<QuoteType[]>(quotesData.quotes)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [quotes.length])

  const nextQuote = () => {
    setCurrentIndex((prev) => (prev + 1) % quotes.length)
  }

  const prevQuote = () => {
    setCurrentIndex((prev) => (prev - 1 + quotes.length) % quotes.length)
  }

  const currentQuote = quotes[currentIndex]

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="comic-bubble bg-white dark:bg-gray-800 min-h-[200px] flex items-center justify-center relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#ED1D24_1px,transparent_1px)] bg-[length:20px_20px]"></div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.8 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="text-center px-8 py-6 relative z-10"
          >
            <Quote className="w-8 h-8 text-marvel-red mx-auto mb-4" />

            <blockquote className="font-bebas text-2xl md:text-3xl text-gray-800 dark:text-white mb-4 leading-tight">
              "{currentQuote.text}"
            </blockquote>

            <div className="space-y-2">
              <p className="font-roboto font-bold text-marvel-red text-lg">— {currentQuote.character}</p>
              <p className="font-roboto text-sm text-gray-600 dark:text-gray-300">
                {currentQuote.comic} ({currentQuote.year})
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <Button
          onClick={prevQuote}
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-comic z-20"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>

        <Button
          onClick={nextQuote}
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-comic z-20"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {quotes.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex ? "bg-marvel-red scale-125" : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
