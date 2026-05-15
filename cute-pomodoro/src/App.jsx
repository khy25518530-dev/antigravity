import { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw, Coffee, Brain, Heart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

function App() {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [mode, setMode] = useState('Focus') // 'Focus' or 'Break'

  useEffect(() => {
    let interval = null
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1)
        } else if (minutes > 0) {
          setMinutes(minutes - 1)
          setSeconds(59)
        } else {
          // Timer finished
          clearInterval(interval)
          handleSessionSwitch()
        }
      }, 1000)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isActive, minutes, seconds])

  const handleSessionSwitch = () => {
    const nextMode = mode === 'Focus' ? 'Break' : 'Focus'
    setMode(nextMode)
    setMinutes(nextMode === 'Focus' ? 25 : 5)
    setSeconds(0)
    setIsActive(false)
    // Notification sound or alert could go here
    alert(`${mode} session completed! Time for ${nextMode}!`)
  }

  const toggleTimer = () => setIsActive(!isActive)

  const resetTimer = () => {
    setIsActive(false)
    setMinutes(mode === 'Focus' ? 25 : 5)
    setSeconds(0)
  }

  const switchMode = (newMode) => {
    setMode(newMode)
    setMinutes(newMode === 'Focus' ? 25 : 5)
    setSeconds(0)
    setIsActive(false)
  }

  return (
    <div className="min-h-screen bg-[#1a1b1e] flex flex-col items-center justify-center p-4 text-white font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-10 rounded-[3rem] neon-glow flex flex-col items-center max-w-md w-full relative overflow-hidden"
      >
        {/* Cute Floating Hearts Background */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
           <Heart className="absolute top-10 left-10 text-cute-pink animate-bounce" size={24} />
           <Heart className="absolute bottom-10 right-10 text-cute-purple animate-pulse" size={32} />
        </div>

        {/* Mode Selector */}
        <div className="flex gap-4 mb-8 bg-white/5 p-2 rounded-full z-10">
          <button 
            onClick={() => switchMode('Focus')}
            className={`px-6 py-2 rounded-full transition-all flex items-center gap-2 ${mode === 'Focus' ? 'bg-cute-purple text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            <Brain size={18} /> Focus
          </button>
          <button 
            onClick={() => switchMode('Break')}
            className={`px-6 py-2 rounded-full transition-all flex items-center gap-2 ${mode === 'Break' ? 'bg-cute-pink text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            <Coffee size={18} /> Break
          </button>
        </div>

        {/* Timer Display */}
        <div className="text-8xl font-black mb-10 tracking-tighter tabular-nums z-10 flex items-center gap-2">
          <span className={mode === 'Focus' ? 'text-cute-purple' : 'text-cute-pink'}>
            {String(minutes).padStart(2, '0')}
          </span>
          <span className="opacity-30 text-6xl">:</span>
          <span className={mode === 'Focus' ? 'text-cute-purple' : 'text-cute-pink'}>
            {String(seconds).padStart(2, '0')}
          </span>
        </div>

        {/* Status Text */}
        <AnimatePresence mode="wait">
          <motion.p 
            key={mode}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-lg font-medium text-gray-300 mb-8 z-10 flex items-center gap-2"
          >
            {mode === 'Focus' ? "Let's focus, Representative! ✨" : "Time to recharge! ☕️"}
          </motion.p>
        </AnimatePresence>

        {/* Controls */}
        <div className="flex gap-6 z-10">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTimer}
            className={`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-colors ${isActive ? 'bg-gray-700' : 'bg-cute-cyan text-black'}`}
          >
            {isActive ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, rotate: -30 }}
            whileTap={{ scale: 0.9 }}
            onClick={resetTimer}
            className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <RotateCcw size={28} />
          </motion.button>
        </div>

        {/* Representative Footer */}
        <div className="mt-12 text-gray-500 text-sm flex items-center gap-2 italic">
          <span className="text-cute-pink">♥</span> Made by Kodari for the Representative
        </div>
      </motion.div>
    </div>
  )
}

export default App
