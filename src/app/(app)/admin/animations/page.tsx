/* eslint-disable react/no-unescaped-entities */
'use client'
import { motion, useScroll } from 'framer-motion'
import { useRef, useState } from 'react'

export default function AnimationPage() {
  return (
    <div className="flex flex-col w-full gap-12">
      <div>
        <h1 className="typo-h1">Animation Playground</h1>
        <p className="typo-p text-muted">Here's a little test playground for Framer Motion animations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      <div>
        <h2 className="typo-h2">Scroll Effect</h2>
        <p className="typo-p text-muted">Text will appear as is gets visible</p>

        <ScrollInView />
      </div>
    </div>
  )
}

const ScrollInView = () => {
  const textContent = `In nisi ullamco ad laboris ut esse et cupidatat aliqua enim consequat. Cillum ut est consequat dolore tempor irure do aliqua dolor labore exercitation commodo adipisicing aliquip. Reprehenderit reprehenderit in dolor incididunt elit ullamco proident consectetur anim exercitation. Irure Lorem culpa laboris minim ea excepteur id laborum enim.

  Nulla sunt commodo deserunt eiusmod anim. Eu voluptate labore enim magna adipisicing qui et consequat occaecat. Consequat ut Lorem sunt officia adipisicing amet exercitation culpa cupidatat. Amet qui voluptate reprehenderit occaecat. Magna ex dolor et enim labore.

  Id ut culpa laboris esse sunt amet est deserunt nostrud minim. Voluptate ea amet consectetur laborum consectetur adipisicing qui eu non quis ut. Et aliquip velit culpa do dolor est culpa fugiat. Esse labore sit consequat incididunt. Proident proident proident minim eu aliqua ad.

  Culpa duis consectetur culpa proident sit labore. Lorem esse nisi ex anim Lorem nostrud ea reprehenderit esse aliqua deserunt excepteur pariatur. Mollit eiusmod exercitation non in ad enim ut. Cillum quis nulla proident cillum. Mollit tempor incididunt aliquip deserunt veniam ea esse magna magna. Amet reprehenderit sit aliqua laborum non eu. Aute voluptate aute commodo exercitation ipsum occaecat consectetur ad tempor eiusmod.

  Laborum magna ut officia nostrud tempor veniam consequat minim nulla excepteur veniam excepteur. Dolore minim eiusmod culpa sit adipisicing adipisicing qui amet et pariatur cillum dolore. Velit officia veniam eu ea. Cillum consequat ex dolore occaecat elit anim culpa mollit qui. Exercitation eu non aute qui sit aliqua amet.

  Eu excepteur culpa ullamco nisi sit cupidatat minim Lorem eu anim fugiat elit enim. Nulla minim in labore in esse. Occaecat anim nulla dolore excepteur. Nisi duis adipisicing aute magna consectetur culpa deserunt enim sint sit. Veniam in et enim dolor dolor dolore ex tempor id sit eiusmod est mollit. Fugiat id sunt voluptate sit tempor laborum ex dolore tempor incididunt velit mollit reprehenderit excepteur.

  Enim ipsum ad sunt irure occaecat fugiat incididunt eu. Laborum non enim commodo voluptate anim ullamco proident dolore culpa mollit. Nulla aute cillum sint officia amet nostrud proident minim exercitation esse consectetur enim.`

  const splitText = textContent.split(`\n`).filter(string => string.length > 0)
  console.log(splitText.length)

  return (
    <div>
      {splitText.map(string => (
        <ScrollInViewParagraph key={string} paragraph={string} />
      ))}
    </div>
  )
}

const ScrollInViewParagraph = ({ paragraph }: any) => {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0.8 1', '1.5 1'],
  })

  return (
    <motion.p style={{ opacity: scrollYProgress }} transition={{ duration: 3 }} ref={ref} className="typo-p text-muted">
      {paragraph}
    </motion.p>
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
        stiffness: 175,
        damping: 13,
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
