"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, Trophy, RotateCcw, Eye, Star } from "lucide-react"

interface GameCharacter {
  id: number
  name: string
  image: string
  hints: string[]
  difficulty: "easy" | "medium" | "hard"
  alternateNames: string[]
}

const gameCharacters: GameCharacter[] = [
  {
    id: 1,
    name: "Spider-Man",
    image: "https://cdn.marvel.com/u/prod/marvel/i/mg/3/50/526548a343e4b/standard_xlarge.jpg",
    hints: [
      "🕷️ Your friendly neighborhood hero who swings through New York City",
      "🕸️ Got powers from a radioactive spider bite during a school field trip",
      "📸 Works as a photographer for the Daily Bugle newspaper",
      "⚡ Has a 'spider-sense' that warns him of danger before it happens",
    ],
    difficulty: "easy",
    alternateNames: ["Peter Parker", "Spiderman", "Web Slinger", "Wall Crawler", "Spidey"],
  },
  {
    id: 2,
    name: "Iron Man",
    image: "https://cdn.marvel.com/u/prod/marvel/i/mg/9/c0/527bb7b37ff55/standard_xlarge.jpg",
    hints: [
      "🤖 Genius billionaire who built a high-tech suit of armor",
      "🏢 CEO of Stark Industries and master inventor",
      "🎯 His AI assistant was originally called JARVIS",
      "💬 Famous for publicly declaring 'I am Iron Man' at a press conference",
    ],
    difficulty: "easy",
    alternateNames: ["Tony Stark", "Ironman", "Shellhead", "Golden Avenger"],
  },
  {
    id: 3,
    name: "Captain America",
    image: "https://cdn.marvel.com/u/prod/marvel/i/mg/3/50/537ba56d31087/standard_xlarge.jpg",
    hints: [
      "🛡️ Super soldier from World War II with an indestructible shield",
      "🧊 Was frozen in ice for decades before being revived in modern times",
      "⭐ Known for his unwavering moral compass and natural leadership",
      "💎 His shield is made of vibranium and can ricochet off multiple targets",
    ],
    difficulty: "easy",
    alternateNames: ["Steve Rogers", "Cap", "First Avenger", "Sentinel of Liberty", "Star Spangled Man"],
  },
  {
    id: 4,
    name: "Thor",
    image: "https://cdn.marvel.com/u/prod/marvel/i/mg/d/d0/5269657a74350/standard_xlarge.jpg",
    hints: [
      "⚡ Norse god of thunder who wields an enchanted hammer",
      "👑 Prince of Asgard and son of the All-Father Odin",
      "🔨 His hammer Mjolnir can only be lifted by those who are worthy",
      "🌩️ Can summon lightning storms and has godlike strength",
    ],
    difficulty: "medium",
    alternateNames: ["God of Thunder", "Odinson", "Point Break", "Thor Odinson"],
  },
  {
    id: 5,
    name: "Black Widow",
    image: "https://cdn.marvel.com/u/prod/marvel/i/mg/f/30/50fecad1f395d/standard_xlarge.jpg",
    hints: [
      "🕷️ Former Russian spy trained in the deadly Red Room program",
      "🥋 Master assassin and expert in hand-to-hand combat",
      "💄 Has distinctive red hair and uses electric 'Widow's Bites'",
      "🎯 One of the most skilled spies and founding Avengers member",
    ],
    difficulty: "medium",
    alternateNames: ["Natasha Romanoff", "Natasha", "Nat", "Red Room Graduate"],
  },
  {
    id: 6,
    name: "Hulk",
    image: "https://cdn.marvel.com/u/prod/marvel/i/mg/5/a0/538615ca33ab0/standard_xlarge.jpg",
    hints: [
      "💚 Brilliant scientist who transforms into a green monster when angry",
      "💪 His strength increases exponentially with his level of rage",
      "💥 Famous for his battle cry 'Hulk Smash!' when in monster form",
      "☢️ Was exposed to massive gamma radiation in a lab accident",
    ],
    difficulty: "easy",
    alternateNames: ["Bruce Banner", "Green Goliath", "Jade Giant", "The Incredible Hulk"],
  },
  {
    id: 7,
    name: "Doctor Strange",
    image: "https://cdn.marvel.com/u/prod/marvel/i/mg/5/f0/5261a85a501fe/standard_xlarge.jpg",
    hints: [
      "🏥 Former world-renowned neurosurgeon who lost use of his hands",
      "🔮 Became Master of the Mystic Arts after seeking magical healing",
      "🧥 Wears a red Cloak of Levitation that can fly independently",
      "👁️ Possesses the Eye of Agamotto and can manipulate time itself",
    ],
    difficulty: "hard",
    alternateNames: ["Stephen Strange", "Sorcerer Supreme", "Master of Mystic Arts", "Dr Strange"],
  },
  {
    id: 8,
    name: "Black Panther",
    image: "https://cdn.marvel.com/u/prod/marvel/i/mg/6/60/5261a80a67e7d/standard_xlarge.jpg",
    hints: [
      "👑 King of the technologically advanced African nation of Wakanda",
      "💎 His suit is made of vibranium, the strongest metal on Earth",
      "🌿 Gained enhanced abilities from the mystical heart-shaped herb",
      "🐾 Protects the world's largest vibranium deposit from outsiders",
    ],
    difficulty: "medium",
    alternateNames: ["T'Challa", "King of Wakanda", "Black Panther"],
  },
  {
    id: 9,
    name: "Wolverine",
    image: "https://cdn.marvel.com/u/prod/marvel/i/mg/2/60/537bcaef0f6cf/standard_xlarge.jpg",
    hints: [
      "🗡️ Mutant with retractable adamantium claws and healing factor",
      "🍁 Canadian-born member of the X-Men with a mysterious past",
      "🧬 His skeleton was bonded with indestructible adamantium metal",
      "😤 Known for his gruff personality and cigar smoking habit",
    ],
    difficulty: "medium",
    alternateNames: ["Logan", "James Howlett", "Weapon X", "Canucklehead"],
  },
  {
    id: 10,
    name: "Deadpool",
    image: "https://cdn.marvel.com/u/prod/marvel/i/mg/9/90/5261a86cacb99/standard_xlarge.jpg",
    hints: [
      "🎭 Mercenary with a mouth who constantly breaks the fourth wall",
      "🩹 Has an accelerated healing factor that makes him nearly immortal",
      "🔴 Wears a red and black costume to hide bloodstains",
      "🤪 Known for his crude humor and unpredictable behavior",
    ],
    difficulty: "hard",
    alternateNames: ["Wade Wilson", "Merc with a Mouth", "Regenerating Degenerate"],
  },
  {
    id: 11,
    name: "Ant-Man",
    image: "https://cdn.marvel.com/u/prod/marvel/i/mg/7/50/526549990d2aa/standard_xlarge.jpg",
    hints: [
      "🐜 Can shrink to the size of an ant while retaining human strength",
      "🔬 Uses Pym Particles discovered by scientist Hank Pym",
      "🗣️ Can communicate with and control armies of ants",
      "👨‍👧 Former thief who became a hero to reconnect with his daughter",
    ],
    difficulty: "hard",
    alternateNames: ["Scott Lang", "Paul Rudd", "Tiny Hero"],
  },
  {
    id: 12,
    name: "Hawkeye",
    image: "https://cdn.marvel.com/u/prod/marvel/i/mg/e/90/50fecaf4f101b/standard_xlarge.jpg",
    hints: [
      "🏹 Master archer with perfect aim who never misses his target",
      "🎯 Uses a variety of specialized arrows with different functions",
      "👨‍👩‍👧‍👦 Only Avenger who is a normal human with a family",
      "🎪 Former circus performer and S.H.I.E.L.D. agent",
    ],
    difficulty: "medium",
    alternateNames: ["Clint Barton", "Ronin", "Hawkeye"],
  },
  {
    id: 13,
    name: "Scarlet Witch",
    image: "https://cdn.marvel.com/u/prod/marvel/i/mg/6/70/5261a7d7c394b/standard_xlarge.jpg",
    hints: [
      "🔴 Powerful mutant with reality-warping chaos magic abilities",
      "👫 Twin sister of Quicksilver, both gained powers from experiments",
      "💔 Lost her brother Pietro and later her love Vision",
      "🌀 Can manipulate probability and alter reality itself",
    ],
    difficulty: "hard",
    alternateNames: ["Wanda Maximoff", "Wanda", "Chaos Magic User"],
  },
  {
    id: 14,
    name: "Vision",
    image: "https://cdn.marvel.com/u/prod/marvel/i/mg/9/d0/5269651c4d4f7/standard_xlarge.jpg",
    hints: [
      "🤖 Synthetic android created by Ultron but turned against his creator",
      "💎 Powered by the Mind Stone embedded in his forehead",
      "👻 Can phase through solid objects and alter his density",
      "❤️ Developed a romantic relationship with Scarlet Witch",
    ],
    difficulty: "hard",
    alternateNames: ["Vision", "Synthezoid", "FRIDAY"],
  },
  {
    id: 15,
    name: "Falcon",
    image: "https://cdn.marvel.com/u/prod/marvel/i/mg/0/a0/5261a7fb9c9f7/standard_xlarge.jpg",
    hints: [
      "🦅 Uses mechanical wings and has a telepathic link with birds",
      "🪖 Former military pararescue specialist and veteran",
      "🛡️ Became the new Captain America after Steve Rogers retired",
      "🤝 Steve Rogers' closest friend and trusted partner",
    ],
    difficulty: "medium",
    alternateNames: ["Sam Wilson", "New Captain America", "Falcon"],
  },
  {
    id: 16,
    name: "Winter Soldier",
    image: "https://cdn.marvel.com/u/prod/marvel/i/mg/d/03/58dd080719806/standard_xlarge.jpg",
    hints: [
      "🦾 Steve Rogers' childhood best friend with a cybernetic arm",
      "🧠 Was brainwashed by HYDRA to become an assassin",
      "❄️ Kept in cryogenic freeze between missions for decades",
      "💪 Enhanced with a version of the super soldier serum",
    ],
    difficulty: "hard",
    alternateNames: ["Bucky Barnes", "James Barnes", "White Wolf"],
  },
  {
    id: 17,
    name: "Captain Marvel",
    image: "https://cdn.marvel.com/u/prod/marvel/i/mg/6/80/5269608c1be7a/standard_xlarge.jpg",
    hints: [
      "✈️ Former Air Force pilot who gained cosmic powers",
      "⭐ Can fly at light speed and has superhuman strength",
      "💫 Absorbed energy from the Tesseract in an accident",
      "🌌 One of the most powerful heroes in the universe",
    ],
    difficulty: "medium",
    alternateNames: ["Carol Danvers", "Ms Marvel", "Binary"],
  },
  {
    id: 18,
    name: "Star-Lord",
    image: "https://cdn.marvel.com/u/prod/marvel/i/mg/e/f0/50fecc8de6b19/standard_xlarge.jpg",
    hints: [
      "🎵 Leader of the Guardians of the Galaxy who loves 80s music",
      "🌌 Half-human, half-Celestial with cosmic heritage",
      "🔫 Uses dual element guns and jet boots for combat",
      "👨‍👦 Was abducted from Earth as a child by space pirates",
    ],
    difficulty: "medium",
    alternateNames: ["Peter Quill", "Star Lord", "Peter Jason Quill"],
  },
  {
    id: 19,
    name: "Groot",
    image: "https://cdn.marvel.com/u/prod/marvel/i/mg/3/10/526033c8b474a/standard_xlarge.jpg",
    hints: [
      "🌳 Tree-like humanoid Guardian of the Galaxy",
      "💬 Can only say the three words 'I am Groot'",
      "🦝 Best friend and partner of Rocket Raccoon",
      "🌱 Can regrow from a small twig if destroyed",
    ],
    difficulty: "easy",
    alternateNames: ["Groot", "Baby Groot", "Tree"],
  },
  {
    id: 20,
    name: "Rocket Raccoon",
    image: "https://cdn.marvel.com/u/prod/marvel/i/mg/7/03/5233ba90d4e73/standard_xlarge.jpg",
    hints: [
      "🦝 Genetically modified raccoon with genius-level intellect",
      "🔧 Expert weapons specialist and mechanical engineer",
      "🌳 Best friend and translator for Groot",
      "💣 Has a love for big guns and causing explosions",
    ],
    difficulty: "medium",
    alternateNames: ["Rocket", "Trash Panda", "Rabbit"],
  },
]

export default function GuessTheHeroGame() {
  const [currentCharacter, setCurrentCharacter] = useState<GameCharacter | null>(null)
  const [guess, setGuess] = useState("")
  const [score, setScore] = useState(0)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [gameState, setGameState] = useState<"playing" | "correct" | "wrong">("playing")
  const [showImage, setShowImage] = useState(false)
  const [blurLevel, setBlurLevel] = useState(20)
  const [round, setRound] = useState(1)
  const [streak, setStreak] = useState(0)
  const [usedCharacters, setUsedCharacters] = useState<number[]>([])
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    startNewRound()
  }, [])

  const startNewRound = () => {
    // Get available characters (not used yet)
    const availableCharacters = gameCharacters.filter((char) => !usedCharacters.includes(char.id))

    // If all characters used, reset the pool
    if (availableCharacters.length === 0) {
      setUsedCharacters([])
      const randomCharacter = gameCharacters[Math.floor(Math.random() * gameCharacters.length)]
      setCurrentCharacter(randomCharacter)
      setUsedCharacters([randomCharacter.id])
    } else {
      const randomCharacter = availableCharacters[Math.floor(Math.random() * availableCharacters.length)]
      setCurrentCharacter(randomCharacter)
      setUsedCharacters((prev) => [...prev, randomCharacter.id])
    }

    setGuess("")
    setHintsUsed(1) // Start with first hint automatically shown
    setGameState("playing")
    setShowImage(false)
    setBlurLevel(20)
    setImageLoaded(false)
    setImageError(false)
  }

  const handleGuess = () => {
    if (!currentCharacter || !guess.trim()) return

    const normalizedGuess = guess.toLowerCase().trim()
    const isCorrect =
      normalizedGuess === currentCharacter.name.toLowerCase() ||
      currentCharacter.alternateNames.some((name) => name.toLowerCase() === normalizedGuess)

    if (isCorrect) {
      setGameState("correct")

      // Calculate points based on difficulty, hints used, and image reveals
      let basePoints = 100
      if (currentCharacter.difficulty === "medium") basePoints = 150
      if (currentCharacter.difficulty === "hard") basePoints = 200

      const hintPenalty = hintsUsed * 25
      const imagePenalty = showImage ? 30 : 0
      const streakBonus = streak * 10

      const points = Math.max(basePoints - hintPenalty - imagePenalty + streakBonus, 10)
      setScore((prev) => prev + points)
      setStreak((prev) => prev + 1)
      setShowImage(true)
      setBlurLevel(0)
    } else {
      setGameState("wrong")
      setStreak(0)
    }
  }

  const useHint = () => {
    if (hintsUsed < currentCharacter!.hints.length) {
      setHintsUsed((prev) => prev + 1)
    }
  }

  const revealImage = () => {
    setShowImage(true)
    setBlurLevel(Math.max(blurLevel - 5, 0))
  }

  const nextRound = () => {
    setRound((prev) => prev + 1)
    startNewRound()
  }

  const resetGame = () => {
    setScore(0)
    setRound(1)
    setStreak(0)
    setUsedCharacters([])
    startNewRound()
  }

  if (!currentCharacter) return null

  const difficultyColors = {
    easy: "bg-green-500",
    medium: "bg-yellow-500",
    hard: "bg-red-500",
  }

  const calculatePotentialPoints = () => {
    let basePoints = 100
    if (currentCharacter.difficulty === "medium") basePoints = 150
    if (currentCharacter.difficulty === "hard") basePoints = 200

    // Only count hints beyond the first free one
    const hintPenalty = Math.max(0, hintsUsed - 1) * 25
    const imagePenalty = showImage ? 30 : 0
    const streakBonus = streak * 10

    return Math.max(basePoints - hintPenalty - imagePenalty + streakBonus, 10)
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Game Header */}
      <div className="text-center">
        <h2 className="font-bebas text-4xl md:text-5xl text-marvel-red mb-4">GUESS THE HERO</h2>
        <div className="flex justify-center gap-8 mb-6">
          <div className="text-center">
            <div className="font-bebas text-2xl text-marvel-black dark:text-white">SCORE</div>
            <div className="font-bebas text-3xl text-marvel-red">{score}</div>
          </div>
          <div className="text-center">
            <div className="font-bebas text-2xl text-marvel-black dark:text-white">ROUND</div>
            <div className="font-bebas text-3xl text-marvel-red">{round}</div>
          </div>
          <div className="text-center">
            <div className="font-bebas text-2xl text-marvel-black dark:text-white">STREAK</div>
            <div className="font-bebas text-3xl text-yellow-500 flex items-center gap-1">
              {streak} <Star className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Potential Points Display */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 inline-block">
          <span className="font-bebas text-lg text-gray-700 dark:text-gray-300">
            POTENTIAL POINTS: <span className="text-marvel-red">{calculatePotentialPoints()}</span>
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Character Image */}
        <Card className="comic-border">
          <CardContent className="p-6">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-marvel-red to-red-800">
              {/* Main Character Image */}
              <Image
                src={currentCharacter.image || "/placeholder.svg"}
                alt="Mystery Hero"
                fill
                className="object-cover transition-all duration-500"
                style={{
                  filter: showImage ? `blur(${blurLevel}px)` : "blur(20px) brightness(0.3)",
                }}
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                  setImageError(true)
                  setImageLoaded(true)
                }}
                priority
              />

              {/* Fallback for when image fails to load */}
              {imageError && (
                <div className="absolute inset-0 bg-gradient-to-br from-marvel-red via-red-600 to-red-800 flex items-center justify-center">
                  <div className="text-center text-white relative z-10">
                    <div className="text-6xl mb-4">🦸‍♂️</div>
                    <span className="font-bebas text-2xl md:text-3xl block mb-2 transform rotate-[-5deg]">
                      MYSTERY HERO
                    </span>
                    <div className="flex justify-center gap-2">
                      <div className="text-yellow-400 text-2xl animate-pulse">⚡</div>
                      <div className="text-blue-400 text-2xl animate-bounce">💥</div>
                      <div className="text-green-400 text-2xl animate-pulse">✨</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Loading overlay */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                    <p className="font-bebas text-lg">LOADING HERO...</p>
                  </div>
                </div>
              )}

              {/* Mystery overlay when image is hidden */}
              {!showImage && imageLoaded && !imageError && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Eye className="w-16 h-16 mx-auto mb-4 opacity-70 animate-pulse" />
                    <p className="font-bebas text-2xl">WHO AM I?</p>
                    <p className="font-roboto text-sm mt-2 opacity-80">Use hints or reveal image to find out!</p>
                  </div>
                </div>
              )}

              {/* Difficulty Badge */}
              <div className="absolute top-4 right-4">
                <Badge className={`font-bebas ${difficultyColors[currentCharacter.difficulty]} text-white shadow-lg`}>
                  {currentCharacter.difficulty.toUpperCase()}
                </Badge>
              </div>

              {/* Scoring Info */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/90 text-white p-3 rounded-lg backdrop-blur-sm">
                  <div className="text-xs font-roboto text-center">
                    <div className="mb-1">
                      Base:{" "}
                      {currentCharacter.difficulty === "easy"
                        ? 100
                        : currentCharacter.difficulty === "medium"
                          ? 150
                          : 200}{" "}
                      pts
                      {hintsUsed > 1 && <span className="text-red-400"> | Extra Hints: -{(hintsUsed - 1) * 25}</span>}
                      {showImage && <span className="text-red-400"> | Image: -30</span>}
                      {streak > 0 && <span className="text-green-400"> | Streak: +{streak * 10}</span>}
                    </div>
                    <div className="text-green-400 font-bold">First hint is FREE! 🎁</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button
                onClick={revealImage}
                variant="outline"
                className="flex-1 font-bebas border-marvel-red text-marvel-red hover:bg-marvel-red hover:text-white transition-all duration-200"
                disabled={showImage || !imageLoaded}
              >
                <Eye className="w-4 h-4 mr-2" />
                {showImage ? "IMAGE REVEALED" : "REVEAL IMAGE (-30 PTS)"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Game Controls */}
        <Card className="comic-border">
          <CardHeader>
            <CardTitle className="font-bebas text-2xl text-marvel-red">MAKE YOUR GUESS</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Hints */}
            <div>
              <h4 className="font-bebas text-lg mb-3">
                HINTS ({hintsUsed}/{currentCharacter.hints.length})
              </h4>
              <div className="space-y-2 mb-4 max-h-48 overflow-y-auto custom-scrollbar">
                <AnimatePresence>
                  {currentCharacter.hints.slice(0, hintsUsed).map((hint, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className={`comic-bubble p-3 ${
                        index === 0
                          ? "bg-green-50 dark:bg-green-900/20 border-green-500"
                          : "bg-yellow-50 dark:bg-yellow-900/20"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <Lightbulb
                          className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                            index === 0 ? "text-green-500" : "text-yellow-500"
                          }`}
                        />
                        <div className="flex-1">
                          <span className="font-roboto text-sm">{hint}</span>
                          {index === 0 && (
                            <Badge className="ml-2 bg-green-500 text-white text-xs animate-pulse">FREE</Badge>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {hintsUsed < currentCharacter.hints.length && gameState === "playing" && (
                <Button
                  onClick={useHint}
                  variant="outline"
                  className="w-full font-bebas border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white transition-all duration-200"
                >
                  <Lightbulb className="w-4 h-4 mr-2" />
                  GET NEXT HINT (-25 POINTS)
                </Button>
              )}
            </div>

            {/* Guess Input */}
            {gameState === "playing" && (
              <div className="space-y-3">
                <Input
                  type="text"
                  placeholder="Enter hero name or real name..."
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleGuess()}
                  className="font-roboto text-lg border-2 border-marvel-red/50 focus:border-marvel-red transition-colors duration-200"
                />
                <Button
                  onClick={handleGuess}
                  className="w-full bg-marvel-red hover:bg-red-700 text-white font-bebas text-xl py-3 shadow-comic hover:shadow-comic-hover transform hover:scale-105 transition-all duration-200"
                  disabled={!guess.trim()}
                >
                  SUBMIT GUESS
                </Button>
              </div>
            )}

            {/* Game Result */}
            <AnimatePresence>
              {gameState === "correct" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-4"
                >
                  <div className="comic-bubble bg-green-50 dark:bg-green-900/20 p-6">
                    <Trophy className="w-12 h-12 text-green-500 mx-auto mb-3 animate-bounce" />
                    <h3 className="font-bebas text-2xl text-green-600 mb-2">CORRECT!</h3>
                    <p className="font-roboto text-green-700 dark:text-green-300">
                      You guessed {currentCharacter.name}!
                    </p>
                    <p className="font-roboto text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Points earned: {calculatePotentialPoints()}
                    </p>
                    {streak > 1 && (
                      <p className="font-roboto text-sm text-yellow-600 dark:text-yellow-400">
                        🔥 {streak} win streak! +{streak * 10} bonus points!
                      </p>
                    )}
                  </div>
                  <Button
                    onClick={nextRound}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bebas text-xl py-3 transform hover:scale-105 transition-all duration-200"
                  >
                    NEXT ROUND
                  </Button>
                </motion.div>
              )}

              {gameState === "wrong" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-4"
                >
                  <div className="comic-bubble bg-red-50 dark:bg-red-900/20 p-6">
                    <h3 className="font-bebas text-2xl text-red-600 mb-2">TRY AGAIN!</h3>
                    <p className="font-roboto text-red-700 dark:text-red-300">That's not quite right. Keep guessing!</p>
                    <p className="font-roboto text-xs text-gray-500 mt-2">
                      💡 Hint: Try the hero name or their real name
                    </p>
                  </div>
                  <Button
                    onClick={() => setGameState("playing")}
                    className="w-full bg-marvel-red hover:bg-red-700 text-white font-bebas text-xl py-3 transform hover:scale-105 transition-all duration-200"
                  >
                    CONTINUE GUESSING
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Reset Game */}
            <Button
              onClick={resetGame}
              variant="outline"
              className="w-full font-bebas border-gray-400 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              RESET GAME
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
