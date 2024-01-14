/* eslint-disable react/no-unescaped-entities */
'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function AnimationPage() {
  return (
    <div className="flex flex-col w-full gap-8">
      <div>
        <h1 className="typo-h1">Animation Playground</h1>
        <p className="typo-p text-muted">Here's a little test playground for Framer Motion animations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="typo-h2 mb-2">Click Box</h2>
          <p className="typo-p text-muted">Click the box to animate back and forth.</p>
          <ClickBox />
        </div>
        <div>
          <h2 className="typo-h2 mb-2">Drag Box</h2>
          <p className="typo-p text-muted">Grab the Box and move it around</p>
          <DragBox />
        </div>
        <div>
          <h2 className="typo-h2 mb-2">Staggered Box</h2>
          <p className="typo-p text-muted">Staggered children on page load.</p>
          <StaggeredBox />
        </div>
        <div>
          <h2 className="typo-h2 mb-2">Keyframe Box</h2>
          <p className="typo-p text-muted">Click the box animating according to keyframes. </p>
          <KeyframeBox />
        </div>
      </div>
    </div>
  )
}

const ClickBox = () => {
  const [isAnimating, setIsAnimating] = useState(false)

  return (
    <motion.div
      className="h-32 w-32 bg-sky-500 rounded-lg cursor-pointer shadow-lg"
      initial={{ opacity: 1, x: 0, rotate: -360 }}
      animate={{
        opacity: isAnimating ? 0.5 : 1,
        x: isAnimating ? '100%' : 0,
        rotate: isAnimating ? 0 : -360,
      }}
      transition={{
        stiffness: '175',
        damping: '13',
        type: 'spring',
      }}
      whileHover={{ scale: 1.1 }}
      onClick={() => setIsAnimating(!isAnimating)}
    ></motion.div>
  )
}

const DragBox = () => {
  return (
    <motion.div
      className="h-32 w-32 bg-blue-500 rounded-lg cursor-pointer shadow-lg"
      drag
      dragConstraints={{
        right: 5,
        left: 5,
        top: 5,
        bottom: 5,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    ></motion.div>
  )
}

const StaggeredBox = () => {
  const boxVariant = {
    hidden: {
      x: '-100vw',
    },
    visible: {
      x: 0,
      transition: {
        stiffness: '200',
        damping: '13',
        type: 'spring',
        delay: 0,
        when: 'beforeChildren',
        staggerChildren: 0.2,
      },
    },
  }

  const listVariant = {
    hidden: {
      x: '-20',
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {},
    },
  }

  return (
    <motion.div
      variants={boxVariant}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.1 }}
      className="h-32 w-32 bg-indigo-500 rounded-lg cursor-pointer shadow-lg flex flex-col justify-center items-center gap-1"
    >
      {[1, 2, 3].map(child => (
        <StaggeredChildBox key={child} variants={listVariant} />
      ))}
    </motion.div>
  )
}

const StaggeredChildBox = ({ variants }: any) => {
  return <motion.div variants={variants} className="h-4 w-4 bg-white rounded-lg "></motion.div>
}

const KeyframeBox = () => {
  const [isAnimating, setIsAnimating] = useState(false)
  return (
    <motion.div
      initial={{ borderRadius: '5%' }}
      animate={{
        scale: isAnimating ? [1, 1.4, 1.4, 1] : 1,
        borderRadius: isAnimating ? ['20%', '20%', '50%', '50%', '5%'] : '5%',
        rotate: isAnimating ? [0, 0, 270, 270, 0] : 0,
      }}
      transition={{ duration: 2 }}
      onAnimationEnd={() => setIsAnimating(false)}
      className="h-32 w-32 bg-violet-500 cursor-pointer shadow-lg"
      onAnimationComplete={() => setIsAnimating(false)}
      onClick={() => setIsAnimating(!isAnimating)}
    ></motion.div>
  )
}
