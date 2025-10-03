import React, { useEffect, useState } from 'react'
import AnimatedNumber from './AnimateNumber'
import { motion } from 'framer-motion'

interface ScoreBoardProps {
  validVotes: Record<string, any>[]
  isLightMode: boolean
  post: {
    voteFields?: string[]
  } | null
  isFromCache?: boolean
  onAnimated?: () => void // callback to mark animation done
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ validVotes, isLightMode, post, isFromCache = false, onAnimated }) => {

  // Calculate initial totalAvg if cached to prevent blink
  const calculateTotalAvg = () => {
    if (!post?.voteFields?.length || !validVotes.length) return 0
    const averages = post.voteFields.reduce((acc, field) => {
      const total = validVotes.reduce((sum, vote) => sum + (Number(vote[field]) || 0), 0)
      acc[field] = total / validVotes.length
      return acc
    }, {} as Record<string, number>)
    const values = Object.values(averages)
    if (values.length === 0) return 0
    return parseFloat((values.reduce((sum, val) => sum + val, 0) / values.length).toFixed(1))
  }

  const [totalAvg, setTotalAvg] = useState<number>(isFromCache ? calculateTotalAvg() : 0)

  // Calculate averages for fields
  const averages: Record<string, number> = post?.voteFields?.length && validVotes.length
    ? post.voteFields.reduce((acc, field) => {
        const total = validVotes.reduce((sum, vote) => sum + (Number(vote[field]) || 0), 0)
        acc[field] = parseFloat((total / validVotes.length).toFixed(2))
        return acc
      }, {} as Record<string, number>)
    : {}

  // Update totalAvg when values change
  useEffect(() => {
    if (!averages || Object.keys(averages).length === 0) return
    const values = Object.values(averages)
    if (values.length === 0) return
    const totalAverage = values.reduce((sum, val) => sum + val, 0) / values.length

    if (isFromCache) {
      setTotalAvg(parseFloat(totalAverage.toFixed(1)))
      return
    }

    const timer = setTimeout(() => {
      setTotalAvg(parseFloat(totalAverage.toFixed(1)))
      if (onAnimated) onAnimated()
    }, 200)

    return () => clearTimeout(timer)
  }, [averages, isFromCache, onAnimated])

  return (
    <div>
      {validVotes.length > 0 && (
        <div className='w-full px-1'>
          {post?.voteFields?.map((field, index) => (
            <div key={index} className='score px-1 mb-1'>
              <div className=''>
                <div
                  className={`overall b border-b ${isLightMode ? 'border-[#dadada]' : 'border-[#4d4d4d]'} w-full h-5 pr-1 flex items-center justify-between relative`}
                >
                  <h3 className='z-10 ml-2'>{field}:</h3>
                  <h3>{averages[field]}</h3>
                </div>
              </div>
            </div>
          ))}

          <div
            className={`score ${isLightMode ? 'bg-[#f4f4f4]' : 'bg-[#1d1d1d]'} w-full h-6 flex items-center pr-2 mt-4 justify-between relative`}
          >
            <h3 style={{ fontWeight: 200, color: isLightMode ? 'white' : 'black' }} className='z-10 ml-2 mix-blend-difference'>
              Score:
            </h3>
            <h3>
             <AnimatedNumber value={totalAvg} skipAnimation={isFromCache} />
              /10
            </h3>
            <motion.div
              initial={false} // prevent initial animation blink
              animate={{ width: `${totalAvg * 10 - 13}%` }}
              transition={{ delay: 0.06, duration: isFromCache ? 0 : 1.5 }}
              className={`ber h-full ${isLightMode ? 'bg-black' : 'bg-[#dadada]'} absolute top-0`}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default ScoreBoard
