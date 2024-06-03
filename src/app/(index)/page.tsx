// import { redirect } from 'next/navigation'
// import { options } from '@/lib/auth'
// import { getServerSession } from 'next-auth/next'

import HeroSection from '@/app/(index)/HeroSection'
import FeatureSection from '@/app/(index)/FeatureSection'
import AboutSection from './AboutSection'
import ProjectSection from './ProjectSection'
import FeedbackFormSection from './FeedbackFormSection'
// import ProjectSection from './ProjectSection'
// import FeedbackFormSection from './FeedbackFormSection'

export default async function Home() {
  // const session = await getServerSession(options)

  // if (session) {
  //   return redirect('/dashboard')
  // }

  return (
    <div className="flex flex-col w-full gap-12">
      <HeroSection />
      <AboutSection />
      <FeatureSection />
      {/* <ProjectSection /> */}
      {/* <FeedbackFormSection /> */}
    </div>
  )
}
