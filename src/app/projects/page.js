import React from 'react'
import Projects from '@/components/projects/project'
export const metadata = {
  title: 'Verixr - Projects',
  description: 'Discover our diverse portfolio of projects showcasing our expertise in delivering outstanding results and unlocking creative potential.',
  openGraph: {
    title: 'Verixr - Projects',
    description: 'Discover our diverse portfolio of projects showcasing our expertise in delivering outstanding results and unlocking creative potential.',
  },
};

function Page() {
  return (
    <Projects />
  )
}

export default Page